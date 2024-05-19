import React from "react";

const SectionTitle = (props) => {
  const { title, subtitle } = props;
  return (
    <div className="title text-center m-[70px]">
      <h1 className="text-[40px] text-secondary ">{title ? title : ""}</h1>
      <h3 className="sub text-special">{subtitle ? subtitle : ""}</h3>
    </div>
  );
};

export default SectionTitle;
