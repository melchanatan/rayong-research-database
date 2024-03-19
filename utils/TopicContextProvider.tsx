import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
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

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
const maxResearchCounts = 20;

const setTopicPosition = (topics) => {
  const positions: Position[] = [];

  topics.forEach((topic) => {
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
    positions.push(position);

    positions.forEach((p) => {
      if (
        Math.abs(p.x - position.x) < 200 &&
        Math.abs(p.y - position.y) < 200
      ) {
        p = {
          x:
            Math.random() * windowWidth * 0.5 -
            (topic.researchCounts / 11) * windowWidth * 0.5,
          y:
            windowHeight * 0.5 -
            (topic.researchCounts / 11) * windowHeight * 0.5,
        };
      }
    });
  });

  topics.forEach((topic, index) => {
    topics[index].position = positions[index];
  });
};

const TopicContext = createContext(defaultTopics as Topic[]);

const TopicContextProvider = ({ children }: { children: JSX.Element }) => {
  const topics = useRef([]);
  const [filteredTopics, setFilteredTopics] = useState([]);

  const fetchTopics = async () => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/getTopic");
      const data = await res.json();
      setTopicPosition(data);
      topics.current = data;
      setFilteredTopics(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  return (
    <TopicContext.Provider
      value={{ topics, filteredTopics, setFilteredTopics }}
    >
      {children}
    </TopicContext.Provider>
  );
};

export { TopicContextProvider, TopicContext };
