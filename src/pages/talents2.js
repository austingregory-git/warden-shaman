import React, { Component, useEffect, useRef } from 'react';
import {Graph} from "react-d3-graph";
import {graphData} from "../data/graphData.js"
import {config} from "../config/config.js"
import { Tooltip } from '@mui/material';
import './talents.css';
import background from "./WardenShamanBackground.PNG";

const MAXIMUM_POINTS = 30;
const TIER_5_POINT_THRESHOLD = 8;
const TIER_8_POINT_THRESHOLD = 20;
const nodeSize = { x:56, y:56};
//const nodeSize = {x: window.innerWidth/15, y: window.innerHeight/15}
const borderWidth = 4;
const foreignObjectProps = { width: nodeSize.x+borderWidth*2, height: nodeSize.y+borderWidth*2, x: -nodeSize.x/2-borderWidth, y: -nodeSize.y/2-borderWidth};

export function RenderCustomNode({nodeDatum}) {
    return(
        <Tooltip title={<div style={{whiteSpace: 'pre-line'}}>{generateTooltip(nodeDatum)}</div>} placement="right">
            <foreignObject {...foreignObjectProps}>
                <div xmlns='http://www.w3.org/1999/xhtml' style={handleNodeStyle(nodeDatum.status)}>
                        <img src={nodeDatum.image}></img>
                </div>
                <div className='allocated-points'>
                    {nodeDatum.currentPoints}/{nodeDatum.maxPoints}
                </div>
            </foreignObject>
        </Tooltip>
    )
}

const generateTooltip = (nodeDatum) => {
  //todo generate tooltip for choice node
  if(nodeDatum.type === 'choice') {

  }
  const abilityDetails = nodeDatum.abilityDetails === undefined ? "" : nodeDatum.abilityDetails.join('\n') + '\n'
  const name = nodeDatum.name + '\n'
  const requirements = nodeDatum.requirements.join('\n') + '\n'
  const description = nodeDatum.description
  const tooltip = name + abilityDetails + requirements + description
  return tooltip;
}

const containerStyles = {
    width: "100vw",
    //height: "100vh",
    height: "calc(100% - 56px)",
    background: "#eee",
    backgroundImage: `url(${background})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
};

const imageStyle = {
    width: "75%",
    height: "75%",
};

const handleNodeStyle = (status) => {
    if (status === 'available') {
     return {
        border: '4px solid limegreen',
        height: nodeSize.y,
        width: nodeSize.x
     }
    }
    else if (status === 'unavailable')
      return {
        border: '4px solid gray',
        height: nodeSize.y,
        width: nodeSize.x
    }
    else if(status === 'active')
      return {
        border: '4px solid #ffd100',
        height: nodeSize.y,
        width: nodeSize.x
    }
    return;
};

class TalentTree extends Component {
    constructor() {
        super();
        this.addedNodesCount = 0;
        this.state = {
          id: "TalentGraph",
          data: graphData,
          config: config,
          totalPoints: 0,
          translateX: window.innerWidth/2,
          translateY: window.innerWidth/16,
        };
    }  

    // componentDidMount() {
    //     alert("hi")
    // }

    // componentDidUpdate() {
    //     this.updateLinkPaths();
    // }
    incrementTotalPoints() {
        this.setState((prevState) => ({
            totalPoints: prevState.totalPoints + 1,
        }));
    }
    decrementTotalPoints() {
        this.setState((prevState) => ({
            totalPoints: prevState.totalPoints - 1,
        }));
    }

    updateTotalPoints() {
        var points = 0;
        const nodes = this.state.data.nodes;
        if (nodes) {
            nodes.forEach((node) => {
              points += node.currentPoints;
            });
        }
        this.setState((prevState) => ({
            totalPoints: points,
        }));
    }
    
    updateLinkPaths() {
        const links = this.state.data.links
        if (links) {
          links.forEach((link) => {
            link.breakPoints = this.createCustomLinkPath(link);
          });
        }
    }

    updateNodes() {
        const nodes = this.state.data.nodes
        if (nodes) {
          nodes.forEach((node) => {
            RenderCustomNode(node)
          });
        }
    }

    getNodeDataById(nodeId) {
        const { data } = this.state;
        const node = data.nodes.find((node) => node.id === nodeId);
        return node ? node : null;
    }
    createCustomLinkPath = (linkDatum) => {
        const source = this.getNodeDataById(linkDatum.source);
        const target = this.getNodeDataById(linkDatum.target);
        const nodeRadius = 30;
        //Target Node is left of the source Node
        if(source.x > target.x) {
            return [
                {x: source.x-nodeRadius, y: source.y+nodeRadius},
                {x: target.x+nodeRadius, y: target.y-nodeRadius}
            ]
        }
          
        //Target Node is right of the source Node
        else if(source.x < target.x) {
            return [
                {x: source.x+nodeRadius, y: source.y+nodeRadius},
                {x: target.x-nodeRadius, y: target.y-nodeSize.y/2}
            ]
        }
        //Target Node is aligned with the source Node
        else {
            return [
                {x: source.x, y: source.y+nodeRadius},
                {x: target.x, y: target.y-nodeRadius}
            ]
        }
    };

    onClickNode = (nodeId, nodeDatum) => {
        const updatedData = { ...this.state.data }; // Make a copy of the original data
        const updatedNode = { ...nodeDatum }; // Make a copy of the clicked node data

        if (updatedNode.currentPoints < updatedNode.maxPoints) {
          if (
            (updatedNode.tier < 5 || this.state.totalPoints >= 8) &&
            (updatedNode.tier < 8 || this.state.totalPoints >= 20) &&
            (updatedNode.status === 'available' || updatedNode.status === 'active') &&
            this.state.totalPoints < MAXIMUM_POINTS
          ) {
            updatedNode.currentPoints++;
            this.incrementTotalPoints()

          } else {
              if(updatedNode.tier >= 5 && updatedNode.tier < 8 && this.state.totalPoints < MAXIMUM_POINTS && (updatedNode.status === 'available' || updatedNode.status === 'active')) {
                var pointsNeeded = TIER_5_POINT_THRESHOLD-this.state.totalPoints
                window.alert("Spend " + pointsNeeded + " more points to unlock the next tier.")
              }
              else if (updatedNode.tier >= 8 && this.state.totalPoints < MAXIMUM_POINTS && (updatedNode.status === 'available' || updatedNode.status === 'active')) {
                var pointsNeeded = TIER_8_POINT_THRESHOLD-this.state.totalPoints
                window.alert("Spend " + pointsNeeded + " more points to unlock the next tier.")
              }
              else if(this.state.totalPoints === MAXIMUM_POINTS) {
                window.alert("You have used the maximum number of points. Right click a talent to unselect it.")
              }
          }
        }
      
        if (updatedNode.currentPoints > 0) {
          updatedNode.status = 'active';
          if (updatedNode.children) {
            updatedNode.children.forEach((childId) => {
              const childNode = this.getNodeDataById(childId);
              if (childNode && childNode.status !== 'active') {
                childNode.status = 'available';
                childNode.activeLinks++;
              }
            });
          }
        }
      
        console.log('node points after click:', updatedNode.currentPoints);
      
        // Find the index of the clicked node in the nodes array
        const nodeIndex = updatedData.nodes.findIndex((node) => node.id === nodeId);
      
        // Replace the old node with the updated node in the nodes array
        if (nodeIndex !== -1) {
          updatedData.nodes[nodeIndex] = updatedNode;
        }
      
        this.setState((prevState) => ({
          data: updatedData,
        }));
    };

    onRightClickNode = (event, nodeId, nodeDatum) => {
        event.preventDefault();
        const updatedData = { ...this.state.data }; // Make a copy of the original data
        const updatedNode = { ...nodeDatum }; // Make a copy of the clicked node data
      
        if(updatedNode.currentPoints > 0) {
            updatedNode.currentPoints--
            this.decrementTotalPoints()
        }

        if(updatedNode.currentPoints === 0) {
            updatedNode.status = 'available'
            if(updatedNode.descendants) {
                updatedNode.descendants.forEach((descendantId) => {
                    const descendantNode = this.getNodeDataById(descendantId);
                    if (descendantNode) {
                        descendantNode.currentPoints = 0;
                        descendantNode.status = 'unavailable';
                    }
                });
            }
        }
      
        // Find the index of the clicked node in the nodes array
        const nodeIndex = updatedData.nodes.findIndex((node) => node.id === nodeId);
      
        // Replace the old node with the updated node in the nodes array
        if (nodeIndex !== -1) {
          updatedData.nodes[nodeIndex] = updatedNode;
        }
      
        this.setState((prevState) => ({
          data: updatedData,
        }));

        this.updateTotalPoints()
    }

    render() {    
        this.updateLinkPaths()    
          return (
            <div style={containerStyles} >
              <div className='bar-separator'></div>
              <div className='talent-graph-bar'>
                <h2 className='shaman-text'>
                  Points Spent: 
                </h2>
                <h2 className='points'>
                  {this.state.totalPoints}/{MAXIMUM_POINTS}
                </h2>
                <h2 className='shaman-text gap'>
                  Level Required:
                </h2>
                <h2 className='points'>
                  {(this.state.totalPoints*2) + 9} 
                </h2>
                  
              </div>
              <Graph
                    ref={this.graphRef} 
                    id={this.state.id}
                    data={this.state.data}
                    config={this.state.config}
                    onClickNode={this.onClickNode}
                    onRightClickNode={this.onRightClickNode}
                />
            </div>
        );
    }
  }
  
  export default TalentTree;