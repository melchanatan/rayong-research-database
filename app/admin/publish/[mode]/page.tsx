"use client";
import Dropzone from "@/components/Dropzone";
import TableInputForm from "@/components/TableInputForm";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  use,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  PublishFormContext,
  publishFormDetails,
  publishFormReducer,
} from "@/utils/PublishFormContext";
import InputForm from "@/components/InputForm";
import { useSession } from "next-auth/react";
import TagInputForm from "@/components/TagInputForm";

const AdminPublishPage = ({ params }) => {
  const id = params.mode;
  const router = useRouter();
  const [state, dispatch] = useReducer(publishFormReducer, publishFormDetails);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDocumentNotFound, setIsDocumentNotFound] = useState(false);
  const [files, setFiles] = useState([]);

  const createItem = async (e) => {
    e.preventDefault();
    setSubmitting(true);
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

      if (response.ok) {
        router.push("/admin/dashboard");
      } else {
        const data = await response.json();
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("เกิดข้อผิดพลาดโปรดกรอกข้อมูลให้ครบถ้วน");
    } finally {
      setSubmitting(false);
    }
  };

  const fetchFormData = async () => {
    if (id != "add") {
      try {
        const req = await fetch(
          process.env.NEXT_PUBLIC_API_URL + "/getDocData/" + id
        );

        const formData = await req.json();

        dispatch({ type: "SET_ALL", payload: formData });
      } catch {
        setIsDocumentNotFound(true);
        return;
      }
    }
  };

  const editItems = async () => {
    setSubmitting(true);
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/editDoc/" + id,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(state),
      }
    );
    router.push("/admin/dashboard");
  };

  useEffect(() => {
    if (id != "add") {
      fetchFormData();
    }
  }, []);
  const { data: session } = useSession();
  // if (!session) return <h1>Something went wrong</h1>;
  // // if (!session.usernameExists)
  //   return <div className="gap-2 flex items-center">User unauthorized</div>;
  if (isDocumentNotFound && id != "new") return <h1>Document not found</h1>;

  return (
    <PublishFormContext.Provider value={{ state, dispatch }}>
      <section className="max-w-[1200px] w-full px-2 md:px-10 mt-10">
        <h1 className="head_text text-left">
          <span> {id != "new" ? "แก้ไขงานวิจัย" : "เพยแพร่งานวิจัย"}</span>
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

          {id == "new" && <TagInputForm state={state} dispatch={dispatch} />}

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

          {id == "new" && (
            <label>
              <span className=" font-semibold text-base text-gray-700">
                ไฟล์ประกอบการวิจัยของคุณ
              </span>
              <Dropzone files={files} setFiles={setFiles} />
            </label>
          )}
          <div className="flex flex-col gap-1">
            <div className="flex items-center mx-3 mb-5 gap-10">
              <a href="/admin/dashboard" className="text-gray-500 text-md">
                Cancel
              </a>
              <button
                type="submit"
                onClick={id == "new" ? createItem : editItems}
                disabled={submitting}
                className="text-white px-5 py-1.5 text-md rounded-full bg-primary-green hover:brightness-75 active:scale-75"
              >
                {submitting ? "กำลังส่งคำตอบ..." : "ส่งคำตอบ"}
              </button>
            </div>
            {errorMessage && (
              <p className="text-white bg-red-500 rounded-full px-3 py-1">
                <span>{errorMessage}</span>
              </p>
            )}
          </div>
        </form>
      </section>
    </PublishFormContext.Provider>
  );
};

export default AdminPublishPage;
