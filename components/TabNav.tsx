import { TabContext } from "@/utils/TabContextProvider";
import React, { useContext } from "react";
import { IoIosArrowForward } from "react-icons/io";

const TabNav = () => {
  const { tabs, setTabs } = useContext(TabContext);
  const maxTabs = tabs.length;

  const handleClick = (index) => {
    setTabs((prev) => prev.slice(0, index));
  };
  return (
    <div className="flex items-center mb-4">
      {tabs.map((tab, index) => (
        <a
          key={"tab" + index}
          href={`${tab.href}`}
          onClick={() => handleClick(index)}
          className={`tabnav-button z-[${maxTabs - index}] ${
            index == 0 ? "" : "ml-[-10px]"
          }`}
        >
          {tab.name}
        </a>
      ))}
    </div>
  );
};

export default TabNav;
