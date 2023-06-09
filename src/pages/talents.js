import React, { Component } from 'react';

//import {Tree} from "react-tree-graph";
import Tree from "react-d3-tree";
import {data} from "../data/data.js"
import { useCenteredTree } from "../util/helpers";
import { Tooltip } from '@mui/material';
import './talents.css';
import background from "./WardenShamanBackground.PNG";

const containerStyles = {
    width: "100vw",
    height: "100vh",
    background: "#eee",
    backgroundImage: `url(${background})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  };

const nodeSize = { x:56, y:56}
const borderWidth = 4
const foreignObjectProps = { width: nodeSize.x+borderWidth*2, height: nodeSize.y+borderWidth*2, x: -nodeSize.x/2-borderWidth, y: -nodeSize.y/2-borderWidth};
//const translate = {x: this.props.width, y: this.props.height}

// const renderForeignObjectNode = ({
//   nodeDatum,
//   toggleNode,
//   foreignObjectProps,
//   handleNodeClick,
// }) => (
//   <Tooltip title={<div style={{whiteSpace: 'pre-line'}}>{generateTooltip(nodeDatum)}</div>} placement="right">
//     <foreignObject {...foreignObjectProps}>
//         <div style={{border: "4px solid limegreen", height: nodeSize.y, width: nodeSize.x}}>
//           <img src={nodeDatum.image} onClick={() => handleNodeClick(nodeDatum, foreignObjectProps)}></img>
//         </div>
//     </foreignObject>
//   </Tooltip>
// );

function renderForeignObjectNode(
  {nodeDatum},
  foreignObjectProps,
  handleNodeClick) {
    return(
      <Tooltip title={<div style={{whiteSpace: 'pre-line'}}>{generateTooltip(nodeDatum)}</div>} placement="right">
      <foreignObject {...foreignObjectProps}>
        <div xmlns='http://www.w3.org/1999/xhtml' style={{border: "4px solid limegreen", height: nodeSize.y, width: nodeSize.x}}>
              <img src={nodeDatum.image} onClick={() => handleNodeClick(nodeDatum, foreignObjectProps)}></img>
        </div>
      </foreignObject>
    </Tooltip>
    )
  }


function renderForeignObjectNodeChosen(
  {nodeDatum},
  foreignObjectProps,
  handleNodeClick) {
    return(
      <Tooltip title={<div style={{whiteSpace: 'pre-line'}}>{generateTooltip(nodeDatum)}</div>} placement="right">
        <foreignObject {...foreignObjectProps}>
          <div xmlns='http://www.w3.org/1999/xhtml' style={{border: "4px solid black", height: nodeSize.y, width: nodeSize.x}}>
                <img src={nodeDatum.image} onClick={() => handleNodeClick(nodeDatum, foreignObjectProps)}></img>
          </div>
        </foreignObject>
      </Tooltip>
    )
}
// const renderForeignObjectNodeChosen = ({
//   nodeDatum,
//   foreignObjectProps,
//   handleNodeClick,
// }) => (
//   <Tooltip title={<div style={{whiteSpace: 'pre-line'}}>{generateTooltip(nodeDatum)}</div>} placement="right">
//     <foreignObject {...foreignObjectProps}>
//         <div style={{border: "4px solid yellow", height: nodeSize.y, width: nodeSize.x}}>
//           <img src={nodeDatum.image} onClick={() => handleNodeClick(nodeDatum, foreignObjectProps)}></img>
//         </div>
//     </foreignObject>
//   </Tooltip>
// );

const customNodeFnMapping = {
  available: {
    fn: (nodeDatum, foreignObjectProps, handleNodeClick) => (
      <Tooltip title={<div style={{whiteSpace: 'pre-line'}}>{generateTooltip(nodeDatum)}</div>} placement="right">
        <foreignObject {...foreignObjectProps}>
            <div style={{border: "4px solid limegreen", height: nodeSize.y, width: nodeSize.x}}>
              <img src={nodeDatum.image} onClick={() => handleNodeClick(nodeDatum, foreignObjectProps)}></img>
            </div>
        </foreignObject>
      </Tooltip>
    ),
  },
  unavailable: {
    fn: (nodeDatum, foreignObjectProps, handleNodeClick) => (
      <Tooltip title={<div style={{whiteSpace: 'pre-line'}}>{generateTooltip(nodeDatum)}</div>} placement="right">
        <foreignObject {...foreignObjectProps}>
            <div style={{border: "4px solid blue", height: nodeSize.y, width: nodeSize.x}}>
              <img src={nodeDatum.image} onClick={() => handleNodeClick(nodeDatum, foreignObjectProps)}></img>
            </div>
        </foreignObject>
      </Tooltip>
    ),
  },
  chosen: {
    fn: (nodeDatum, foreignObjectProps, handleNodeClick) => (
      <Tooltip title={<div style={{whiteSpace: 'pre-line'}}>{generateTooltip(nodeDatum)}</div>} placement="right">
        <foreignObject {...foreignObjectProps}>
            <div style={{border: "4px solid black", height: nodeSize.y, width: nodeSize.x}}>
              <img src={nodeDatum.image} onClick={() => handleNodeClick(nodeDatum, foreignObjectProps)}></img>
            </div>
        </foreignObject>
      </Tooltip>
    ),
  },
};

const handleNodeClick = (nodeDatum, foreignObjectProps) => {
  console.log(nodeDatum.points)
  //for later... if(nodeDatum.points < nodeDatum.maxPoints)
  if(nodeDatum.points < 2)
    nodeDatum.points++
  console.log(nodeDatum.points)
  console.log(nodeDatum.description)
  nodeDatum.description = "Ooga!"
  console.log(nodeDatum.description);
  this.handleCustomNodeFnChange()
};

// const handleNodeClick = (nodeDatum, foreignObjectProps) => {
//   console.log(nodeDatum.description)
//   nodeDatum.description = "Ooga!"
//   console.log(nodeDatum.description);
//   handleCustomNodeFnChange()
// };

class TalentTree extends Component {
  constructor() {
      super();

      this.addedNodesCount = 0;
      this.state = {
        data: data,
        orientation: 'vertical',
        collapsible: false,
        zoomable: false,
        draggable: false,
        depthFactor: 100,
        translateX: window.innerWidth/2,
        translateY: window.innerWidth/16,
        separation: { siblings: 2, nonSiblings: 2},
        nodeSize: nodeSize,
        //renderCustomNodeElement: {renderForeignObjectNode}
        renderCustomNodeElement: renderForeignObjectNode,
        //renderCustomNodeElement: customNodeFnMapping['available'].fn
      };

      //this.setTranslate = this.setTranslate.bind(this);
      this.setPathFunc = this.setPathFunc.bind(this);
  }
  
  setPathFunc(pathFunc) {
    this.setState({ pathFunc })
  }
  // setTranslate() {
  //   this.setState({ translate: useCenteredTree()})
  // }

  handleCustomNodeFnChange = evt => {
    console.log('anyone there?')
    //this.setState({ renderCustomNodeElement: customNodeFnMapping['chosen'].fn });
    this.setState({ renderCustomNodeElement: renderForeignObjectNodeChosen});
  };

  render() {
    //const [translate, containerRef] = useCenteredTree();
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
      console.log(nodeDatum.points)
      //for later... if(nodeDatum.points < nodeDatum.maxPoints)
      if(nodeDatum.points < 2)
        nodeDatum.points++
      console.log(nodeDatum.points)
      console.log(nodeDatum.description)
      nodeDatum.description = "Ooga!"
      console.log(nodeDatum.description);
      this.handleCustomNodeFnChange()
    };

    //goes inside <div style... ref={containerRef}>
    return (
      <div style={containerStyles} >
          <Tree 
              data={this.state.data}
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
              // renderCustomNodeElement={(rd3tProps) =>
              //   {this.state.renderCustomNodeElement(...rd3tProps, foreignObjectProps, handleNodeClick)}
              // }
              renderCustomNodeElement={(rd3tProps) => this.state.renderCustomNodeElement(rd3tProps, foreignObjectProps, handleNodeClick)}
              // renderCustomNodeElement={
              //   this.state.renderCustomNodeElement
              //     ? rd3tProps => this.state.renderCustomNodeElement(rd3tProps, foreignObjectProps, this.state)
              //     : undefined
              // }
              //pathFunc="straight"
              pathFunc={straightPathFunc}
              pathClassFunc={getDynamicPathClass}
              //pathClassFunc={() => 'path'}
              orientation="vertical"
              //onNodeClick={(nodeDatum) => handleNodeClick(...nodeDatum)}
              //onNodeClick={this.handleNodeClick}
            
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

// const Talents = () => {

//     const [translate, containerRef] = useCenteredTree();
//     const straightPathFunc = (linkDatum) => {
//       const { source, target } = linkDatum;
//       //Target Node is left of the source Node
//       if(source.x > target.x)
//         return `M${source.x-nodeSize.x/2},${source.y+nodeSize.x/2}L${target.x},${target.y-nodeSize.y/2}`;
//       //Target Node is right of the source Node
//       else if(source.x < target.x)
//         return `M${source.x+nodeSize.x/2},${source.y+nodeSize.x/2}L${target.x},${target.y-nodeSize.y/2}`;
//       //Target Node is aligned with the source Node
//       else
//         return `M${source.x},${source.y}L${target.x},${target.y-nodeSize.y/2}`;
//     };

//     const getDynamicPathClass = ({ source, target }, orientation) => {
//       // Style it as a link connecting two branch nodes by default.
//       return 'active_path';
//     };
    
//     const handleNodeClick = (nodeDatum, foreignObjectProps) => {
//       window.alert(
//         nodeDatum.children ? "Clicked a branch node" : "Clicked a leaf node."
//       );
//     };

//     return (
//         <div style={containerStyles} ref={containerRef}>
//             <Tree 
//                 data={data}
//                 collapsible={collapsible}
//                 draggable={draggable}
//                 //onNodeClick={(nodeDatum) => handleNodeClick(...nodeDatum)}
//                 zoomable={zoomable}
//                 translate={translate}
//                 renderCustomNodeElement={(rd3tProps) =>
//                     renderForeignObjectNode({ ...rd3tProps, foreignObjectProps, handleNodeClick})
//                 }
//                 //pathFunc="straight"
//                 pathFunc={straightPathFunc}
//                 pathClassFunc={getDynamicPathClass}
//                 //pathClassFunc={() => 'path'}
//                 orientation="vertical"
//             />
//         </div>
//     );
// };        nodeSize={nodeSize}
//                 separation={separation}
//                 depthFactor={depthFactor}
        
 
//export default Talents;
export default TalentTree;