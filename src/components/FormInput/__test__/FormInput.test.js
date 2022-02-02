import { render, screen } from "@testing-library/react";
import FormInput from "../FormInput";

const inputs = [
  {
    id: 1,
    name: "imie",
    placeholder: "imie",
    type: "text",
    label: "Imie",
  },
  {
    id: 2,
    name: "haslo",
    placeholder: "haslo",
    type: "password",
    label: "Haslo",
  },
  {
    id: 3,
    name: "newsletter",
    placeholder: "newsletter",
    type: "checkbox",
    label: "Newsletter",
  },
  {
    id: 4,
    name: "email",
    placeholder: "email",
    type: "text",
    label: "Email",
  },
];

const MockFourFormInputs = () =>
  inputs.map((input) => (
    <FormInput key={input.id} {...input} render={input.name !== "email"} />
  ));

describe("FormInput component renders", () => {
  it("should render one FormInput component", () => {
    render(<FormInput {...inputs[0]} render={true} />);
    const formInput = screen.getByPlaceholderText("imie");
    expect(formInput).toBeInTheDocument();
  });

  it("should render three FormInput component", () => {
    render(<MockFourFormInputs />);
    const formInputs = screen.getAllByTestId("form-input");
    const emailFormInput = screen.queryByPlaceholderText("email");
    expect(formInputs.length).toBe(3);
    expect(emailFormInput).not.toBeInTheDocument();
  });
});
