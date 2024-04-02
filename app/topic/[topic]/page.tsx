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
  const [researches, setResearches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [preview, setPreview] = useState("");
  const [tagColor, setTagColor] = useState("#ffffff");

  const fetchResearch = async () => {
    const researchSnippets = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/getDocsSnippet/" + params.topic
    )
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
    return researchSnippets;
  };

  const fetchTagColor = async () => {
    const color = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/getTopicColor/" + params.topic
    )
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
    return color.tagColor;
  };

  const initResearchDetail = async (): Promise<string[]> => {
    try {
      const researchSnippets = await fetchResearch();
      const color = await fetchTagColor();
      setTagColor(color);
      setResearches(researchSnippets);
      setIsLoading(false);
      return researches;
    } catch (err) {
      console.log(err);
      setIsError(true);
      return [];
    }
  };

  useEffect(() => {
    initResearchDetail();
  }, []);

  return (
    <ul className="main-container py-[7vh] min-h-screen">
      <TabNav />

      <li className="flex gap-6  flex-col md:flex-row my-6 md:my-0">
        <ul
          dir="rtl"
          className=" w-full md:w-[55%] flex flex-col gap-3 overflow-y-auto md:h-[80vh] "
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
            researches.map((research: any, index: number) => {
              return (
                <ResearchListView
                  key={"research" + index}
                  research={research}
                  tagName={decodeURIComponent(params.topic)}
                  id={researches[index].id}
                  setPreview={setPreview}
                  tagColor={tagColor}
                />
              );
            })
          )}
        </ul>

        <div className="flex-1 glassmorphism py-8 rounded-lg px-6 order-[-1] md:order-1 hidden sm:block">
          <h3 className="mb-6">บทคัดย่อ</h3>
          {isLoading ? (
            <ParagraphSkeleton lines={10} />
          ) : preview == "" ? (
            <p className="paragraph text-gray-400 select-none">
              เริ่มจากการนำเมาส์ไปวางบนหัวข้อที่สนใจ
            </p>
          ) : (
            <p className="paragraph">{preview}</p>
          )}
        </div>
      </li>
    </ul>
  );
};

export default TopicPage;
