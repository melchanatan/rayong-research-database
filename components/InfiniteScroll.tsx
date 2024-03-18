import { TopicContext } from "@/utils/TopicContextProvider";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";

const InfiniteScroll = ({ position }) => {
  const { filteredTopics } = useContext(TopicContext);
  const maxDistanceFromCenter = Math.sqrt(
    window.innerWidth ** 2 + window.innerHeight ** 2
  );
  const dragCoefficent = 0.9;
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push("/topic");
  };
  return (
    <div
      className="w-screen h-screen absolute trasition-all duration-300"
      style={{
        top: position.y * dragCoefficent,
        left: position.x * dragCoefficent,
      }}
    >
      {filteredTopics.map((topic, index) => {
        const distanceFromCenter =
          maxDistanceFromCenter -
          Math.sqrt(
            Math.pow(
              window.innerWidth / 2 - (position.x + topic.position.x),
              2
            ) +
              Math.pow(
                window.innerHeight / 2 - (position.y + topic.position.y),
                2
              )
          );

        const scale = Math.min(distanceFromCenter / 700);

        return (
          <FloatingButton
            key={"topic" + index}
            handleClick={handleClick}
            content={topic.name}
            top={topic.position.y}
            left={topic.position.x}
            scale={scale}
          />
        );
      })}
    </div>
  );
};

export default InfiniteScroll;

const FloatingButton = ({ content, handleClick, top, left, scale }) => {
  return (
    <a
      onClick={handleClick}
      draggable="false"
      style={{
        transform: `scale(${scale})`,
        top: top,
        left: left,
      }}
      className={`select-none absolute bg-red-500 hover:scale-110 transition-all duration-300 topic-tag `}
    >
      {content}
    </a>
  );
};
