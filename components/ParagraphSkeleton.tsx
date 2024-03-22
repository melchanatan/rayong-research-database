import React from "react";

const ParagraphSkeleton = ({ lines = 10, className }) => {
  return (
    <div className={className}>
      {Array(lines)
        .fill(0)
        .map((_, index) => (
          <div
            className="loading w-full h-[18px] mb-2"
            key={`${index}-skeleton`}
          />
        ))}
    </div>
  );
};

export default ParagraphSkeleton;
