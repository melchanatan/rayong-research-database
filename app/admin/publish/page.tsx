"use client";
import Dropzone from "@/components/Dropzone";
import TableInputForm from "@/components/TableInputForm";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  use,
  useContext,
  useReducer,
  useState,
} from "react";
import { IoIosAdd } from "react-icons/io";
import {
  PublishFormContext,
  publishFormDetails,
  publishFormReducer,
} from "@/utils/PublishFormContext";
import InputForm from "@/components/InputForm";
import { useSession } from "next-auth/react";
import TagInputForm from "@/components/TagInputForm";

const PublishPage = () => {
  const router = useRouter();
  const [state, dispatch] = useReducer(publishFormReducer, publishFormDetails);
  const [submitting, setSubmitting] = useState(false);
  const [files, setFiles] = useState([]);

  const createItem = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const csvContent =
      "Name,Age,Email\nJohn Doe,30,john@example.com\nJane Smith,25,jane@example.com";
    const formData = new FormData();

    // append metadata to formdata
    formData.append(
      "metadata",
      new Blob([JSON.stringify(state)], {
        type: "application/json",
      }),
      "metadata"
    );

    // append files to formdata
    files.forEach((file) => {
      formData.append("files", new Blob([file]), file.name);
    });

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/postDoc",
        {
          method: "POST",

          body: formData,
        }
      );

      console.log(response);

      // if (response.ok) {
      //   router.push("/admin");
      // }
    } catch (error) {
      console.log(error.message);
    } finally {
      setSubmitting(false);
    }
  };

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
            label="หัวข้องานวิจัย (จำเป็น)"
            onChange={(e) =>
              dispatch({ type: "SET_HEADER", payload: e.target.value })
            }
            value={state.header}
          />
          <InputForm
            label="บทคัดย่องานวิจัย (จำเป็น)"
            onChange={(e) =>
              dispatch({ type: "SET_ABSTRACT", payload: e.target.value })
            }
            isTextArea={true}
            value={state.abstract}
          />

          <TagInputForm state={state} dispatch={dispatch} />
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
            <Dropzone files={files} setFiles={setFiles} />
          </label>
          <div className="flex items-center mx-3 mb-5 gap-10">
            <a href="/admin/" className="text-gray-500 text-md">
              Cancel
            </a>
            <button
              type="submit"
              onClick={(e) => createItem(e)}
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
