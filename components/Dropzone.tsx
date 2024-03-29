"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { IoClose } from "react-icons/io5";
import DynamicFileIcon from "./DynamicFileIcon";

// import { getSignature, saveToDatabase } from '@app/_actions'

const Dropzone = ({ files, setFiles, className }) => {
  const [rejected, setRejected] = useState([]);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length) {
      setFiles((previousFiles) => [
        // If allowing multiple files
        ...previousFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }

    if (rejectedFiles?.length) {
      setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "text/csv": [".csv"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "application/pdf": [".pdf"],
      "application/msword": [".doc", ".docx"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    maxSize: 1024 * 1000,
    maxFiles: 3,
    onDrop,
  });

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const removeFile = (name) => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };

  const removeAll = () => {
    setFiles([]);
    setRejected([]);
  };

  const removeRejected = (name) => {
    setRejected((files) => files.filter(({ file }) => file.name !== name));
  };
  const submit = () => {};

  return (
    <div
      onClick={(event) => {
        event.preventDefault();
      }}
    >
      <div
        {...getRootProps({
          refKey: "innerRef",
          noClick: true,
          noKeyboard: true,
        })}
      >
        <input {...getInputProps({ name: "file" })} />
        <div
          className="flex flex-col items-center justify-center gap-4 py-10 bg-slate-100/40 rounded-xl border-gray-500 border-[1px] mt-2 text-gray-400"
          style={{ borderStyle: isDragActive ? "dashed" : "solid" }}
        >
          {isDragActive ? (
            <p>วางตรงนี้เลย ...</p>
          ) : (
            <p>ลากและวางตรงนี้เพื่ออัปโหลด </p>
          )}
        </div>
      </div>

      {/* Preview */}
      <section className="mt-3">
        <div className="flex gap-4">
          <button
            type="button"
            onClick={removeAll}
            className="mt-1 rounded-md border border-rose-400 px-3 text-[12px] font-bold uppercase tracking-wider text-stone-500 transition-colors hover:bg-rose-400 hover:text-white"
          >
            Remove all files
          </button>
        </div>

        {/* Accepted files */}
        {files.length > 0 && (
          <>
            <h3 className="title mt-10 border-b pb-3 text-lg font-semibold text-stone-600">
              ไฟล์ของคุณ
            </h3>
            <ul className="mt-6 flex flex-row gap-4">
              {files.map((file) => (
                <li
                  key={file.name}
                  className="relative rounded-md shadow-lg flex justify-center flex-col items-center p-5"
                >
                  <DynamicFileIcon
                    fileExtension={file.name?.split(".")[-1] || "none"}
                  />
                  <button
                    type="button"
                    className="absolute -right-3 -top-3 flex h-7 w-7 items-center justify-center rounded-full border border-rose-400 bg-rose-400 transition-colors hover:bg-white"
                    onClick={() => removeFile(file.name)}
                  >
                    <IoClose className="fill-white h-5 w-5 hover:fill-rose-400" />
                  </button>
                  <p className="mt-2 text-[12px] font-medium text-stone-500">
                    {file.name}
                  </p>
                </li>
              ))}
            </ul>
          </>
        )}

        {/* Rejected Files */}
        <ul className="mt-6 flex flex-col">
          {rejected.map(({ file, errors }) => (
            <li key={file.name} className="flex items-start justify-between">
              <div>
                <p className="mt-2 text-sm font-medium text-stone-500">
                  {file.name}
                </p>
                <ul className="text-[12px] text-red-400">
                  {errors.map((error) => (
                    <li key={error.code}>{error.message}</li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                className="mt-1 rounded-md border border-rose-400 px-3 py-1 text-[12px] font-bold uppercase tracking-wider text-stone-500 transition-colors hover:bg-rose-400 hover:text-white"
                onClick={() => removeRejected(file.name)}
              >
                remove
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Dropzone;
