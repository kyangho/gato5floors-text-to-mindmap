const {nanoid} = require('nanoid/non-secure')
const fs = require('fs')
const jsonData = {
    "name": "Mai",
    "children": [
        {
            "name": "Thông tin cá nhân",
            "children": [
                { "name": "Xinh gái" },
                { "name": "Học giỏi nết na" }
            ]
        },
        {
            "name": "Hành vi hàng ngày",
            "children": [
                { "name": "Mai nấu cơm cho nhà trừ Ducky hằng sáng" },
                { "name": "Mai chửi Ducky là Tró khi Kỳ đi làm về mệt mỏi" }
            ]
        },
        {
            "name": "Tình trạng cảm xúc",
            "children": [
                { "name": "Mai thật tuyệt vời" }
            ]
        }
    ]
};


function convertToNodesAndEdges(data, parentNode = null, angle = 0, radius = 0) {
    const nodes = [];
    const edges = [];

    // Calculate the label width for the current node
    const labelWidth = data.name.length * 8; // Assuming 8 pixels per character

    // Calculate the x and y position for the current node
    const xPosition = parentNode ? parentNode.position.x + radius * Math.cos(angle) : 0;
    const yPosition = parentNode ? parentNode.position.y + radius * Math.sin(angle) : 0;

    // Create the current node
    const currentNode = {
        id: nanoid(),
        type: 'mindmap',
        data: { label: data.name },
        position: { x: xPosition, y: yPosition },
        dragHandle: '.dragHandle',
        parentNode: parentNode ? parentNode.id : null,
    };

    nodes.push(currentNode);
    if (!parentNode) {
        currentNode.id='root'
    }


    if (parentNode) {
        // Create an edge from the parent node to the current node
        const edge = {
            id: nanoid(),
            source: parentNode.id,
            target: currentNode.id,
        };
        edges.push(edge);
    }

    // Calculate the angle and radius for child nodes
    const childAngleStep = 2 * Math.PI / (data.children ? data.children.length : 1);
    const childRadius = labelWidth; // Set radius based on label width

    // Recursively process children
    if (data.children) {
        data.children.forEach((child, index) => {
            const childAngle = angle + index * childAngleStep;
            const childNodesAndEdges = convertToNodesAndEdges(child, currentNode, childAngle, childRadius);
            nodes.push(...childNodesAndEdges.nodes);
            edges.push(...childNodesAndEdges.edges);
        });
    }

    return { nodes, edges };
}

// Convert the JSON data to nodes and edges
const { nodes, edges } = convertToNodesAndEdges(jsonData);

console.log('Nodes:', nodes);
console.log('Edges:', edges);