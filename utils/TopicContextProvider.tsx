import React, { createContext, useState } from "react";
import { Topic } from "./TopicContext.type";
import Position from "./Position.type";

const defaultTopics: Topic[] = [
  {
    id: "1",
    name: "Topic 1",
    position: {
      x: 100,
      y: 100,
    },
    tagColor: "#600000",
    researchCounts: 1,
  },
  {
    id: "2",
    name: "Topic 2",
    position: {
      x: 200,
      y: 200,
    },
    tagColor: "#006000",
    researchCounts: 0,
  },
  {
    id: "3",
    name: "Topic 3",
    position: {
      x: 300,
      y: 300,
    },
    tagColor: "#000060",
    researchCounts: 9,
  },
];

const positions: Position[] = [];

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
const maxResearchCounts = 20;
defaultTopics.forEach((topic) => {
  const position: Position = {
    x:
      windowWidth * 0.5 +
      (((maxResearchCounts - 5 - topic.researchCounts) / maxResearchCounts) *
        (windowWidth * 0.5) +
        Math.random() * 100 * (Math.random() < 0.5 ? -1 : 1)) *
        (Math.random() < 0.5 ? -1 : 1),
    y:
      windowHeight * 0.5 +
      (((maxResearchCounts - 5 - topic.researchCounts) / maxResearchCounts) *
        (windowHeight * 0.5) +
        Math.random() * 100 * (Math.random() < 0.5 ? -1 : 1)) *
        (Math.random() < 0.5 ? -1 : 1),
  };

  positions.forEach((p) => {
    if (Math.abs(p.x - position.x) < 200 && Math.abs(p.y - position.y) < 200) {
      p = {
        x:
          Math.random() * windowWidth * 0.5 -
          (topic.researchCounts / 11) * windowWidth * 0.5,
        y:
          windowHeight * 0.5 - (topic.researchCounts / 11) * windowHeight * 0.5,
      };
    }
  });

  positions.push(position);
  topic.position = position;
});

const TopicContext = createContext(defaultTopics as Topic[]);

const TopicContextProvider = ({ children }: { children: JSX.Element }) => {
  const [topics, setTopics] = useState(defaultTopics);
  const [filteredTopics, setFilteredTopics] = useState(defaultTopics);
  return (
    <TopicContext.Provider
      value={{ topics, setTopics, filteredTopics, setFilteredTopics }}
    >
      {children}
    </TopicContext.Provider>
  );
};

export { TopicContextProvider, TopicContext };
