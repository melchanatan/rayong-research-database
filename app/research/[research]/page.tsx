"use client";
import ParagraphSkeleton from "@/components/ParagraphSkeleton";
import ResearchHeader from "@/components/ResearchHeader";
import TabNav from "@/components/TabNav";
import React, { useState } from "react";
import { AiOutlineFilePdf } from "react-icons/ai";
import { AiOutlineFileExcel } from "react-icons/ai";
import { AiOutlineFileWord } from "react-icons/ai";
import { AiOutlineFile } from "react-icons/ai";

const ResearchPage = ({ params }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState([{}]);

  const initResearchDetails = async () => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/getDocData/" + params.research
      );

      const data = await res.json();
      setContent(data || [{}]);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useState(() => {
    initResearchDetails();
  }, []);

  return (
    <div className="py-[7vh]">
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
                title={content.DocName}
                tagName={""}
              ></ResearchHeader>
            )}

            {isLoading ? (
              <ParagraphSkeleton className="w-full " />
            ) : (
              <p className="paragraph">{content.Content}</p>
            )}
          </div>
          <div className="box-container ">
            <h3 className="mb-2">ทรัพยากร</h3>
            <div className="gap-2 flex flex-col">
              {isLoading ? (
                <FileSkeleton />
              ) : content.Files ? (
                [
                  content.Files?.map((file) => (
                    <FileDownload content={file} key={file.id} />
                  )),
                ]
              ) : (
                <p className="text-gray-400">ไม่ปรากฏทรัพยากร</p>
              )}
            </div>
          </div>
        </div>
        <div className="box-container flex flex-col gap-7 [&>li>h3]:mb-2 md:w-[35%] w-full">
          <div>
            <h3>องกรณ์</h3>

            {isLoading ? (
              <ParagraphSkeleton className="w-full mt-1" lines={2} />
            ) : content.Organization ? (
              <p>{content.Organization}</p>
            ) : (
              <p className="text-gray-400">ไม่ปรากฏข้อมูลองค์กร</p>
            )}
          </div>

          <div className="flex-flex-col gap-2">
            <h3>ชื่อผู้ค้นคว้า</h3>
            {isLoading ? (
              <ResearcherSkeleton />
            ) : (
              <div className="flex flex-col">
                {content.Researchers ? (
                  [
                    content.Researchers?.map((researcher) => (
                      <ResearcherDetail
                        name={researcher.name}
                        orgainzation={researcher.organization}
                        key={researcher.id}
                      />
                    )),
                  ]
                ) : (
                  <p className="text-gray-400">ไม่ปรากฏข้อมูลผู้ค้นคว้า</p>
                )}
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <h3>ติดต่อ</h3>
            {isLoading ? (
              <div className="loading h-[18px] w-[80%] mt-1"></div>
            ) : content.Contact ? (
              <p>{content.Contact}</p>
            ) : (
              <p className="text-gray-400">ไม่ปรากฏข้อมูลติดต่อ</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchPage;

const ResearcherDetail = ({ name, orgainzation }) => {
  return (
    <div>
      <li>{name}</li>
      <p className="text-gray-600">{orgainzation}</p>
    </div>
  );
};

const FileDownload = ({ content }) => {
  return (
    <a>
      <div className="border-black border-[1px] px-6 py-2 rounded-lg flex flex-row items-center hover:bg-black transition-all duration-200 ease-in-out hover:text-white group">
        <DynamicFileIcon
          fileExtension={content.Link?.split(".")[1] || "none"}
        />
        {content.Link}
      </div>
    </a>
  );
};

const DynamicFileIcon = ({ fileExtension }) => {
  if (fileExtension === "pdf")
    return <AiOutlineFilePdf className="file-icon" />;
  else if (fileExtension === "docx")
    return <AiOutlineFileWord className="file-icon" />;
  else if (fileExtension === "xlsx")
    return <AiOutlineFileExcel className="file-icon" />;
  else if (fileExtension === "csv")
    return <AiOutlineFile className="file-icon" />;
  else if (fileExtension === "none")
    return <AiOutlineFile className="file-icon" />;
};

const ResearcherSkeleton = () => {
  return (
    <div>
      <div className="loading w-[45%] h-[18px] mb-2 mt-1"></div>
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
