import { useCallback, useEffect, useRef } from 'react';
import ReactFlow, {
  ConnectionLineType,
  useReactFlow,
  useStoreApi,
  Controls,
  Panel
} from 'reactflow';
import shallow from 'zustand/shallow';

import useStore from './store';
import MindMapNode from './MindMapNode';
import MindMapEdge from './MindMapEdge';

// we need to import the React Flow styles to make it work
import 'reactflow/dist/style.css';
import { isEmpty, isObject } from 'lodash';
import { convertToNodesAndEdges } from '@/utils/mindmap.util';

const selector = state => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  addChildNode: state.addChildNode,
  set: state.set,
  get: state.get
});

const nodeTypes = {
  mindmap: MindMapNode
};

const edgeTypes = {
  mindmap: MindMapEdge
};

const nodeOrigin = [0.5, 0.5];

const connectionLineStyle = { stroke: '#F6AD55', strokeWidth: 3 };
const defaultEdgeOptions = { style: connectionLineStyle, type: 'mindmap' };

function MindMap({ generateJsonData }) {
  const store = useStoreApi();
  const { nodes, edges, onNodesChange, onEdgesChange, addChildNode, set, get } =
    useStore(selector, shallow);

  const { project } = useReactFlow();
  const connectingNodeId = useRef(null);

  const getChildNodePosition = (event, parentNode) => {
    const { domNode } = store.getState();

    if (
      !domNode ||
      // we need to check if these properites exist, because when a node is not initialized yet,
      // it doesn't have a positionAbsolute nor a width or height
      !parentNode?.positionAbsolute ||
      !parentNode?.width ||
      !parentNode?.height
    ) {
      return;
    }

    const { top, left } = domNode.getBoundingClientRect();

    // we need to remove the wrapper bounds, in order to get the correct mouse position
    const panePosition = project({
      x: event.clientX - left,
      y: event.clientY - top
    });

    // we are calculating with positionAbsolute here because child nodes are positioned relative to their parent
    return {
      x: panePosition.x - parentNode.positionAbsolute.x + parentNode.width / 2,
      y: panePosition.y - parentNode.positionAbsolute.y + parentNode.height / 2
    };
  };

  const onConnectStart = useCallback((_, { nodeId }) => {
    // we need to remember where the connection started so we can add the new node to the correct parent on connect end
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd = useCallback(
    event => {
      const { nodeInternals } = store.getState();
      const targetIsPane = event.target.classList.contains('react-flow__pane');
      const node = event.target.closest('.react-flow__node');

      if (node) {
        node.querySelector('input')?.focus({ preventScroll: true });
      } else if (targetIsPane && connectingNodeId.current) {
        const parentNode = nodeInternals.get(connectingNodeId.current);
        const childNodePosition = getChildNodePosition(event, parentNode);

        if (parentNode && childNodePosition) {
          addChildNode(parentNode, childNodePosition);
        }
      }
    },
    [getChildNodePosition]
  );

  useEffect(() => {
    if (!isEmpty(generateJsonData)) {
      const { edges, nodes } = convertToNodesAndEdges(generateJsonData);
      set({ edges, nodes });
    }
  }, [generateJsonData]);
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnectStart={onConnectStart}
      onConnectEnd={onConnectEnd}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      nodeOrigin={nodeOrigin}
      defaultEdgeOptions={defaultEdgeOptions}
      connectionLineStyle={connectionLineStyle}
      connectionLineType={ConnectionLineType.Straight}
      fitView
    >
      <Controls showInteractive={false} />
    </ReactFlow>
  );
}

export default MindMap;
