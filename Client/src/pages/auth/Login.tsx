import AuthLayout from "../../layouts/AuthLayout";


export default function Login() {
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
              <form className="space-y-5">

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
                    placeholder="Enter your email or account number"
                    className="w-full border-0 border-b border-[#303030] bg-[#0a0a0a] px-0 py-3 text-base text-white outline-none transition-colors placeholder:text-[#555] focus:border-white"
                  />

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
                    placeholder="Enter your password"
                    className="w-full border-0 border-b border-[#303030] bg-[#0a0a0a] px-0 py-3 text-base text-white outline-none transition-colors placeholder:text-[#555] focus:border-white"
                  />

                </div>


                {/* Login Button */}
                <button
                  type="submit"
                  className="mt-3 w-full bg-white py-3.5 text-base font-semibold text-black transition-colors hover:bg-[#d9d9d9]"
                >
                  Log in
                </button>

              </form>


              {/* Signup */}
              <div className="mt-6 border-t border-[#262626] pt-5 text-center">

                <p className="text-sm text-[#a3a3a3]">

                  Don't have an account?{" "}

                  <button
                    type="button"
                    className="text-white transition-colors hover:underline"
                  >
                    Sign up
                  </button>

                </p>

              </div>

            </div>
    </AuthLayout>
  );
}