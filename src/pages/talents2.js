import React, { Component, useEffect, useRef } from 'react';
import {Graph} from "react-d3-graph";
import {graphData} from "../data/graphData.js"
import {config} from "../config/config.js"
import { Tooltip } from '@mui/material';
import './talents.css';
import background from "./WardenShamanBackground.PNG";
import * as d3 from 'd3';

const nodeSize = { x:56, y:56}
const borderWidth = 4
const foreignObjectProps = { width: nodeSize.x+borderWidth*2, height: nodeSize.y+borderWidth*2, x: -nodeSize.x/2-borderWidth, y: -nodeSize.y/2-borderWidth};

export function RenderCustomNode({nodeDatum}) {
    return(
        <Tooltip title={<div style={{whiteSpace: 'pre-line'}}>{generateTooltip(nodeDatum)}</div>} placement="right">
            <foreignObject {...foreignObjectProps}>
                <div xmlns='http://www.w3.org/1999/xhtml' style={handleNodeStyle(nodeDatum.status)}>
                        <img src={nodeDatum.image}></img>
                </div>
            </foreignObject>
        </Tooltip>
    )
}

const containerStyles = {
    width: "100vw",
    height: "100vh",
    background: "#eee",
    backgroundImage: `url(${background})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
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
        border: '4px solid yellow',
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
    //     this.updateLinkPaths();
    // }

    // componentDidUpdate() {
    //     this.updateLinkPaths();
    // }
    
    updateLinkPaths() {
        const links = this.state.data.links
        if (links) {
          links.forEach((link) => {
            link.breakPoints = this.createCustomLinkPath(link);
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
        console.log(source)
        console.log(target)
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

    render() {    
        this.updateLinkPaths()    
        return (
            <div style={containerStyles} >
                <Graph
                    ref={this.graphRef} 
                    id={this.state.id}
                    data={this.state.data}
                    config={this.state.config}
                />
            </div>
        );
    }
  }
  
  const generateTooltip = (nodeDatum) => {
    const abilityDetails = nodeDatum.abilityDetails === undefined ? "" : nodeDatum.abilityDetails.join('\n') + '\n'
    const name = nodeDatum.name + '\n'
    const requirements = nodeDatum.requirements.join('\n') + '\n'
    const description = nodeDatum.description
    const tooltip = name + abilityDetails + requirements + description
    return tooltip;
  }
  
  export default TalentTree;