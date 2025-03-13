// app/signup/page.tsx
import SignupForm from "../../../components/SignupForm";
import GoogleSignIn from "../../../components/GoogleSignin";

export default function SignupPage() {
  return (
    <div>
      <h1>Sign Up</h1>
      <SignupForm />
      <p>Or</p>
      <GoogleSignIn />
    </div>
  );
}
