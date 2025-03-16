"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import GoogleSignIn from "../../../components/GoogleSignin";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Signup form state
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  // Handle sign in
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      setSuccess("Login successful! Redirecting...");
      setTimeout(() => router.push("/dashboard"), 1000);
    } catch (error: any) {
      let errorMessage = "Failed to log in";
      if (error.code === "auth/user-not-found")
        errorMessage = "No account found with this email";
      else if (error.code === "auth/wrong-password")
        errorMessage = "Incorrect password";
      else if (error.code === "auth/invalid-credential")
        errorMessage = "Invalid email or password";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle sign up
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeToTerms) {
      setError("You must agree to the terms and conditions");
      return;
    }

    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, signupEmail, signupPassword);
      setSuccess("Account created successfully! Redirecting...");
      setTimeout(() => router.push("/onboarding"), 1000);
    } catch (error: any) {
      let errorMessage = "Failed to create account";
      if (error.code === "auth/email-already-in-use")
        errorMessage = "Email is already in use";
      else if (error.code === "auth/weak-password")
        errorMessage = "Password is too weak";
      else if (error.code === "auth/invalid-email")
        errorMessage = "Invalid email address";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Password strength indicator
  const getPasswordStrength = (password: string) => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  const passwordStrength = getPasswordStrength(signupPassword);

  const getPasswordStrengthLabel = () => {
    if (passwordStrength === 0) return "";
    if (passwordStrength <= 2) return "Weak";
    if (passwordStrength <= 4) return "Medium";
    return "Strong";
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return "bg-red-500";
    if (passwordStrength <= 4) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center text-gray-500 hover:text-gray-700 text-sm mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Back to home</span>
        </Link>

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          {/* Logo */}
          <div className="text-center mb-6">
            <Link href="/">
              <div className="inline-flex bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-2 rounded-lg">
                <span className="font-bold text-xl">LSAT Training</span>
              </div>
            </Link>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                setActiveTab("signin");
                setError("");
                setSuccess("");
              }}
              className={`flex-1 py-3 font-medium text-sm ${
                activeTab === "signin"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                setActiveTab("signup");
                setError("");
                setSuccess("");
              }}
              className={`flex-1 py-3 font-medium text-sm ${
                activeTab === "signup"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Error/Success Messages */}
          {(error || success) && (
            <div
              className={`mb-6 p-3 rounded-lg ${
                error
                  ? "bg-red-50 border-l-4 border-red-500"
                  : "bg-green-50 border-l-4 border-green-500"
              }`}
            >
              <div className="flex">
                <div className="flex-shrink-0">
                  {error ? (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  ) : (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  )}
                </div>
                <div className="ml-3">
                  <p
                    className={`text-sm ${
                      error ? "text-red-700" : "text-green-700"
                    }`}
                  >
                    {error || success}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Sign In Form */}
          {activeTab === "signin" && (
            <form onSubmit={handleSignIn} className="space-y-4">
              {/* Email Input */}
              <div>
                <label
                  htmlFor="login-email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <Mail className="h-5 w-5" />
                  </div>
                  <input
                    id="login-email"
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                    className="pl-10 w-full rounded-lg border border-gray-300 py-2 px-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label
                    htmlFor="login-password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-blue-600 hover:text-blue-800"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <Lock className="h-5 w-5" />
                  </div>
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    className="pl-10 w-full rounded-lg border border-gray-300 py-2 px-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </button>

              {/* Social Sign In */}
              <div className="relative mt-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <GoogleSignIn />
              </div>
            </form>
          )}

          {/* Sign Up Form */}
          {activeTab === "signup" && (
            <form onSubmit={handleSignUp} className="space-y-4">
              {/* Full Name Input */}
              <div>
                <label
                  htmlFor="signup-name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <User className="h-5 w-5" />
                  </div>
                  <input
                    id="signup-name"
                    type="text"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    required
                    className="pl-10 w-full rounded-lg border border-gray-300 py-2 px-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label
                  htmlFor="signup-email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <Mail className="h-5 w-5" />
                  </div>
                  <input
                    id="signup-email"
                    type="email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    required
                    className="pl-10 w-full rounded-lg border border-gray-300 py-2 px-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label
                  htmlFor="signup-password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <Lock className="h-5 w-5" />
                  </div>
                  <input
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    required
                    className="pl-10 w-full rounded-lg border border-gray-300 py-2 px-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {signupPassword && (
                  <div className="mt-2">
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getPasswordStrengthColor()} transition-all duration-300`}
                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                      ></div>
                    </div>
                    <div className="mt-1 text-xs flex justify-between">
                      <span
                        className={
                          passwordStrength > 0
                            ? "text-gray-600"
                            : "text-gray-400"
                        }
                      >
                        {getPasswordStrengthLabel()}
                      </span>
                      <div className="flex gap-x-1 text-xs text-gray-500">
                        <span
                          className={
                            /[A-Z]/.test(signupPassword) ? "text-green-600" : ""
                          }
                        >
                          A
                        </span>
                        <span
                          className={
                            /[a-z]/.test(signupPassword) ? "text-green-600" : ""
                          }
                        >
                          a
                        </span>
                        <span
                          className={
                            /[0-9]/.test(signupPassword) ? "text-green-600" : ""
                          }
                        >
                          1
                        </span>
                        <span
                          className={
                            /[^A-Za-z0-9]/.test(signupPassword)
                              ? "text-green-600"
                              : ""
                          }
                        >
                          @
                        </span>
                        <span
                          className={
                            signupPassword.length >= 8 ? "text-green-600" : ""
                          }
                        >
                          8+
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Terms Agreement */}
              <div className="flex items-start mt-4">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="text-gray-600">
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              </div>

              {/* Sign Up Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating account...
                  </>
                ) : (
                  "Create account"
                )}
              </button>

              {/* Social Sign Up */}
              <div className="relative mt-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or sign up with
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <GoogleSignIn />
              </div>
            </form>
          )}
        </div>

        {/* Alternative Link */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            {activeTab === "signin" ? (
              <>
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                    setActiveTab("signup")
                  }
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                    setActiveTab("signin")
                  }
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
