"use client";
import ParagraphSkeleton from "@/components/ParagraphSkeleton";
import ResearchHeader from "@/components/ResearchHeader";
import TabNav from "@/components/TabNav";
import React, { useState } from "react";
import { AiOutlineFilePdf } from "react-icons/ai";
import { AiOutlineFileExcel } from "react-icons/ai";
import { AiOutlineFileWord } from "react-icons/ai";
import { AiOutlineFile } from "react-icons/ai";

const ResearchPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div>
      <TabNav />
      <div className="flex gap-6 main-container justify-center md:flex-row flex-col my-5 md:my-0">
        <div className="flex flex-col gap-3 w-full">
          <div className="flex flex-col gap-3 overflow-y-auto pl-3 box-container md:h-[60vh] h-auto">
            {isLoading ? (
              <div className="mb-4">
                <div className="loading w-full h-[36px] mb-2"></div>
                <div className="loading w-[30%] h-[18px]"></div>
              </div>
            ) : (
              <ResearchHeader
                title={"hello"}
                tagName={"hello"}
              ></ResearchHeader>
            )}

            {isLoading ? (
              <ParagraphSkeleton className="w-full " />
            ) : (
              <p className="paragraph">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Consequatur quo iusto, rerum sit eligendi minima repudiandae
                molestias rem natus illo, quisquam recusandae libero optio
                saepe. Qui saepe aperiam possimus officia. Iure inventore velit,
                facilis et sed qui similique tenetur? Quam alias veritatis
                magnam, ducimus earum, neque nobis unde mollitia nesciunt maxime
                facere cupiditate ratione. Voluptates et provident eum ea
                itaque? Ab doloremque atque optio exercitationem tempora,
                adipisci aperiam nulla maiores quia ex. Earum tenetur
                consequatur maxime exercitationem labore temporibus eius eum,
                modi, libero dolore inventore molestiae quidem adipisci. Eos,
                labore.
              </p>
            )}
          </div>
          <div className="box-container ">
            <h3 className="mb-2">ทรัพยากร</h3>
            <div className="gap-2 flex flex-col">
              <FileDownload />
              <FileDownload />
              <FileSkeleton />
            </div>
          </div>
        </div>
        <div className="box-container flex flex-col gap-7 [&>li>h3]:mb-2 md:w-[35%] w-full">
          <div>
            <h3>องกรณ์</h3>
            {isLoading ? (
              <ParagraphSkeleton className="w-full mt-1" lines={2} />
            ) : (
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
                voluptates aut numquam rem esse, odit molestias
              </p>
            )}
          </div>

          <ResearcherSkeleton />
          {isLoading ? (
            <ResearcherSkeleton />
          ) : (
            <div className="flex flex-col">
              <h3>ชื่อผู้ค้นคว้า</h3>
              <ResearcherDetail />
            </div>
          )}
          <div className="flex flex-col">
            <h3>ติดต่อ</h3>
            {isLoading ? (
              <div className="loading h-[18px] w-[80%] mt-1"></div>
            ) : (
              <p>sompon.sandee@gmail.com</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchPage;

const ResearcherDetail = () => {
  return (
    <div>
      <li>สมพร เเสนดี</li>
      <p className="text-gray-600">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut voluptates
        aut numquam rem esse, odit molestias
      </p>
    </div>
  );
};

const FileDownload = () => {
  return (
    <a>
      <div className="border-black border-[1px] px-6 py-2 rounded-lg flex flex-row items-center">
        <AiOutlineFilePdf className="w-[2.4rem] h-[2.4rem] fill-gray-700" />
        <p className="text-center w-full">file_name.pdf</p>
      </div>
    </a>
  );
};

const ResearcherSkeleton = () => {
  return (
    <div>
      <div className="loading w-[45%] h-[18px] mb-2"></div>
      <ParagraphSkeleton className="w-full" lines={2} />
    </div>
  );
};

const FileSkeleton = () => {
  return (
    <div className="border-black border-[1px] px-6 py-2 rounded-lg flex flex-row items-center">
      <div className="loading w-[2.4rem] h-[2.4rem]"></div>
      <div className="flex w-full justify-center items-center">
        <div className="loading w-[30%] h-[18px]"></div>
      </div>
    </div>
  );
};
