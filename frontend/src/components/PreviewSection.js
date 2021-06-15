import React from "react";
import PreviewItem from "./PreviewItem";

import "./PreviewSection.css";

const PreviewSection = (props) => {
  return (
    <>
      <div className="preview-section__container">
        <div className="preview-section__header">{props.header}</div>
        <div className="preview-section__content">
          {props.content.data.content.map(tweet => <PreviewItem item={tweet} />)}
        </div>
      </div>
    </>
  );
};

export default PreviewSection;
