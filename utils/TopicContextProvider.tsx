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

const maxResearchCounts = 17;

const setTopicPosition = (topics) => {
  const positions: Position[] = [];
  const windowWidth = window!.innerWidth;
  const windowHeight = window!.innerHeight;
  topics.forEach((topic) => {
    var newPostition: Position = {
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

    // check overlap radius 300
    let isOverlap = false;
    positions.forEach((position) => {
      if (
        Math.abs(position.x - newPostition.x) < 200 &&
        Math.abs(position.y - newPostition.y) < 200
      ) {
        isOverlap = true;
      }
    });

    if (isOverlap) {
      newPostition = {
        x:
          windowWidth * 0.5 +
          (((maxResearchCounts - 5 - topic.researchCounts) /
            maxResearchCounts) *
            (windowWidth * 0.5) +
            Math.random() * 100 * (Math.random() < 0.5 ? -1 : 1)) *
            (Math.random() < 0.5 ? -1 : 1),
        y:
          windowHeight * 0.5 +
          (((maxResearchCounts - 5 - topic.researchCounts) /
            maxResearchCounts) *
            (windowHeight * 0.5) +
            Math.random() * 100 * (Math.random() < 0.5 ? -1 : 1)) *
            (Math.random() < 0.5 ? -1 : 1),
      };
    }

    positions.push(newPostition);
  });

  topics.forEach((topic, index) => {
    topics[index].position = positions[index];
  });
};

const TopicContext = createContext(defaultTopics as Topic[]);

const TopicContextProvider = ({ children }: { children: JSX.Element }) => {
  const topics = useRef([]);
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchTopics = async () => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/getTopic");
      const data = await res.json();
      setTopicPosition(data);
      topics.current = data;
      setFilteredTopics(data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setIsError(true);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  return (
    <TopicContext.Provider
      value={{ topics, filteredTopics, setFilteredTopics, isLoading, isError }}
    >
      {children}
    </TopicContext.Provider>
  );
};

export { TopicContextProvider, TopicContext };
