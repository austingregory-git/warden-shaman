import React, { Component } from "react";

//import {Tree} from "react-tree-graph";
import Tree from "react-d3-tree";

class TalentTree extends Component {
    constructor() {
        super();

        this.addedNodesCount = 0;

        this.state = {
        data: orgChartJson,
        totalNodeCount: countNodes(0, Array.isArray(orgChartJson) ? orgChartJson[0] : orgChartJson),
        orientation: 'horizontal',
        dimensions: undefined,
        centeringTransitionDuration: 800,
        translateX: 200,
        translateY: 300,
        collapsible: true,
        shouldCollapseNeighborNodes: false,
        initialDepth: 1,
        depthFactor: undefined,
        zoomable: true,
        draggable: true,
        zoom: 1,
        scaleExtent: { min: 0.1, max: 1 },
        separation: { siblings: 2, nonSiblings: 2 },
        nodeSize: { x: 200, y: 200 },
        enableLegacyTransitions: false,
        transitionDuration: 500,
        renderCustomNodeElement: customNodeFnMapping['svg'].fn,
        styles: {
            nodes: {
            node: {
                circle: {
                fill: '#52e2c5',
                },
                attributes: {
                stroke: '#000',
                },
            },
            leafNode: {
                circle: {
                fill: 'transparent',
                },
                attributes: {
                stroke: '#000',
                },
            },
            },
        },
        };

        this.setTreeData = this.setTreeData.bind(this);
        this.setLargeTree = this.setLargeTree.bind(this);
        this.setOrientation = this.setOrientation.bind(this);
        this.setPathFunc = this.setPathFunc.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFloatChange = this.handleFloatChange.bind(this);
        this.toggleCollapsible = this.toggleCollapsible.bind(this);
        this.toggleZoomable = this.toggleZoomable.bind(this);
        this.toggleDraggable = this.toggleDraggable.bind(this);
        this.toggleCenterNodes = this.toggleCenterNodes.bind(this);
        this.setScaleExtent = this.setScaleExtent.bind(this);
        this.setSeparation = this.setSeparation.bind(this);
        this.setNodeSize = this.setNodeSize.bind(this);
    }
}
