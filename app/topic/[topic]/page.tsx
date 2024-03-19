"use client";
import ResearchHeader from "@/components/ResearchHeader";
import TabNav from "@/components/TabNav";
import { TabContext } from "@/utils/TabContextProvider";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";

const TopicPage: React.FC = ({ params }: { params: { topic: string } }) => {
  const [researchDetails, setResearchDetails] = useState([]);
  const [researchIds, setResearchIds] = useState([]);
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

  const initResearchDetail = async () => {
    const ids = await fetchResearchId();
    setResearchIds(ids);
    const researches = await fetchAllResearch(ids);
    setResearchDetails(researches);
    return researchIds;
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
    <ul className="main-container">
      <TabNav />

      <li className="flex gap-6">
        <ul
          dir="rtl"
          className="w-[55%] flex flex-col gap-3 overflow-y-auto h-[80vh] pl-3"
        >
          {researchDetails.map((research: any, index: number) => {
            console.log(researchIds[index]);
            return (
              <ResearchListView
                key={"research" + index}
                research={research}
                tagName={params.topic}
                id={researchIds[index]}
              />
            );
          })}
        </ul>

        <div className="flex-1 glassmorphism py-8 rounded-lg px-6 ">
          <h3>บทคัดย่อ</h3>
          <p className="paragraph">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Consequatur quo iusto, rerum sit eligendi minima repudiandae
            molestias rem natus illo, quisquam recusandae libero optio saepe.
            Qui saepe aperiam possimus officia. Iure inventore velit, facilis et
            sed qui similique tenetur? Quam alias veritatis magnam, ducimus
            earum, neque nobis unde mollitia nesciunt maxime facere cupiditate
            ratione. Voluptates et provident eum ea itaque? Ab doloremque atque
            optio exercitationem tempora, adipisci aperiam nulla maiores quia
            ex. Earum tenetur consequatur maxime exercitationem labore
            temporibus eius eum, modi, libero dolore inventore molestiae quidem
            adipisci. Eos, labore.
          </p>
        </div>
      </li>
    </ul>
  );
};

export default TopicPage;

const ResearchListView = ({ research, tagName, id }) => {
  const router = useRouter();
  const { setTabs } = useContext(TabContext);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const newTab: Tab = {
      name: "topic 1",
      href: "topic",
    };

    setTabs((prev) => [...prev, newTab]);
    router.push("/research/" + id);
  };
  return (
    <a
      dir="ltr"
      className="box-container flex flex-col gap-3 hover:shadow-lg cursor-pointer"
      href="/research/topic"
      onClick={handleClick}
    >
      <ResearchHeader title={research.DocName} tagName={tagName} />
      <p className="text-gray-600">กรมอุทยานแห่งชาติ สัตว์ป่า และพันธุ์พืช</p>
    </a>
  );
};
