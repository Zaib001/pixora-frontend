// pages/auth.jsx
import { useState } from "react";
import AuthLayout from "../components/auth/AuthLayout";
import Login from "./Login";
import Signup from "./Signup";

export default function AuthPage() {
  const [authType, setAuthType] = useState("login");

  return (
    <AuthLayout type={authType}>
      {authType === "login" ? <Login /> : <Signup />}
    </AuthLayout>
  );
}