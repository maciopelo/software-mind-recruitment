import { fireEvent, render, screen } from "@testing-library/react";
import RegisterForm from "../RegisterForm";

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

describe("RegisterForm component", () => {
  describe("renders", () => {
    it("should render RegisterForm with three inputs", () => {
      render(<RegisterForm inputs={inputs} />);
      const formInputs = screen.getAllByTestId("form-input");
      const errorMessage = screen.queryByText(/błąd walidacji/i);
      const successMessage = screen.queryByText(/pomyślna rejestracja/i);
      expect(formInputs.length).toBe(3);
      expect(errorMessage).not.toBeInTheDocument();
      expect(successMessage).not.toBeInTheDocument();
    });

    it("should be able to type in inputs", () => {
      render(<RegisterForm inputs={inputs} />);
      const nameInput = screen.getByPlaceholderText("name");
      fireEvent.change(nameInput, { target: { value: "john" } });
      expect(nameInput).toBeInTheDocument();
      expect(nameInput.value).toBe("john");
    });

    it("should display fourth input after checkbox click", () => {
      render(<RegisterForm inputs={inputs} />);
      const newsletterInput = screen.getByPlaceholderText("newsletter");
      fireEvent.click(newsletterInput);
      const formInputs = screen.getAllByTestId("form-input");
      expect(formInputs.length).toBe(4);
      expect(newsletterInput.value).toBe("true");
    });
  });

  describe("validation errors", () => {
    it("should display 'błąd walidacji' message onSubmit when name and password empty", () => {
      render(<RegisterForm inputs={inputs} />);
      const submitButton = screen.getByText(/register/i);
      fireEvent.click(submitButton);
      const errorMessage = screen.getByText(/błąd walidacji/i);
      expect(errorMessage).toBeInTheDocument();
    });

    it("should display 'błąd walidacji' message onSubmit when email empty", () => {
      render(<RegisterForm inputs={inputs} />);
      const nameInput = screen.getByPlaceholderText("name");
      const passwordInput = screen.getByPlaceholderText("password");
      const newsletterCheckbox = screen.getByPlaceholderText("newsletter");
      const submitButton = screen.getByText(/register/i);
      fireEvent.change(nameInput, { target: { value: "john" } });
      fireEvent.change(passwordInput, { target: { value: "password" } });
      fireEvent.click(newsletterCheckbox);
      fireEvent.click(submitButton);
      const successMessage = screen.getByText(/błąd walidacji/i);
      expect(successMessage).toBeInTheDocument();
    });

    it("should display 'błąd walidacji' message onSubmit when wrong email format", () => {
      render(<RegisterForm inputs={inputs} />);
      const nameInput = screen.getByPlaceholderText("name");
      const passwordInput = screen.getByPlaceholderText("password");
      const newsletterCheckbox = screen.getByPlaceholderText("newsletter");
      const submitButton = screen.getByText(/register/i);

      fireEvent.change(nameInput, { target: { value: "john" } });
      fireEvent.change(passwordInput, { target: { value: "password" } });
      fireEvent.click(newsletterCheckbox);

      const email = screen.getByPlaceholderText("email");
      fireEvent.change(email, { target: { value: "john@mail" } });
      fireEvent.click(submitButton);

      const successMessage = screen.getByText(/błąd walidacji/i);
      expect(successMessage).toBeInTheDocument();
    });
  });

  describe("validation success", () => {
    it("should display 'pomyślna rejestracja' message onSubmit when only name na password", () => {
      render(<RegisterForm inputs={inputs} />);
      const nameInput = screen.getByPlaceholderText("name");
      const passwordInput = screen.getByPlaceholderText("password");
      const submitButton = screen.getByText(/register/i);
      fireEvent.change(nameInput, { target: { value: "john" } });
      fireEvent.change(passwordInput, { target: { value: "password" } });
      fireEvent.click(submitButton);
      const successMessage = screen.getByText(/pomyślna rejestracja/i);
      expect(successMessage).toBeInTheDocument();
    });

    it("should display 'pomyślna rejestracja' message onSubmit when all fields provided", () => {
      render(<RegisterForm inputs={inputs} />);
      const nameInput = screen.getByPlaceholderText("name");
      const passwordInput = screen.getByPlaceholderText("password");
      const newsletterCheckbox = screen.getByPlaceholderText("newsletter");
      const submitButton = screen.getByText(/register/i);

      fireEvent.change(nameInput, { target: { value: "john" } });
      fireEvent.change(passwordInput, { target: { value: "password" } });
      fireEvent.click(newsletterCheckbox);

      const email = screen.getByPlaceholderText("email");
      fireEvent.change(email, { target: { value: "john@mail.com" } });
      fireEvent.click(submitButton);

      const successMessage = screen.getByText(/pomyślna rejestracja/i);
      expect(successMessage).toBeInTheDocument();
    });
  });
});
