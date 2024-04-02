"use client";
import { TabContext } from "@/utils/TabContextProvider";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import ResearchHeader from "./ResearchHeader";
import { AiOutlineDelete } from "react-icons/ai";
import { confirmAlert } from "react-confirm-alert";
import { ConfirmToast } from "react-confirm-toast";
import formatDateToThai from "../utils/FormatDateToThai";
import { MdEdit } from "react-icons/md";

const ResearchListView = ({
  research,
  tagName,
  id,
  admin = false,
  setPreview,
  tagColor,
}) => {
  const router = useRouter();
  const { setTabs } = useContext(TabContext);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const newTab: Tab = {
      name: tagName,
      href: "/topic/" + tagName,
    };

    setTabs((prev) => [...prev, newTab]);
    router.push("/research/" + id);
  };

  const deleteResearch = async () => {
    if (!admin) return;
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/delDoc/" + id
      );
      window.location.reload();
    } catch {
      alert("something went wrong");
      console.log("error");
    }

    console.log("delete");
  };

  return (
    <a
      dir="ltr"
      className="box-container flex flex-col gap-3 hover:shadow-lg cursor-pointer"
      onClick={admin ? () => {} : handleClick}
      onMouseEnter={() => setPreview(research.abstract)}
    >
      <ResearchHeader
        title={research.header}
        tagName={tagName}
        tagColor={tagColor}
        date={formatDateToThai(research.date)}
      />
      <p className="text-gray-600">{research.organization}</p>

      {admin ? (
        <div className="ml-auto flex flex-row gap-5">
          <div className="">
            <button
              className=" bg-blue-400 p-5 rounded-full hover:brightness-75 active:scale-75"
              onClick={() => router.push("/admin/publish/" + id)}
            >
              <MdEdit className="w-6 h-6 fill-white" />
            </button>
          </div>
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
            <div className="">
              <button className=" bg-red-400  p-5 rounded-full hover:brightness-75 active:scale-75">
                <AiOutlineDelete className="w-6 h-6 fill-white" />
              </button>
            </div>
          </ConfirmToast>
        </div>
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
