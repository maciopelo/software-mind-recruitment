import React, { useState } from "react";
import FormInput from "../FormInput/FormInput";

const initialRegisterForm = {
  name: "",
  password: "",
  email: "",
  newsletter: false,
  submitMessage: "",
};

const inputs = [
  {
    id: 1,
    name: "name",
    placeholder: "name",
    type: "text",
    label: "Name",
  },
  {
    id: 2,
    name: "password",
    placeholder: "password",
    type: "password",
    label: "Password",
  },
  {
    id: 3,
    name: "newsletter",
    placeholder: "newsletter",
    type: "checkbox",
    label: "newsletter",
  },
  {
    id: 4,
    name: "email",
    placeholder: "email",
    type: "text",
    label: "Email",
  },
];

const RegisterForm = () => {
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
            onChange={handleInput}
            value={registerForm[input.name]}
            render={Boolean(registerForm.newsletter || input.name !== "email")}
          />
        ))}
        <button form="register-form" type="submit">
          zarejestruj
        </button>
      </form>
      <span>{registerForm.submitMessage}</span>
    </div>
  );
};

export default RegisterForm;
