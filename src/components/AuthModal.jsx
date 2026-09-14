import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function AuthModal({ onLoginExitoso }) {
  const [esLogin, setEsLogin] = useState(true);

  return esLogin ? (
    <LoginForm
      onLoginExitoso={onLoginExitoso}
      irARegistro={() => setEsLogin(false)}
    />
  ) : (
    <RegisterForm irALogin={() => setEsLogin(true)} />
  );
}