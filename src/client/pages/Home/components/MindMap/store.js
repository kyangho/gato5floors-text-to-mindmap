import { applyNodeChanges, applyEdgeChanges } from 'reactflow';
import create from 'zustand';
import { nanoid } from 'nanoid/non-secure';

const useStore = create((set, get) => ({
  nodes: [
    {
      id: 'root',
      type: 'mindmap',
      data: { label: 'React Flow Mind Map' },
      position: { x: 0, y: 0 },
      dragHandle: '.dragHandle'
    }
  ],
  edges: [],
  onNodesChange: changes => {
    set({
      nodes: applyNodeChanges(changes, get().nodes)
    });
  },
  onEdgesChange: changes => {
    set({
      edges: applyEdgeChanges(changes, get().edges)
    });
  },
  updateNodeLabel: (nodeId, label) => {
    set({
      nodes: get().nodes.map(node => {
        if (node.id === nodeId) {
          // it's important to create a new object here, to inform React Flow about the changes
          node.data = { ...node.data, label };
        }

        return node;
      })
    });
  },
  addChildNode: (parentNode, position) => {
    const newNode = {
      id: nanoid(),
      type: 'mindmap',
      data: { label: 'New Node' },
      position,
      dragHandle: '.dragHandle',
      parentNode: parentNode.id
    };

    const newEdge = {
      id: nanoid(),
      source: parentNode.id,
      target: newNode.id
    };

    set({
      nodes: [...get().nodes, newNode],
      edges: [...get().edges, newEdge]
    });
  }
}));

export default useStore;
