import { applyNodeChanges, applyEdgeChanges } from 'reactflow';
import create from 'zustand';
import { nanoid } from 'nanoid/non-secure';

const useStore = create((set, get) => ({
  nodes: [
    {
      id: 'root',
      type: 'mindmap',
      data: { label: 'Mai' },
      position: { x: 0, y: 0 },
      dragHandle: '.dragHandle',
      parentNode: null
    },
    {
      id: 'Ou39L-UrPKfXXi8703zPM',
      type: 'mindmap',
      data: { label: 'Thông tin cá nhân' },
      position: { x: 0, y: 0 },
      dragHandle: '.dragHandle',
      parentNode: 'root'
    },
    {
      id: 'J7lL6Vq6YbI6S_W0kQV2K',
      type: 'mindmap',
      data: { label: 'Xấu gái' },
      position: { x: 0, y: 0 },
      dragHandle: '.dragHandle',
      parentNode: 'Ou39L-UrPKfXXi8703zPM'
    },
    {
      id: 'pvc8vamC3gnhr9ACONHgv',
      type: 'mindmap',
      data: {
        label: 'Gọi là Mai dơ Mai bẩn (Lí do: Mai tắm + cả gội đầu trong 1p)'
      },
      position: { x: 0, y: 0 },
      dragHandle: '.dragHandle',
      parentNode: 'Ou39L-UrPKfXXi8703zPM'
    },
    {
      id: 'ejK9ApFEyYvx7UTtlzogG',
      type: 'mindmap',
      data: { label: 'Hành vi hàng ngày' },
      position: { x: 0, y: 0 },
      dragHandle: '.dragHandle',
      parentNode: 'root'
    },
    {
      id: '18mvLhVq7wSmnxpUBcuB_',
      type: 'mindmap',
      data: { label: 'Mai nấu cơm cho nhà trừ Ducky hằng sáng' },
      position: { x: 0, y: 0 },
      dragHandle: '.dragHandle',
      parentNode: 'ejK9ApFEyYvx7UTtlzogG'
    },
    {
      id: 'WHAaUQqT3P-nDmpwCJrY3',
      type: 'mindmap',
      data: { label: 'Mai chửi Ducky là Tró khi Kỳ đi làm về mệt mỏi' },
      position: { x: 0, y: 0 },
      dragHandle: '.dragHandle',
      parentNode: 'ejK9ApFEyYvx7UTtlzogG'
    },
    {
      id: '8ucvWfl26_4SfvTfCvirE',
      type: 'mindmap',
      data: { label: 'Tình trạng cảm xúc' },
      position: { x: 0, y: 0 },
      dragHandle: '.dragHandle',
      parentNode: 'root'
    },
    {
      id: '4apDrH9ac_QHtWZedlSpu',
      type: 'mindmap',
      data: { label: 'Rất buồn về Mai' },
      position: { x: 0, y: 0 },
      dragHandle: '.dragHandle',
      parentNode: '8ucvWfl26_4SfvTfCvirE'
    }
  ],
  edges: [
    {
      id: 'i3K3ZLooGLTbNj7xBM0Xy',
      source: 'root',
      target: 'Ou39L-UrPKfXXi8703zPM'
    },
    {
      id: 'UB_66IjjSoCAfblTiKa69',
      source: 'Ou39L-UrPKfXXi8703zPM',
      target: 'J7lL6Vq6YbI6S_W0kQV2K'
    },
    {
      id: 'qQ04PlSrQxwoMz7z9-8kK',
      source: 'Ou39L-UrPKfXXi8703zPM',
      target: 'pvc8vamC3gnhr9ACONHgv'
    },
    {
      id: '3FXLyUFphavUxwYHbuuDN',
      source: 'root',
      target: 'ejK9ApFEyYvx7UTtlzogG'
    },
    {
      id: 'zRKdQGY5ljKCpGTyUO5Ji',
      source: 'ejK9ApFEyYvx7UTtlzogG',
      target: '18mvLhVq7wSmnxpUBcuB_'
    },
    {
      id: 'VxSAU8vlLraPE2y8jU-9l',
      source: 'ejK9ApFEyYvx7UTtlzogG',
      target: 'WHAaUQqT3P-nDmpwCJrY3'
    },
    {
      id: '26jcKUV-4buthlSX7-JIE',
      source: 'root',
      target: '8ucvWfl26_4SfvTfCvirE'
    },
    {
      id: '5HZ3_5UTjOhNd_QXUTZD1',
      source: '8ucvWfl26_4SfvTfCvirE',
      target: '4apDrH9ac_QHtWZedlSpu'
    }
  ],
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
