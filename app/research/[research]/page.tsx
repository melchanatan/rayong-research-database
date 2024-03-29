"use client";
import DynamicFileIcon from "@/components/DynamicFileIcon";
import ParagraphSkeleton from "@/components/ParagraphSkeleton";
import ResearchHeader from "@/components/ResearchHeader";
import TabNav from "@/components/TabNav";
import formatDateToThai from "@/utils/formatDateToThai";
import React, { useState } from "react";
import { FaLessThanEqual } from "react-icons/fa6";

const ResearchPage = ({ params }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState([{}]);

  const initResearchDetails = async () => {
    // try {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/getDocData/${params.research}`
    );
    const json = await data.json();
    setContent(json);

    setIsLoading(false);
  };

  useState(() => {
    initResearchDetails();
  });

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
                title={content.header}
                tagName={""}
                date={formatDateToThai(content.date)}
              ></ResearchHeader>
            )}

            {isLoading ? (
              <ParagraphSkeleton className="w-full " />
            ) : (
              <p className="paragraph">{content.abstract}</p>
            )}
          </div>
          <div className="box-container ">
            <h3 className="mb-2">ทรัพยากร</h3>
            <div className="gap-2 flex flex-col">
              {isLoading ? (
                <FileSkeleton />
              ) : content.files ? (
                [
                  content.files?.map((file, index) => (
                    <FileDownload
                      fileName={file}
                      index={index}
                      docId={params.research}
                      key={file + "files"}
                    />
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
            ) : content.organization ? (
              <p>{content.organization}</p>
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
                {content.researchers ? (
                  [
                    content.researchers?.map((researcher) => (
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
            ) : content.contactEmail ? (
              <p>{content.contactEmail}</p>
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

const FileDownload = ({ fileName, index, docId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleOnClick = async () => {
    // const res = fetch(
    //   process.env.NEXT_PUBLIC_API_URL + `/downloadDoc/${docId}/${index}`
    // );
    setIsLoading(true);

    await fetch(
      process.env.NEXT_PUBLIC_API_URL + `/downloadDoc/${docId}/${index}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // You can add any additional headers if required
        },
      }
    )
      .then((response) => {
        // Check if response is successful
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Get the content disposition header to determine the filename
        const contentDisposition = response.headers.get("Content-Disposition");
        let filename = fileName;
        if (contentDisposition) {
          const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          const matches = filenameRegex.exec(contentDisposition);
          if (matches != null && matches[1]) {
            filename = matches[1].replace(/['"]/g, "");
          }
        }
        // Start downloading the file
        response.blob().then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
        });
      })
      .catch((error) => {
        console.error("Error downloading file:", error);
        // Handle any errors that occurred during the fetch
      });

    setIsLoading(false);
  };

  return (
    <button onClick={handleOnClick} disabled={isLoading}>
      <div
        className="border-black border-[1px] px-6 py-2 rounded-lg flex flex-row  items-center hover:bg-black transition-all duration-200 ease-in-out hover:text-white group cursor-pointer bg-repeat animation-moveBackground"
        style={{
          backgroundImage: !isLoading
            ? "none"
            : "linear-gradient(90deg, #2BAAD9 0%, #83BB3F 100%)",
        }}
      >
        {isLoading ? (
          <p className="text-lg text-white">Downloading...</p>
        ) : (
          <>
            <DynamicFileIcon fileExtension={fileName.split(".")[1] || "none"} />
            <p className="w-full text-center">{fileName}</p>
          </>
        )}
      </div>
    </button>
  );
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
