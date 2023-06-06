import React from "react";


const DocIframe = ({ source }) => {
  if (!source) {
    return <div>Loading...</div>;
  }

  const src = source;
  return (
    <div>
      <iframe
        src={src}
        title="file"
        width="100%"
        height="2400"
      ></iframe>
    </div>
  );
};

export default DocIframe;