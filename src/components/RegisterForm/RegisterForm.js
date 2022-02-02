import React, { useState } from "react";
import FormInput from "../FormInput/FormInput";

const initialRegisterForm = {
  name: "",
  password: "",
  email: "",
  newsletter: false,
  submitMessage: "",
};

const RegisterForm = ({ inputs }) => {
  const [registerForm, setRegisterForm] = useState(initialRegisterForm);

  const handleInput = (e) => {
    const { value, name, type } = e.target;

    if (type === "checkbox") {
      setRegisterForm((prev) => ({
        ...prev,
        newsletter: !prev.newsletter,
      }));
      return;
    }

    setRegisterForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateFields = () => {
    const { name, password, email, newsletter } = registerForm;
    const re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (name.trim().length === 0 || password.trim().length === 0) return false;

    if (newsletter && !email.match(re)) return false;

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isFormValid = validateFields();
    setRegisterForm({
      ...registerForm,
      submitMessage: isFormValid ? "pomyślna rejestracja" : "błąd walidacji",
    });

    if (isFormValid) console.log("request sent");
  };

  return (
    <div>
      <form id="register-form" onSubmit={handleSubmit}>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            render={input.name !== "email" || registerForm.newsletter}
            onChange={handleInput}
            value={registerForm[input.name]}
          />
        ))}
        <button form="register-form" type="submit">
          register
        </button>
      </form>
      <span>{registerForm.submitMessage}</span>
    </div>
  );
};

export default RegisterForm;
