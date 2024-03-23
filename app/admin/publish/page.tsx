"use client";
import Dropzone from "@/components/Dropzone";
import TableInputForm from "@/components/TableInputForm";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useReducer, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import {
  PublishFormContext,
  publishFormDetails,
  publishFormReducer,
} from "@/utils/PublishFormContext";
import InputForm from "@/components/InputForm";
import { useSession } from "next-auth/react";

const PublishPage = () => {
  const router = useRouter();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    name: "",
    description: "",
    tag: "",
    image: "",
    stockMax: 0,
    stockCurrent: 0,
  });

  const createItem = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // try {
    //   const response = await fetch("/api/item/new", {
    //     method: "POST",
    //     body: JSON.stringify({
    //       name: post.name,
    //       // userId: session?.user.id,
    //       description: post.description,
    //       tag: post.tag,
    //       // image: post.imageUrl,
    //       stockMax: post.stockMax,
    //       stockCurrent: post.stockMax,
    //     }),
    //   });
    //   if (response.ok) {
    //     router.push("/admin");
    //   }
    // } catch (error) {
    //   console.log(error);
    // } finally {
    //   setSubmitting(false);
    // }
  };

  const [state, dispatch] = useReducer(publishFormReducer, publishFormDetails);
  const { data: session } = useSession();
  if (!session) return <h1>Something went wrong</h1>;
  if (!session.usernameExists)
    return <div className="gap-2 flex items-center">User unauthorized</div>;

  return (
    <PublishFormContext.Provider value={{ state, dispatch }}>
      <section className="max-w-[1200px] w-full px-10 mt-10">
        <h1 className="head_text text-left">
          <span>เพยแพร่งานวิจัย</span>
        </h1>
        <form className="mt-3 w-full max-w-screen-2xl flex flex-col gap-7 box-container">
          <InputForm
            label="หัวข้องานวิจัย"
            onChange={(e) =>
              dispatch({ type: "SET_HEADER", payload: e.target.value })
            }
            value={state.header}
          />
          <InputForm
            label="บทคัดย่องานวิจัย"
            onChange={(e) =>
              dispatch({ type: "SET_ABSTRACT", payload: e.target.value })
            }
            isTextArea={true}
            value={state.abstract}
          />

          <label>
            <span className=" font-semibold text-base text-gray-600">
              หมวดหมู่งานวิจัย{" "}
              <span className="font-normal">(#ป่าไม้​ #การคมนาคม)</span>
            </span>
            <input
              value={post.tag}
              onChange={(e) => setPost({ ...post, tag: e.target.value })}
              placeholder="#tag"
              required
              className="form-input"
            />
          </label>
          <InputForm
            label="องกรณ์"
            onChange={(e) =>
              dispatch({ type: "SET_ORGANIZATION", payload: e.target.value })
            }
            value={state.organization}
          />
          <TableInputForm></TableInputForm>
          <InputForm
            label="อีเมลในการติดต่อ"
            onChange={(e) =>
              dispatch({ type: "SET_CONTACT_EMAIL", payload: e.target.value })
            }
            value={state.contactEmail}
          />

          <label>
            <span className=" font-semibold text-base text-gray-700">
              ไฟล์ประกอบการวิจัยของคุณ
            </span>
            <Dropzone post={post} setPost={setPost} />
          </label>
          <div className="flex items-center mx-3 mb-5 gap-10">
            <a href="/admin/" className="text-gray-500 text-md">
              Cancel
            </a>
            <button
              type="submit"
              onClick={() => alert(state.header)}
              disabled={submitting}
              className="text-white px-5 py-1.5 text-md rounded-full bg-primary-green"
            >
              ส่งคำตอบ
            </button>
          </div>
        </form>
      </section>
    </PublishFormContext.Provider>
  );
};

export default PublishPage;
