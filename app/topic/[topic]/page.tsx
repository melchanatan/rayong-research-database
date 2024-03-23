"use client";
import ParagraphSkeleton from "@/components/ParagraphSkeleton";
import ResearchHeader from "@/components/ResearchHeader";
import ResearchListView from "@/components/ResearchListView";
import TabNav from "@/components/TabNav";
import { TabContext } from "@/utils/TabContextProvider";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const TopicPage: React.FC = ({ params }: { params: { topic: string } }) => {
  const [researchDetails, setResearchDetails] = useState([]);
  const [researchIds, setResearchIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const fetchAllResearch = async (researchIds) => {
    const researches = [];
    for (const id of researchIds) {
      researches.push(fetchResearch(id));
    }

    const result = await Promise.all(researches);
    return result;
  };

  const fetchResearch = (researchId) => {
    return new Promise((resolve, reject) => {
      fetch(process.env.NEXT_PUBLIC_API_URL + "/getDocData/" + researchId)
        .then((res) => res.json())
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  };

  const initResearchDetail = async (): Promise<string[]> => {
    try {
      const ids = await fetchResearchId();
      setResearchIds(ids);
      const researches = await fetchAllResearch(ids);
      setResearchDetails(researches);
      return researchIds;
    } catch (err) {
      console.log(err);
      setIsError(true);
      return [];
    }
  };

  const fetchResearchId = async () => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/getDocID/" + params.topic
    );
    const data = await res.json();
    return data.docIDs || [];
  };

  useEffect(() => {
    initResearchDetail();
  }, []);

  return (
    <ul className="main-container py-[7vh]">
      <TabNav />

      <li className="flex gap-6  flex-col md:flex-row my-6 md:my-0">
        <ul
          dir="rtl"
          className=" w-full md:w-[55%] flex flex-col gap-3 overflow-y-auto md:h-[80vh] md:pl-3"
        >
          {isError ? (
            <div className="w-full h-[200px] md:h-[80vh] flex justify-center items-center">
              <h2 className="text-gray-400">เกิดข้อผิดพลาด</h2>
            </div>
          ) : isLoading ? (
            Array(4)
              .fill(0)
              .map((_, index) => <ResearchListView.loading key={index} />)
          ) : (
            researchDetails.map((research: any, index: number) => {
              return (
                <ResearchListView
                  key={"research" + index}
                  research={research}
                  tagName={params.topic}
                  id={researchIds[index]}
                />
              );
            })
          )}
        </ul>

        <div className="flex-1 glassmorphism py-8 rounded-lg px-6 order-[-1] md:order-1">
          <h3 className="mb-6">บทคัดย่อ</h3>
          {isLoading ? (
            <ParagraphSkeleton lines={10} />
          ) : (
            <p className="paragraph">this is a paragraph</p>
          )}
        </div>
      </li>
    </ul>
  );
};

export default TopicPage;
