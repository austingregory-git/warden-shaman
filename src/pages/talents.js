import React from "react";

//import {Tree} from "react-tree-graph";
import Tree from "react-d3-tree";
import {data} from "../data/data.js"
import { useCenteredTree } from "../util/helpers";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const containerStyles = {
    width: "100vw",
    height: "100vh",
    background: "#eee"
  };

const useStyles = makeStyles(
    createStyles({
      name: {
        fontSize: "16px"
      },
      edit: {
        position: "absolute",
        top: "0px",
        right: "0px",
        color: "#4BA083"
      },
      attributes: {
        position: "absolute",
        bottom: "5px",
        right: "10px"
      }
    })
  );

const renderForeignObjectNode = ({
  nodeDatum,
  toggleNode,
  foreignObjectProps,
  classes
}) => (
  <>
    {/* `foreignObject` requires width & height to be explicitly set. */}
    <foreignObject {...foreignObjectProps}>
        <div style={{border: "1px solid black"}}>
          <img src={nodeDatum.image}></img>
        </div>
    </foreignObject>
  </>
);

const nodeSize = { x:56, y:56 }
const foreignObjectProps = { width: nodeSize.x, height: nodeSize.y, x: -30, y: -40 };
const separation = { siblings: 2, nonSiblings: 2};
const depthFactor = 100
const collapsible = false
const draggable = false
const zoomable = false

//with react-d3-tree
const Talents = () => {

    const [translate, containerRef] = useCenteredTree();

    return (
        <div style={containerStyles} ref={containerRef}>
            <Tree
                data={data}
                collapsible={collapsible}
                draggable={draggable}
                zoomable={zoomable}
                translate={translate}
                nodeSize={nodeSize}
                separation={separation}
                depthFactor={depthFactor}
                renderCustomNodeElement={(rd3tProps) =>
                    renderForeignObjectNode({ ...rd3tProps, foreignObjectProps, data })
                }
                pathFunc="straight"
                orientation="vertical"
            />
        </div>
    );
};
 
export default Talents;