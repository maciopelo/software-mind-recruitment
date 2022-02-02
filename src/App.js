import RegisterForm from "./components/RegisterForm/RegisterForm";

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

function App() {
  return (
    <div className="App">
      <RegisterForm inputs={inputs} />
    </div>
  );
}

export default App;
