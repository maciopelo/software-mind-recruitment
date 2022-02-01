import React from "react";

const FormInput = ({ id, label, value, render, onChange, ...inputProps }) => {
  return (
    <div>
      {render && (
        <>
          <label htmlFor={id}> {label} </label>
          <input id={id} {...inputProps} value={value} onChange={onChange} />
        </>
      )}
    </div>
  );
};

export default FormInput;
