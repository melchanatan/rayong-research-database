import { TopicContext } from "@/utils/TopicContextProvider";
import React, { useContext, useState } from "react";
import { IoSearch } from "react-icons/io5";

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { topics, filteredTopics, setFilteredTopics } =
    useContext(TopicContext);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    console.log(topics);
    const current_topics = topics.current;
    const searchTerm = e.target.value.toLowerCase();
    const filteredTopics = current_topics.filter((topic) => {
      return topic.name.toLowerCase().includes(searchTerm);
    });
    setFilteredTopics(filteredTopics);
  };

  return (
    <span className=" px-3 py-2 rounded-full flex items-center gap-2 glassmorphism !border-gray-500 ">
      <IoSearch className="fill-gray-500" />
      <input
        type="text"
        onChange={handleSearch}
        value={searchTerm}
        placeholder={"ค้นหาหัวข้อที่คุณสนใจ..."}
        className="placeholder:text-gray-500 placeholder:select-none focus:outline-none bg-transparent paragraph text-center w-full pr-2"
      />
    </span>
  );
};

export default Searchbar;
