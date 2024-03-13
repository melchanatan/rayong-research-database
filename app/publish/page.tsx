"use client";
import Dropzone from "@/components/Dropzone";
import TableInputForm from "@/components/TableInputForm";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoIosAdd } from "react-icons/io";

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

  return (
    <section className="main-container mt-10">
      <h1 className="head_text text-left">
        <span>เพยแพร่งานวิจัย</span>
      </h1>

      <form className="mt-3 w-full max-w-screen-2xl flex flex-col gap-7 box-container">
        <label>
          <span className="font-semibold text-gray-700">หัวข้องานวิจัย</span>
          <input
            value={post.name}
            onChange={(e) => setPost({ ...post, name: e.target.value })}
            placeholder="Enter your Item name"
            required
            className="form-input"
          />
        </label>

        {/* <label>
          <span className=" font-semibold text-base text-gray-700"></span>
          <input
            value={post.stockMax}
            onChange={(e) => setPost({ ...post, stockMax: e.target.value })}
            placeholder="พิมพ์เลย"
            required
            type="number"
            className="w-2 form-input"
          />
        </label> */}
        <label>
          <span className=" font-semibold text-base text-gray-700">
            บทคัดย่องานวิจัย
          </span>
          <textarea
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
            placeholder="พิมพ์ตรงนี้..."
            className="form-textarea"
          />
        </label>

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

        <label>
          <span className=" font-semibold text-base text-gray-700">องกรณ์</span>
          <input
            value={post.name}
            onChange={(e) => setPost({ ...post, name: e.target.value })}
            placeholder="Enter your Item name"
            required
            className="form-input"
          />
        </label>

        <TableInputForm></TableInputForm>
        <label>
          <span className=" font-semibold text-base text-gray-700">
            อีเมลในการติดต่อ
          </span>
          <input
            value={post.name}
            onChange={(e) => setPost({ ...post, name: e.target.value })}
            placeholder="Enter your Item name"
            required
            className="form-input"
          />
        </label>

        <label>
          <span className=" font-semibold text-base text-gray-700">
            ไฟล์ประกอบการวิจัยของคุณ
          </span>
          <Dropzone post={post} setPost={setPost} />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <a href="/admin/" className="text-gray-500 text-md">
            Cancel
          </a>

          <button
            type="submit"
            disabled={submitting}
            className="text-white px-5 py-1.5 text-md rounded-full bg-primary-green"
          >
            sumbit
          </button>
        </div>
      </form>
    </section>
  );
};

export default PublishPage;
