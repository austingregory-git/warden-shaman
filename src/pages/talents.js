import React from "react";

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
const separation = { siblings: 2, nonSiblings: 2};
const depthFactor = 100
const collapsible = false
const draggable = false
const zoomable = false


// const infoItems = ["line one", "line two"]
// const tip = infoItems.join('\n')

// <Tooltip
//     title={
//         <div style={{ whiteSpace: 'pre-line' }}>{tip}</div>
//     }
// >
//     <IconButton/>
// </Tooltip>
//TODO update tooltip title to have new lines 
const renderForeignObjectNode = ({
  nodeDatum,
  toggleNode,
  foreignObjectProps,
  classes
}) => (
  <Tooltip title={<div style={{whiteSpace: 'pre-line'}}>{nodeDatum.name + '\n' + nodeDatum.requirements.join('\n') + '\n' + nodeDatum.description}</div>} placement="right">
    <foreignObject {...foreignObjectProps}>
        <div style={{border: "4px solid limegreen", height: nodeSize.y, width: nodeSize.x}}>
          <img src={nodeDatum.image}></img>
        </div>
    </foreignObject>
  </Tooltip>
);

const handleNodeClick = () => {

};

const Talents = () => {

    const [translate, containerRef] = useCenteredTree();
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
      if (!target.children) {
        // Target node has no children -> this link leads to a leaf node.
        return 'link';
      }
      // Style it as a link connecting two branch nodes by default.
      return 'link';
    };


    return (
        <div style={containerStyles} ref={containerRef}>
            <Tree
                data={data}
                collapsible={collapsible}
                draggable={draggable}
                onNodeClick={handleNodeClick}
                zoomable={zoomable}
                translate={translate}
                nodeSize={nodeSize}
                separation={separation}
                depthFactor={depthFactor}
                renderCustomNodeElement={(nodeProps) =>
                    renderForeignObjectNode({ ...nodeProps, foreignObjectProps, data})
                }
                //pathFunc="straight"
                pathFunc={straightPathFunc}
                //pathClassFunc={getDynamicPathClass}
                //pathClassFunc={() => 'path'}
                orientation="vertical"
                styles={{
                  links: {
                        stroke: 'red',
                        strokeWidth: "2px",
                      },
               }}
            />
        </div>
    );
};
 
export default Talents;