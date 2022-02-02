import React from "react";

const FormInput = ({ id, label, value, render, onChange, ...inputProps }) => {
  return render ? (
    <div data-testid="form-input">
      <label htmlFor={id}> {label} </label>
      <input id={id} {...inputProps} value={value} onChange={onChange} />
    </div>
  ) : null;
};

export default FormInput;
