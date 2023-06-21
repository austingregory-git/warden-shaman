import { RenderCustomNode } from "../pages/talents2"

export const config = {
    width: "100vw",
    height: "100vh",
    nodeHighlightBehavior: true,
    staticGraph: true,
    node: {
      renderLabel: false, 
      symbolType: "circle",
      size: {
        height: 640,
        width: 640,
      },
      viewGenerator: node => <RenderCustomNode nodeDatum={node}/>,
    },
    link: {
        strokeWidth: 4,
        color: "#ffd100",
    },
}