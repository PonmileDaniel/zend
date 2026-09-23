import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import AuthLayout from "../../layouts/AuthLayout";
import {
  signupSchema,
  type SignupFormData,
} from "../../schemas/auth/signupSchema";
import { signup } from "../../services/authApi";

type SignupErrors = Partial<Record<keyof SignupFormData, string>>;

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState<SignupFormData>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<SignupErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [id]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [id]: undefined,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = signupSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: SignupErrors = {};

      for (const issue of result.error.issues) {
        const field = issue.path[0];

        if (
          typeof field === "string" &&
          field in form &&
          !fieldErrors[field as keyof SignupFormData]
        ) {
          fieldErrors[field as keyof SignupFormData] = issue.message;
        }
      }

      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setServerError("");
    setIsSubmitting(true);

    try {
      await signup(result.data);
      sessionStorage.setItem("signupEmail", result.data.email);

      // console.log("Valid signup data:", response);
      navigate("/otp");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";
      // console.error("Signup failed:", message);
      setServerError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        {/* Heading */}
        <div className="mb-5">
          <h1 className="text-3xl font-semibold tracking-tight">
            Create your account
          </h1>

          <p className="mt-2 text-sm leading-relaxed text-[#a3a3a3]">
            Join Zend and take control of your finances.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {serverError && (
            <div className="mb-4 border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {serverError}
            </div>
          )}
          {/* First + Last Name */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* First Name */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="firstName"
                className="text-xs font-medium uppercase tracking-[0.08em] text-[#a3a3a3]"
              >
                First name
              </label>

              <input
                id="firstName"
                type="text"
                value={form.firstName}
                onChange={handleChange}
                placeholder="John"
                autoComplete="given-name"
                className={`w-full border-0 border-b border-[#303030] bg-[#0a0a0a] px-0 py-2.5 text-base text-white outline-none transition-colors placeholder:text-[#555] focus:border-white ${
                  errors.firstName ? "border-red-500" : "border-[#303030]"
                }`}
              />
              {errors.firstName && (
                <p className="text-xs text-red-400">{errors.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="lastName"
                className="text-xs font-medium uppercase tracking-[0.08em] text-[#a3a3a3]"
              >
                Last name
              </label>

              <input
                id="lastName"
                type="text"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Doe"
                className={`w-full border-0 border-b bg-[#0a0a0a] px-0 py-2.5 text-base text-white outline-none transition-colors placeholder:text-[#555] focus:border-white ${
                  errors.lastName ? "border-red-500" : "border-[#303030]"
                }`}
              />
              {errors.lastName && (
                <p className="text-xs text-red-400">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="phone"
              className="text-xs font-medium uppercase tracking-[0.08em] text-[#a3a3a3]"
            >
              Phone number
            </label>

            <input
              id="phoneNumber"
              type="tel"
              value={form.phoneNumber}
              onChange={handleChange}
              placeholder="+234 800 000 0000"
              autoComplete="tel"
              className={`w-full border-0 border-b bg-[#0a0a0a] px-0 py-2.5 text-base text-white outline-none transition-colors placeholder:text-[#555] focus:border-white ${
                errors.phoneNumber ? "border-red-500" : "border-[#303030]"
              }`}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-xs font-medium uppercase tracking-[0.08em] text-[#a3a3a3]"
            >
              Email address
            </label>

            <input
              id="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              autoComplete="email"
              className={`w-full border-0 border-b bg-[#0a0a0a] px-0 py-2.5 text-base text-white outline-none transition-colors placeholder:text-[#555] focus:border-white ${
                errors.email ? "border-red-500" : "border-[#303030]"
              }`}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-xs font-medium uppercase tracking-[0.08em] text-[#a3a3a3]"
            >
              Password
            </label>

            <div
              className={`relative border-b ${errors.password ? "border-red-500" : "border-[#303030]"}`}
            >
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                placeholder="Create a password"
                autoComplete="new-password"
                className="w-full border-0 bg-[#0a0a0a] px-0 py-2.5 pr-8 text-base text-white outline-none placeholder:text-[#555] focus:border-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword((previous) => !previous)}
                className="absolute right-1 top-1/2 -translate-y-1/2 text-[#555] transition-colors hover:text-[#a3a3a3]"
                aria-label={showPassword ? "Hide password" : "Show Password"}
              >
                {showPassword ? (
                  <EyeOff size={17} strokeWidth={1.5} />
                ) : (
                   <Eye size={17} strokeWidth={1.5} />
                )}
              </button>
              {errors.password && (
                <p className="text-xs text-red-400">{errors.password}</p>
              )}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 w-full bg-white py-3.5 text-base font-semibold text-black transition-colors hover:bg-[#d9d9d9]"
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>
        </form>

        {/* Login */}
        <div className="mt-5 border-t border-[#262626] pt-4 text-center">
          <p className="text-sm text-[#a3a3a3]">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-white transition-colors hover:underline"
            >
              Log in
            </button>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}