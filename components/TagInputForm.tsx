import {
  publishFormDetails,
  publishFormReducer,
} from "@/utils/PublishFormContext";
import { TopicContext } from "@/utils/TopicContextProvider";
import React, { useContext, useEffect, useReducer, useState } from "react";

const TagInputForm = ({ state, dispatch }) => {
  const [tag, setTag] = useState("");
  const { topics } = useContext(TopicContext);
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [flag, setFlag] = useState(false);

  const handleOnChange = (e) => {
    setTag(e.target.value);
    dispatch({ type: "SET_TAG", payload: e.target.value });

    const current_topics = topics.current;
    const searchTerm = e.target.value.toLowerCase();
    const filteredTopics = current_topics.filter((topic) => {
      return topic.name.toLowerCase().includes(searchTerm);
    });
    setFilteredTopics(filteredTopics);
  };

  const handleSelect = (e) => {
    setTag(e.target.innerText);
    dispatch({ type: "SET_TAG", payload: e.target.innerText });
    console.log(e.target.innerText);
    setFilteredTopics([]);
  };

  const handleClick = () => {
    if (flag === false) {
      setFilteredTopics(topics.current);
      setFlag(true);
    }
  };

  return (
    <label>
      <span className=" font-semibold text-base text-gray-600">
        หมวดหมู่งานวิจัย (จำเป็น){" "}
        <span className="font-normal">(#ป่าไม้​ #การคมนาคม)</span>
      </span>

      {topics.current.length > 0 ? (
        <input
          value={tag}
          onClick={handleClick}
          onChange={handleOnChange}
          placeholder="#tag"
          required
          className="form-input"
        />
      ) : (
        <div className="loading h-[48px] w-full"></div>
      )}

      <div
        className="flex flex-col  bg-white rounded-lg overflow-hidden shadow-md"
        style={{
          marginTop: filteredTopics.length > 0 ? "10px" : "0px",
        }}
      >
        {filteredTopics.map((topic, index) => (
          <p
            onClick={handleSelect}
            key={index}
            className="cursor-pointer hover:bg-gray-100 p-2 "
          >
            {topic!.name}
          </p>
        ))}
      </div>
    </label>
  );
};

export default TagInputForm;
