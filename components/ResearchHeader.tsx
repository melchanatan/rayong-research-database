import React from "react";

const ResearchHeader = () => {
  return (
    <div>
      <h3 className="inline-flex items-center gap-3 flex-wrap !leading-5">
        หัวข้อ
        <span className="topic-tag bg-red-500 !py-0 !px-3">หมวดหมู่ข้อมูล</span>
      </h3>
      <p className="text-gray-600">เผยแพร่วันที่ 12 กย. 2556</p>
    </div>
  );
};

export default ResearchHeader;
