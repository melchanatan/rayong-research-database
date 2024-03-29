"use client";
import ResearchListView from "@/components/ResearchListView";
import { TopicContext } from "@/utils/TopicContextProvider";
import React, { Suspense, useContext, useState } from "react";

const DashboardPage = () => {
  const { topics, isLoading, isError } = useContext(TopicContext);
  const [researches, setResearches] = useState([]);
  const [researchesLoading, setResearchesLoading] = useState(false);

  const onSelectTopic = (topicName) => {
    const fetchResearches = async () => {
      try {
        setResearchesLoading(true);
        const response = await fetch(
          process.env.NEXT_PUBLIC_API_URL + "/getDocsSnippet/" + topicName
        );
        const data = await response.json();

        setResearches(data);
        setResearchesLoading(false);
      } catch {
        alert("Failed to fetch researches. Please try again later.");
        setResearchesLoading(false);
      }
    };

    fetchResearches();
  };

  return (
    <div className="main-container py-[7vh] h-screen flex flex-col gap-2">
      <h1>Dashboard</h1>
      <p>This is the dashboard page.</p>

      {isError ? (
        <p>Failed to fetch topics. Please try again later.</p>
      ) : isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <h1 className="animate-pulse infinite">Loading...</h1>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-[400px_1fr] gap-5 min-h-50vh">
            <div className="flex flex-col gap-2 glassmorphism rounded-lg p-4">
              <h3>All Topics</h3>

              {topics.current.map((topic) => (
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectTopic(topic.name);
                  }}
                  key={topic.name + "dashboard"}
                  className="topic-tag bg-red-500 !py-0 !px-3 active:scale-75 hover:brightness-75 transition-all duration-200 ease-in-out"
                  style={{
                    backgroundColor: topic.tagColor,
                  }}
                >
                  {topic.name} ({topic.researchCounts})
                </a>
              ))}
            </div>
            <div className="glassmorphism rounded-lg p-4">
              <h3>Research in Topic</h3>

              {researchesLoading ? (
                <p className=" animate-pulse">Loading...</p>
              ) : researches.length <= 0 ? (
                <p className=" text-gray-500">please select a topic</p>
              ) : (
                [
                  researches.map((research, index) => (
                    <ResearchListView
                      key={research.id + "-dashboard"}
                      research={research}
                      tagName={""}
                      id={research.id}
                      admin={true}
                      setPreview={() => {}}
                    />
                  )),
                ]
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardPage;
