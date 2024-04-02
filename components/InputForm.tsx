import { publishFormReducer } from "@/utils/PublishFormContext";
import React, { useReducer } from "react";

const InputForm = ({
  label,
  onChange,
  value,
  isTextArea = false,
}: {
  label: string;
  onChange: any;
  value: string;
  isTextArea?: boolean;
}) => {
  return (
    <label>
      <span className="font-semibold text-gray-700">{label}</span>

      {isTextArea ? (
        <textarea
          value={value}
          onChange={onChange}
          placeholder="พิมพ์ตรงนี้..."
          className="form-textarea"
        />
      ) : (
        <input
          value={value}
          onChange={onChange}
          placeholder="พิมพ์ตรงนี้..."
          className="form-input"
        />
      )}
    </label>
  );
};

export default InputForm;
