// app/Signup/page.tsx
import SignupForm from "../../../components/SignupForm";
import GoogleSignIn from "../../../components/GoogleSignin";

export default function SignupPage() {
  return (
    <div className="flex flex-col min-h-[80vh] items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Create an account
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Start your LSAT preparation journey today
          </p>
        </div>

        <SignupForm />

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">
                Or sign up with
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
