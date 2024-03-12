import ResearchHeader from "@/components/ResearchHeader";
import React from "react";
import { AiOutlineFilePdf } from "react-icons/ai";
import { AiOutlineFileExcel } from "react-icons/ai";
import { AiOutlineFileWord } from "react-icons/ai";
import { AiOutlineFile } from "react-icons/ai";

const ResearchPage = () => {
  return (
    <div>
      <li className="flex gap-6 main-container justify-center">
        <div className="flex flex-col gap-3  max-w-[65%]">
          <ul className="flex flex-col gap-3 overflow-y-auto pl-3 box-container h-[60vh]">
            <ResearchHeader></ResearchHeader>
            <p className="paragraph">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Consequatur quo iusto, rerum sit eligendi minima repudiandae
              molestias rem natus illo, quisquam recusandae libero optio saepe.
              Qui saepe aperiam possimus officia. Iure inventore velit, facilis
              et sed qui similique tenetur? Quam alias veritatis magnam, ducimus
              earum, neque nobis unde mollitia nesciunt maxime facere cupiditate
              ratione. Voluptates et provident eum ea itaque? Ab doloremque
              atque optio exercitationem tempora, adipisci aperiam nulla maiores
              quia ex. Earum tenetur consequatur maxime exercitationem labore
              temporibus eius eum, modi, libero dolore inventore molestiae
              quidem adipisci. Eos, labore.
            </p>
          </ul>
          <ul className="box-container">
            <h3 className="mb-2">ทรัพยากร</h3>
            <ul className="gap-2 flex flex-col">
              <FileDownload />
              <FileDownload />
            </ul>
          </ul>
        </div>
        <ul className="box-container flex flex-col gap-7 [&>li>h3]:mb-2">
          <li>
            <h3>องกรณ์</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
              voluptates aut numquam rem esse, odit molestias
            </p>
          </li>
          <li className="flex flex-col">
            <h3>ชื่อผู้ค้นคว้า</h3>
            <ResearcherDetail />
          </li>
          <li className="flex flex-col">
            <h3>ติดต่อ</h3>
            <p>sompon.sandee@gmail.com</p>
          </li>
        </ul>
      </li>
    </div>
  );
};

export default ResearchPage;

const ResearcherDetail = () => {
  return (
    <div>
      <li>สมพร เเสนดี</li>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut voluptates
        aut numquam rem esse, odit molestias
      </p>
    </div>
  );
};

const FileDownload = () => {
  return (
    <a>
      <li className="border-black border-[1px] px-6 py-2 rounded-lg flex flex-row items-center">
        <AiOutlineFilePdf className="w-[2.4rem] h-[2.4rem] fill-gray-700" />
        <p className="text-center w-full">file_name.pdf</p>
      </li>
    </a>
  );
};
