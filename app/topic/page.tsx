import ResearchHeader from "@/components/ResearchHeader";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";

const TopicPage: React.FC = () => {
  return (
    <ul className="main-container">
      <li className="flex items-center mb-3">
        <IoIosArrowBack className="w-[30px] h-[30px]" />
        <h3 className="font-semibold">Topic Page</h3>
      </li>
      <li className="flex gap-6">
        <ul
          dir="rtl"
          className="w-[55%] flex flex-col gap-3 overflow-y-auto h-[80vh] pl-3"
        >
          <ResearchListView />
          <ResearchListView />
          <ResearchListView />
          <ResearchListView />
          <ResearchListView />
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

const ResearchListView = () => {
  return (
    <li dir="ltr" className="box-container flex flex-col gap-3">
      <ResearchHeader />
      <p className="text-gray-600">กรมอุทยานแห่งชาติ สัตว์ป่า และพันธุ์พืช</p>
    </li>
  );
};
