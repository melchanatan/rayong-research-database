import React from "react";
import { AiOutlineFilePdf } from "react-icons/ai";
import { AiOutlineFileExcel } from "react-icons/ai";
import { AiOutlineFileWord } from "react-icons/ai";
import { AiOutlineFile } from "react-icons/ai";

const DynamicFileIcon = ({ fileExtension }) => {
  if (fileExtension === "pdf")
    return <AiOutlineFilePdf className="file-icon" />;
  else if (fileExtension === "docx")
    return <AiOutlineFileWord className="file-icon" />;
  else if (fileExtension === "xlsx")
    return <AiOutlineFileExcel className="file-icon" />;
  else if (fileExtension === "csv")
    return <AiOutlineFile className="file-icon" />;
  else if (fileExtension === "none")
    return <AiOutlineFile className="file-icon" />;
};
export default DynamicFileIcon;
