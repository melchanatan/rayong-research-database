import React from "react";
import { IoIosAdd } from "react-icons/io";

const TableInputForm = () => {
  return (
    <form className="flex [&>label]:flex-1 gap-4 items-end">
      <label>
        <span className=" font-semibold text-base text-gray-700">
          ชื่อผู้ค้นคว้า
        </span>
        <input
          //   value={post.name}
          //   onChange={(e) => setPost({ ...post, name: e.target.value })}
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
          //   value={post.name}
          //   onChange={(e) => setPost({ ...post, name: e.target.value })}
          placeholder="Enter your Item name"
          required
          className="form-input"
        />
      </label>
      <button className=" bg-green-400 rounded-lg">
        <IoIosAdd className="w-[2.7rem] h-[2.7rem]  fill-white" />
      </button>
    </form>
  );
};

export default TableInputForm;
