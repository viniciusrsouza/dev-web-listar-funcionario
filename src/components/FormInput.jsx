import React, { useEffect, useState } from "react";

export default function FormInput(props) {
  const { onChange, id, label, type = "text", required = false } = props;
  const [text, setText] = useState("");

  useEffect(() => {
    onChange(text);
  }, [onChange, text]);

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        required={required}
        type={type}
        name={id}
        id={id}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </>
  );
}
