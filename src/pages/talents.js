import React, { Component, useEffect } from 'react';

//import {Tree} from "react-tree-graph";
import Tree from "react-d3-tree";
import {data} from "../data/data.js"
import { useCenteredTree } from "../util/helpers";
import { Tooltip } from '@mui/material';
import './talents.css';
import background from "./WardenShamanBackground.PNG";

const nodeSize = { x:56, y:56}
const borderWidth = 4
const foreignObjectProps = { width: nodeSize.x+borderWidth*2, height: nodeSize.y+borderWidth*2, x: -nodeSize.x/2-borderWidth, y: -nodeSize.y/2-borderWidth};

const containerStyles = {
    width: "100vw",
    height: "100vh",
    background: "#eee",
    backgroundImage: `url(${background})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  };

  const handleNodeStyle = (status) => {
    console.log(status)
    if (status == 'available') {
     return {
        border: '4px solid limegreen',
        height: nodeSize.y,
        width: nodeSize.x
     }
    }
    else if (status == 'unavailable')
      return {
        border: '4px solid gray',
        height: nodeSize.y,
        width: nodeSize.x
    }
    else if(status == 'active')
      return {
        border: '4px solid yellow',
        height: nodeSize.y,
        width: nodeSize.x
    }
    return;
};

function renderForeignObjectNode(
  {nodeDatum},
  foreignObjectProps,
  handleNodeClick,
  handleNodeRightClick) {  
    return(
      <Tooltip title={<div style={{whiteSpace: 'pre-line'}}>{generateTooltip(nodeDatum)}</div>} placement="right">
      <foreignObject {...foreignObjectProps}>
        <div xmlns='http://www.w3.org/1999/xhtml' style={handleNodeStyle(nodeDatum.status)}>
              <img 
                src={nodeDatum.image} 
                onClick={() => handleNodeClick(nodeDatum, foreignObjectProps)} 
                onContextMenu={(e) => {
                  e.preventDefault();
                  handleNodeRightClick(nodeDatum, foreignObjectProps);
                }}>

              </img>
        </div>
      </foreignObject>
    </Tooltip>
    )
  }

class TalentTree extends Component {
  constructor() {
      super();

      this.addedNodesCount = 0;
      this.state = {
        data: data,
        totalPoints: 0,
        orientation: 'vertical',
        collapsible: false,
        zoomable: false,
        draggable: false,
        depthFactor: 100,
        translateX: window.innerWidth/2,
        translateY: window.innerWidth/16,
        separation: { siblings: 2, nonSiblings: 2},
        nodeSize: nodeSize,
        renderCustomNodeElement: renderForeignObjectNode,
      };

      this.setPathFunc = this.setPathFunc.bind(this);
  }
  
  setPathFunc(pathFunc) {
    this.setState({ pathFunc })
  }

  handleCustomNodeFnChange = evt => {
    this.setState({ renderCustomNodeElement: renderForeignObjectNode});
  };

  render() {
    const foreignObjectProps = { width: nodeSize.x+borderWidth*2, height: nodeSize.y+borderWidth*2, x: -nodeSize.x/2-borderWidth, y: -nodeSize.y/2-borderWidth};
    const straightPathFunc = (linkDatum) => {
      const { source, target } = linkDatum;
      //Target Node is left of the source Node
      if(source.x > target.x)
        return `M${source.x-nodeSize.x/2},${source.y+nodeSize.x/2}L${target.x},${target.y-nodeSize.y/2}`;
      //Target Node is right of the source Node
      else if(source.x < target.x)
        return `M${source.x+nodeSize.x/2},${source.y+nodeSize.x/2}L${target.x},${target.y-nodeSize.y/2}`;
      //Target Node is aligned with the source Node
      else
        return `M${source.x},${source.y}L${target.x},${target.y-nodeSize.y/2}`;
    };

    const getDynamicPathClass = ({ source, target }, orientation) => {
      // Style it as a link connecting two branch nodes by default.
      return 'active_path';
    };

    const handleNodeClick = (nodeDatum, foreignObjectProps) => {
      console.log('node current points: ' + nodeDatum.currentPoints)
      console.log('total points before click: ' + this.state.totalPoints)
      if(nodeDatum.currentPoints < nodeDatum.maxPoints) {
        if((nodeDatum.tier < 5 || this.state.totalPoints >= 8) && (nodeDatum.tier < 8 || this.state.totalPoints >= 20)) {
          nodeDatum.currentPoints++
          this.state.totalPoints++
        }
        else
          console.log("spend more points!")
      }

      console.log('total points after click: ' + this.state.totalPoints)
      if(nodeDatum.currentPoints > 0) {
        nodeDatum.status = 'active'
        if(nodeDatum.children) {
          const childrenArray = Array.from(nodeDatum.children);
          childrenArray.forEach((children) => {
            children.status = 'available' 
          })
        }
      }
      this.handleCustomNodeFnChange()
      console.log('node points after click: ' + nodeDatum.currentPoints)
    };

    const handleNodeRightClick = (nodeDatum, foreignObjectProps) => {
      console.log('node points before click: ' + nodeDatum.currentPoints)
      //for later... if(nodeDatum.currentPoints < nodeDatum.maxPoints)
      console.log('total points before click: ' + this.state.totalPoints)
      if(nodeDatum.currentPoints > 0) {
        nodeDatum.currentPoints--
        this.state.totalPoints--
      }

      console.log('total points after click: ' + this.state.totalPoints)
      if(nodeDatum.currentPoints == 0) {
        nodeDatum.status = 'available'
        if(nodeDatum.children) {
          const childrenArray = Array.from(nodeDatum.children);
          childrenArray.forEach((children) => {
            children.status = 'unavailable' 
          })
        }
      }
      this.handleCustomNodeFnChange()
      console.log('node points after click: ' + nodeDatum.currentPoints)
    };

    //goes inside <div style... ref={containerRef}>
    return (
      <div style={containerStyles} >
          <Tree 
              data={this.state.data}
              totalPoints={this.state.totalPoints}
              collapsible={this.state.collapsible}
              draggable={this.state.draggable}
              zoomable={this.state.zoomable}
              translate={{x: this.state.translateX, y: this.state.translateY}}
              nodeSize={this.state.nodeSize}
              separation={this.state.separation}
              depthFactor={this.state.depthFactor}
              // renderCustomNodeElement={(rd3tProps) =>
              //     renderForeignObjectNode({ ...rd3tProps, foreignObjectProps, handleNodeClick})
              // }
              renderCustomNodeElement={(rd3tProps) => this.state.renderCustomNodeElement(rd3tProps, foreignObjectProps, handleNodeClick, handleNodeRightClick)}
              // renderCustomNodeElement={
              //   this.state.renderCustomNodeElement
              //     ? rd3tProps => this.state.renderCustomNodeElement(rd3tProps, foreignObjectProps, this.state)
              //     : undefined
              // }
              pathFunc={straightPathFunc}
              pathClassFunc={getDynamicPathClass}
              orientation="vertical"
            
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