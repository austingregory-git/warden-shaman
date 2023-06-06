import React from "react";
import DocViewer from "./doc.js";

const file = "Warden Shaman - Dragonflight Update.docx";
const type = "docx";
 
const Overview = () => {
    return (
        <div className="App">
            <DocViewer source="https://docs.google.com/document/d/1_Ou_DofYLw2k8gxFPEouvfDfn4_M2kgx16BYm4Bg_Vc" />
        </div>
    );
};
 
export default Overview;