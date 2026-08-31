import AuthLayout from "../../layouts/AuthLayout";

export default function Signup() {
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
        <form className="space-y-4">
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
                placeholder="John"
                className="w-full border-0 border-b border-[#303030] bg-[#0a0a0a] px-0 py-2.5 text-base text-white outline-none transition-colors placeholder:text-[#555] focus:border-white"
              />
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
                placeholder="Doe"
                className="w-full border-0 border-b border-[#303030] bg-[#0a0a0a] px-0 py-2.5 text-base text-white outline-none transition-colors placeholder:text-[#555] focus:border-white"
              />
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
              id="phone"
              type="tel"
              placeholder="+234 800 000 0000"
              className="w-full border-0 border-b border-[#303030] bg-[#0a0a0a] px-0 py-2.5 text-base text-white outline-none transition-colors placeholder:text-[#555] focus:border-white"
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
              placeholder="you@example.com"
              className="w-full border-0 border-b border-[#303030] bg-[#0a0a0a] px-0 py-2.5 text-base text-white outline-none transition-colors placeholder:text-[#555] focus:border-white"
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

            <input
              id="password"
              type="password"
              placeholder="Create a password"
              className="w-full border-0 border-b border-[#303030] bg-[#0a0a0a] px-0 py-2.5 text-base text-white outline-none transition-colors placeholder:text-[#555] focus:border-white"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-2 w-full bg-white py-3.5 text-base font-semibold text-black transition-colors hover:bg-[#d9d9d9]"
          >
            Create account
          </button>
        </form>

        {/* Login */}
        <div className="mt-5 border-t border-[#262626] pt-4 text-center">
          <p className="text-sm text-[#a3a3a3]">
            Already have an account?{" "}
            <button
              type="button"
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
