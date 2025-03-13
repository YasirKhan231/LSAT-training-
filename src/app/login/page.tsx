// app/login/page.tsx
import LoginForm from "../../../components/LoginForm";
import GoogleSignIn from "../../../components/GoogleSignin";

export default function LoginPage() {
  return (
    <div>
      <h1>Login</h1>
      <LoginForm />
      <p>Or</p>
      <GoogleSignIn />
    </div>
  );
}
