import React, { Component, useEffect } from 'react';

//import {Tree} from "react-tree-graph";
import Tree from "react-d3-tree";
import {data} from "../data/data.js"
import { useCenteredTree } from "../util/helpers";
//import { TreeLinkDatum, TreeNodeDatum } from 'react-d3-tree/lib/types/types/common.js';
import { Link, Tooltip } from '@mui/material';
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
//...() => getForeignObjectProps
function renderForeignObjectNode(
  {nodeDatum, hierarchyPointNode},
  handleNodeClick,
  handleNodeRightClick,
  getForeignObjectProps,
  updateNode) {
    // const foreignObjectProps = getForeignObjectProps(nodeDatum)
    // updateNode(nodeDatum, hierarchyPointNode, foreignObjectProps)
    return(
      <Tooltip title={<div style={{whiteSpace: 'pre-line'}}>{generateTooltip(nodeDatum)}</div>} placement="right">
      <foreignObject {...getForeignObjectProps(nodeDatum, hierarchyPointNode)}>
        <div xmlns='http://www.w3.org/1999/xhtml' style={handleNodeStyle(nodeDatum.status)}>
              <img 
                src={nodeDatum.image} 
                onClick={() => handleNodeClick(nodeDatum)} 
                onContextMenu={(e) => {
                  e.preventDefault();
                  handleNodeRightClick(nodeDatum);
                }}>

              </img>
        </div>
      </foreignObject>
    </Tooltip>
    )
  }

function setPathFunction(linkDatum) {
  console.log("in path function")
  const { source, target } = linkDatum;
  // const source = linkDatum.source
  // const target = linkDatum.target
  // console.log(linkDatum)
  // console.log(linkDatum.source)
  // console.log(linkDatum.source.x)
  // console.log(source.x)
  //source.x = this.rd3tProps.hierarchyPointNode.x
  //console.log('in path function do we know?: ' + this.state.currentNodeX)
  if(source.x > target.x)
    return `M${source.x-nodeSize.x/2},${source.y+nodeSize.x/2}L${target.x},${target.y-nodeSize.y/2}`;
  //Target Node is right of the source Node
  else if(source.x < target.x)
    return `M${source.x+nodeSize.x/2},${source.y+nodeSize.x/2}L${target.x},${target.y-nodeSize.y/2}`;
  //Target Node is aligned with the source Node
  else
    return `M${source.x},${source.y}L${target.x},${target.y-nodeSize.y/2}`;
  // if(this.currentNodeX > target.x)
  //   return `M${this.currentNodeX-nodeSize.x/2},${this.currentNodeY+nodeSize.x/2}L${target.x},${target.y-nodeSize.y/2}`;
  // //Target Node is right of the source Node
  // else if(this.currentNodeX < target.x)
  //   return `M${this.currentNodeX+nodeSize.x/2},${this.currentNodeY+nodeSize.x/2}L${target.x},${target.y-nodeSize.y/2}`;
  // //Target Node is aligned with the source Node
  // else
  //   return `M${this.currentNodeX},${this.currentNodeY}L${target.x},${target.y-nodeSize.y/2}`;
};

function updateLinkFunction({nodeDatum}, linkDatum) {
  console.log("in update paths function")
  //console.log(nodeDatum)
  //console.log(linkDatum)
  const { source, target } = linkDatum;
  //source.x = this.rd3tProps.hierarchyPointNode.x
  if(source.x > target.x)
    return `M${source.x-nodeSize.x/2},${source.y+nodeSize.x/2}L${target.x},${target.y-nodeSize.y/2}`;
  //Target Node is right of the source Node
  else if(source.x < target.x)
    return `M${source.x+nodeSize.x/2},${source.y+nodeSize.x/2}L${target.x},${target.y-nodeSize.y/2}`;
  //Target Node is aligned with the source Node
  else
    return `M${source.x},${source.y}L${target.x},${target.y-nodeSize.y/2}`;
};

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
        //hierarchyPointNode: {x: 0, y:0},
        renderCustomNodeElement: renderForeignObjectNode,
        //pathFunc: straightPathFunc,
        updateLinks: updateLinkFunction,
      };

      this.setPathFunc = this.setPathFunc.bind(this);
      this.handleCustomNodeFnChange = this.handleCustomNodeFnChange.bind(this)
      this.handleCustomLinkChange = this.handleCustomLinkChange.bind(this)
  }
  
  setPathFunc(pathFunc) {
    this.setState({ pathFunc })
  };

  handleCustomNodeFnChange = evt => {
    this.setState({ renderCustomNodeElement: renderForeignObjectNode});
  };

  handleCustomLinkChange = evt => {
    this.setState({pathFunc: setPathFunction});
  };




  // incrementPoints() {
  //   this.setState({totalPoints: totalPoints+1})
  // }

  // handleCustomLinkFnChange = evt => {
  //   this.setState({ renderCustomNodeElement: renderForeignObjectNode});
  // };
  componentDidMount() {
    //this.forceUpdate()
    //console.log(this.state)
    //console.log('hi')
    //setPathFunction(this.state.linkDatum)
  }

  render() {
    const foreignObjectProps = { width: nodeSize.x+borderWidth*2, height: nodeSize.y+borderWidth*2, x: -nodeSize.x/2-borderWidth, y: -nodeSize.y/2-borderWidth};

    const getForeignObjectProps = (nodeDatum, hierarchyPointNode) => {
      console.log('in get foreign object props: ' + hierarchyPointNode.x)
      if(nodeDatum.sharedParent && nodeDatum.sharedParents === 2) {
        if(nodeDatum.parentOrientation === 'left') {
          hierarchyPointNode.x = hierarchyPointNode.x + nodeSize.x - nodeSize.x/2-borderWidth
          return {width: nodeSize.x+borderWidth*2, height: nodeSize.y+borderWidth*2, x: nodeSize.x - nodeSize.x/2-borderWidth, y: -nodeSize.y/2-borderWidth}
        }
        if(nodeDatum.parentOrientation === 'right')
          return {width: nodeSize.x+borderWidth*2, height: nodeSize.y+borderWidth*2, x: -nodeSize.x - nodeSize.x/2-borderWidth, y: -nodeSize.y/2-borderWidth}
      }

      if(nodeDatum.sharedParent && nodeDatum.sharedParents === 3) {
        if(nodeDatum.parentOrientation === 'left')
          return {width: nodeSize.x+borderWidth*2, height: nodeSize.y+borderWidth*2, x: 2*nodeSize.x - nodeSize.x/2-borderWidth, y: -nodeSize.y/2-borderWidth}
        if(nodeDatum.parentOrientation === 'right')
          return {width: nodeSize.x+borderWidth*2, height: nodeSize.y+borderWidth*2, x: -2*nodeSize.x - nodeSize.x/2-borderWidth, y: -nodeSize.y/2-borderWidth}
      }
      return foreignObjectProps;
    } 

    const straightPathFunc = (linkDatum) => {
      const { source, target } = linkDatum;
      console.log(source)
      console.log('source node x: ' + source.x)
      console.log(target)
      console.log('target node x: ' + target.x)
      if(source.x > target.x)
        return `M${source.x-nodeSize.x/2},${source.y+nodeSize.x/2}L${target.x},${target.y-nodeSize.y/2}`;
      //Target Node is right of the source Node
      else if(source.x < target.x)
        return `M${source.x+nodeSize.x/2},${source.y+nodeSize.x/2}L${target.x},${target.y-nodeSize.y/2}`;
      //Target Node is aligned with the source Node
      else
        return `M${source.x},${source.y}L${target.x},${target.y-nodeSize.y/2}`;
      // if(this.hierarchyPointNode.x > target.x)
      //   return `M${this.hierarchyPointNode.x-nodeSize.x/2},${this.hierarchyPointNode.y+nodeSize.x/2}L${target.x},${target.y-nodeSize.y/2}`;
      // //Target Node is right of the source Node
      //   else if(this.hierarchyPointNode.x < target.x)
      //     return `M${this.hierarchyPointNode.x+nodeSize.x/2},${this.hierarchyPointNode.y+nodeSize.x/2}L${target.x},${target.y-nodeSize.y/2}`;
      //   //Target Node is aligned with the source Node
      //   else
      //     return `M${this.hierarchyPointNode.x},${this.hierarchyPointNode.y}L${target.x},${target.y-nodeSize.y/2}`;
    };

    const getDynamicPathClass = ({ source, target }, orientation) => {
      // Style it as a link connecting two branch nodes by default.
      return 'active_path';
    };

    const updateNode = (nodeDatum, hierarchyPointNode, {x, y}) => {
      //const { source, target } = linkDatum;
      //console.log
      //console.log(hierarchyPointNode)
      //console.log(x)
      //console.log(linkDatum)
      // console.log('current node x: ' + this.currentNodeX)
      // hierarchyPointNode.x = hierarchyPointNode.x + x
      // hierarchyPointNode.y = hierarchyPointNode.y + y
      // this.setState({hierarchyPointNode})
      
      // console.log('current node x after set: ' + this.currentNodeX)
      //source.x = hierarchyPointNode.x

      //this.handleCustomLinkChange()
      //hierarchyPointNode.y += y
    }

    const handleNodeClick = (nodeDatum) => {
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
      this.handleCustomLinkChange()
      this.handleCustomNodeFnChange()
      console.log('node points after click: ' + nodeDatum.currentPoints)
    };

    const handleNodeRightClick = (nodeDatum) => {
      console.log('node points before click: ' + nodeDatum.currentPoints)
      //for later... if(nodeDatum.currentPoints < nodeDatum.maxPoints)
      console.log('total points before click: ' + this.state.totalPoints)
      if(nodeDatum.currentPoints > 0) {
        nodeDatum.currentPoints--
        this.state.totalPoints--
      }

      console.log('total points after click: ' + this.state.totalPoints)
      if(nodeDatum.currentPoints === 0) {
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
              renderCustomNodeElement={(rd3tProps) => this.state.renderCustomNodeElement(rd3tProps, handleNodeClick, handleNodeRightClick, getForeignObjectProps, updateNode)}
              //pathFunc={(linkProps) => this.state.pathFunc(linkProps)}
              pathFunc={straightPathFunc}
              pathClassFunc={getDynamicPathClass}
              orientation="vertical"  
              allowForeignObjects={true}
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