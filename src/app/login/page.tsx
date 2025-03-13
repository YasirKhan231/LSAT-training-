// app/login/page.tsx
import LoginForm from "../../../components/LoginForm";
import GoogleSignIn from "../../../components/GoogleSignin";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-[80vh] items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to continue your LSAT preparation
          </p>
        </div>

        <LoginForm />

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6">
            <GoogleSignIn />
          </div>
        </div>
      </div>
    </div>
  );
}
