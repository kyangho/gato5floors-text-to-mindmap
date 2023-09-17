import { applyNodeChanges, applyEdgeChanges } from 'reactflow';
import { nanoid } from 'nanoid/non-secure';
import { create } from 'zustand';

const useStore = create((set, get) => ({
  nodes: [],
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
  },
  set,
  get
}));

export default useStore;
