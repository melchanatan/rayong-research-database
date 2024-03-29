import React from "react";

const ResearchHeader = ({ title, tagName, date, tagColor }) => {
  return (
    <div>
      <h3 className="inline-flex items-center gap-3 flex-wrap !leading-5">
        {title}
        <span
          className="topic-tag bg-red-500 !py-0 !px-3"
          style={{
            backgroundColor: tagColor,
          }}
        >
          {tagName}
        </span>
      </h3>
      <p className="text-gray-600">เผยแพร่วันที่ {date}</p>
    </div>
  );
};

export default ResearchHeader;
