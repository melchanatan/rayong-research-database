"use client";
import { TabContext } from "@/utils/TabContextProvider";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import ResearchHeader from "./ResearchHeader";
import { AiOutlineDelete } from "react-icons/ai";
import { confirmAlert } from "react-confirm-alert";
import { ConfirmToast } from "react-confirm-toast";

const ResearchListView = ({ research, tagName, id, admin = false }) => {
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

  const deleteResearch = () => {
    console.log("delete");
  };

  return (
    <a
      dir="ltr"
      className="box-container flex flex-col gap-3 hover:shadow-lg cursor-pointer"
      onClick={admin ? () => {} : handleClick}
    >
      <ResearchHeader title={research.DocName} tagName={tagName} />
      <p className="text-gray-600">กรมอุทยานแห่งชาติ สัตว์ป่า และพันธุ์พืช</p>

      {admin ? (
        <ConfirmToast
          asModal={false}
          childrenClassName="margin-top-10"
          customCancel="No"
          customConfirm="Confirm"
          customFunction={deleteResearch}
          message="Do you want to confirm?"
          position="top-right" //will be ignored cause asModal=true
          showCloseIcon={false}
          theme="light"
        >
          <div className="absolute right-[2rem] top-[50%] translate-y-[-50%]">
            <button className=" bg-red-400  p-5 rounded-full">
              <AiOutlineDelete className="w-6 h-6 fill-white" />
            </button>
          </div>
        </ConfirmToast>
      ) : null}
    </a>
  );
};

const LoadingSkeleton = () => {
  return (
    <div dir="ltr" className="box-container flex flex-col gap-6">
      <div className="flex flex-col gap-1 ">
        <h1 className="loading w-full h-[36px]"></h1>
        <p className="loading w-[30%] h-[18px]"></p>
      </div>
      <p className="loading w-[80%] h-[18px]"></p>
    </div>
  );
};

ResearchListView.loading = LoadingSkeleton;

export default ResearchListView;
