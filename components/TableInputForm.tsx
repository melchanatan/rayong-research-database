import {
  PublishFormContext,
  publishFormDetails,
  publishFormReducer,
} from "@/utils/PublishFormContext";
import { Researcher } from "@/utils/PublishFormContext.type";
import React, { useContext, useReducer, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { IoTrashOutline } from "react-icons/io5";

const TableInputForm = () => {
  const { state, dispatch } = useContext(PublishFormContext);
  const [currentInputCol1, setCurrentInputCol1] = useState("");
  const [currentInputCol2, setCurrentInputCol2] = useState("");

  const addResearcher = () => {
    if (!currentInputCol1 || !currentInputCol2) {
      return;
    }
    dispatch({
      type: "ADD_RESEARCHER",
      payload: {
        name: currentInputCol1,
        organization: currentInputCol2,
      },
    });
    setCurrentInputCol1("");
    setCurrentInputCol2("");
  };
  return (
    <div className="grid grid-cols-[1fr_1fr_2.7rem] grild [&>label]:flex-1 items-end gap-x-2">
      <span className=" font-semibold text-base text-gray-700">
        ชื่อผู้ค้นคว้า
      </span>
      <span className="font-semibold text-base text-gray-700">
        องกรณ์ของผู้ค้นคว้า
      </span>
      <span></span>
      {state.researchers?.map((researcher: Researcher, index: number) => (
        <>
          <input
            value={researcher.name}
            onChange={(e) => {
              e.preventDefault();
              dispatch({
                type: "EDIT_RESEARCHER_NAME",
                payload: { index: index, value: e.target.value },
              });
            }}
            placeholder="พิมพ์ตรงนี้..."
            required
            className="form-input"
          />
          <input
            value={researcher.organization}
            onChange={(e) => {
              e.preventDefault();
              dispatch({
                type: "EDIT_RESEARCHER_ORGANIZATION",
                payload: { index: index, value: e.target.value },
              });
            }}
            placeholder="พิมพ์ตรงนี้..."
            required
            className="form-input"
          />
          <button
            className=" bg-red-400 square-icon-button"
            onClick={(e) => {
              e.preventDefault();
              dispatch({
                type: "REMOVE_RESEARCHER",
                payload: researcher,
              });
            }}
          >
            <IoTrashOutline className="w-[1.6rem] h-[1.6rem] fill-white stroke-white " />
          </button>
        </>
      ))}
      <input
        value={currentInputCol1}
        onChange={(e) => setCurrentInputCol1(e.target.value)}
        placeholder="พิมพ์ตรงนี้..."
        required
        className="form-input"
      />
      <input
        value={currentInputCol2}
        onChange={(e) => setCurrentInputCol2(e.target.value)}
        placeholder="พิมพ์ตรงนี้..."
        required
        className="form-input"
      />

      <button
        className=" bg-green-400 square-icon-button"
        onClick={(e) => {
          e.preventDefault();
          addResearcher();
        }}
      >
        <IoIosAdd className="w-[2.7rem] h-[2.7rem] fill-white" />
      </button>
    </div>
  );
};

export default TableInputForm;
