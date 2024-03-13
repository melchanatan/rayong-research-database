import {
  PublishFormContext,
  publishFormDetails,
  publishFormReducer,
} from "@/utils/PublishFormContext";
import React, { useContext, useReducer, useState } from "react";
import { IoIosAdd } from "react-icons/io";

const TableInputForm = () => {
  const { state, dispatch } = useContext(PublishFormContext);
  const [currentInputCol1, setCurrentInputCol1] = useState("");
  const [currentInputCol2, setCurrentInputCol2] = useState("");

  return (
    <div className="flex [&>label]:flex-1 gap-4 items-end">
      <label>
        <span className=" font-semibold text-base text-gray-700">
          ชื่อผู้ค้นคว้า
        </span>
        <input
          value={currentInputCol1}
          onChange={(e) => setCurrentInputCol1(e.target.value)}
          placeholder="Enter your Item name"
          required
          className="form-input"
        />
      </label>
      <label>
        <span className="font-semibold text-base text-gray-700">
          องกรณ์ของผู้ค้นคว้า
        </span>
        <input
          value={currentInputCol2}
          onChange={(e) => setCurrentInputCol2(e.target.value)}
          placeholder="Enter your Item name"
          required
          className="form-input"
        />
      </label>
      <button
        className=" bg-green-400 rounded-lg"
        onClick={() => alert(state.header)}
      >
        <IoIosAdd className="w-[2.7rem] h-[2.7rem] fill-white" onClick={} />
      </button>
    </div>
  );
};

export default TableInputForm;
