import { useState } from "react";
import AuthLayout from "../../layouts/AuthLayout";
import { useNavigate } from "react-router-dom";

import {
  loginSchema,
  type LoginFormData,
} from "../../schemas/auth/loginSchema";

import { login } from "../../services/authApi";

type LoginErrors = Partial<Record<keyof LoginFormData, string>>;

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState<LoginFormData>({
    emailorAccountNumber: "",
    password: "",
  });

  const [errors, setErrors] = useState<LoginErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { id, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [id]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [id]: undefined,
    }));

    setServerError("");
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const result = loginSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: LoginErrors = {};

      for (const issue of result.error.issues) {
        const field = issue.path[0];

        if (
          typeof field === "string" &&
          field in form &&
          !fieldErrors[field as keyof LoginFormData]
        ) {
          fieldErrors[field as keyof LoginFormData] =
            issue.message;
        }
      }

      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setServerError("");
    setIsSubmitting(true);

    try {
      const response = await login(
        result.data.emailorAccountNumber,
        result.data.password,
      );

      sessionStorage.setItem("loginEmail", response.email);

      navigate("/verify-login-otp");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";

      console.error("Login failed:", message);
      setServerError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md">

        {/* Heading */}
        <div className="mb-6">
          <h1 className="text-3xl font-semibold tracking-tight">
            Welcome back
          </h1>

          <p className="mt-2 text-sm leading-relaxed text-[#a3a3a3]">
            Log in to continue to your Zend account.
          </p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* Server Error */}
          {serverError && (
            <div className="border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {serverError}
            </div>
          )}

          {/* Email / Account Number */}
          <div className="flex flex-col gap-1.5">

            <label
              htmlFor="emailorAccountNumber"
              className="text-xs font-medium uppercase tracking-[0.08em] text-[#a3a3a3]"
            >
              Email or account number
            </label>

            <input
              id="emailorAccountNumber"
              name="emailorAccountNumber"
              type="text"
              value={form.emailorAccountNumber}
              onChange={handleChange}
              placeholder="Enter your email or account number"
              autoComplete="username"
              className={`w-full border-0 border-b bg-[#0a0a0a] px-0 py-3 text-base text-white outline-none transition-colors placeholder:text-[#555] focus:border-white ${
                errors.emailorAccountNumber
                  ? "border-red-500"
                  : "border-[#303030]"
              }`}
            />

            {errors.emailorAccountNumber && (
              <p className="text-xs text-red-400">
                {errors.emailorAccountNumber}
              </p>
            )}

          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">

            <div className="flex items-center justify-between">

              <label
                htmlFor="password"
                className="text-xs font-medium uppercase tracking-[0.08em] text-[#a3a3a3]"
              >
                Password
              </label>

              <button
                type="button"
                className="text-xs text-[#888] transition-colors hover:text-white"
              >
                Forgot password?
              </button>

            </div>

            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="current-password"
              className={`w-full border-0 border-b bg-[#0a0a0a] px-0 py-3 text-base text-white outline-none transition-colors placeholder:text-[#555] focus:border-white ${
                errors.password
                  ? "border-red-500"
                  : "border-[#303030]"
              }`}
            />

            {errors.password && (
              <p className="text-xs text-red-400">
                {errors.password}
              </p>
            )}

          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-3 w-full bg-white py-3.5 text-base font-semibold text-black transition-colors hover:bg-[#d9d9d9] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Logging in..." : "Log in"}
          </button>
        </form>

        {/* Signup */}
        <div className="mt-6 border-t border-[#262626] pt-5 text-center">

          <p className="text-sm text-[#a3a3a3]">
            Don't have an account?{" "}

            <button
              type="button"
              className="text-white transition-colors hover:underline"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </button>
          </p>

        </div>

      </div>
    </AuthLayout>
  );
}