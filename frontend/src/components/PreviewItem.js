import React from "react";

import "./PreviewItem.css";

const PreviewItem = (props) => {
  return (
    <>
      <div className="preview-item__container">
        {props.item}
      </div>
    </>
  );
};

export default PreviewItem;
