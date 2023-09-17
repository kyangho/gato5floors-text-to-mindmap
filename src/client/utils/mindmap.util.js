import { get } from 'lodash';
import { nanoid } from 'nanoid/non-secure';
import { stringToColour } from './string.util';
export function convertToNodesAndEdges(
  data,
  parentNode = null,
  angle = 120,
  radius = 100,
  color = ''
) {
  const nodes = [];
  const edges = [];

  // Calculate the label width for the current node
  const labelWidth = data.name.length * 12; // Assuming 8 pixels per character

  // Calculate the x and y position for the current node
  const xPosition = parentNode
    ? parentNode.position.x + radius * Math.cos(angle)
    : 0;
  const yPosition = parentNode
    ? parentNode.position.y + radius * Math.sin(angle)
    : 0;

  // Create the current node
  const currentNode = {
    id: nanoid(),
    type: 'mindmap',

    data: {
      label: data.name,
      color: color ? color : stringToColour(data.name)
    },
    position: {
      x: !parentNode ? 0 : get(data, 'position.x', xPosition),
      y: !parentNode ? 0 : get(data, 'position.y', yPosition)
    },
    dragHandle: '.dragHandle',
    parentNode: parentNode ? parentNode.id : null
  };

  nodes.push(currentNode);
  if (!parentNode) {
    currentNode.id = 'root';
  }

  if (parentNode) {
    // Create an edge from the parent node to the current node
    const edge = {
      id: nanoid(),
      source: parentNode.id,
      target: currentNode.id
    };
    edges.push(edge);
  }

  // Calculate the angle and radius for child nodes
  const childAngleStep =
    (8.5 * Math.PI) / (data.children ? data.children.length : 1);
  const childRadius = labelWidth; // Set radius based on label width

  // Recursively process children
  if (data.children) {
    const color = stringToColour(data.children[0].name);
    data.children.forEach((child, index) => {
      const childAngle = angle * index * 0.4 + childAngleStep;
      const childNodesAndEdges = convertToNodesAndEdges(
        child,
        currentNode,
        childAngle,
        parentNode ? childRadius / 1.9 : 170,
        color
      );
      nodes.push(...childNodesAndEdges.nodes);
      edges.push(...childNodesAndEdges.edges);
    });
  }
  return { nodes, edges };
}
