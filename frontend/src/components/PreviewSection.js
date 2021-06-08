import React from "react";
import PreviewItem from "./PreviewItem";

import "./PreviewSection.css";

const PreviewSection = (props) => {
  return (
    <>
      <div className="preview-section__container">
        <div className="preview-section__header">{props.header}</div>
        <div className="preview-section__content">
          <PreviewItem />
          <PreviewItem />
          <PreviewItem />
          <PreviewItem />
          <PreviewItem />
          <PreviewItem />
          <PreviewItem />
          <PreviewItem />
        </div>
      </div>
    </>
  );
};

export default PreviewSection;
