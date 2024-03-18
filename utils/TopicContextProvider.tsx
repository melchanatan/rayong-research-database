import React, { createContext, useState } from "react";
import { Topic } from "./TopicContext.type";
const defaultTopics: Topic[] = [
  {
    id: "1",
    name: "Topic 1",
    position: {
      x: 100,
      y: 100,
    },
    tagColor: "#600000",
    researchCounts: 10,
  },
  {
    id: "2",
    name: "Topic 2",
    position: {
      x: 200,
      y: 200,
    },
    tagColor: "#006000",
    researchCounts: 20,
  },
  {
    id: "3",
    name: "Topic 3",
    position: {
      x: 300,
      y: 300,
    },
    tagColor: "#000060",
    researchCounts: 30,
  },
];

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
