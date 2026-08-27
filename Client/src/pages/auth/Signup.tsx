export default function Signup() {
  return (
    <main className="min-h-screen bg-[#131313] text-white">
      <div className="flex min-h-screen flex-col lg:flex-row">
        {/**LEFT - SIGNUP FORM */}
        <section className="flex min-h-screen w-full flex-col border-b border-[#262626] lg:w-1/2 lg:border-b-0 lg:border-r">
          {/** Header */}
          <header className="flex items-center px-6 py-8 lg:px-12">
            <span className="text-3xl font-extrabold tracking-[-0.08em]">
              ZEND
            </span>
          </header>

          {/**Form container */}
          <div className="flex flex-1 items-center justify-center px-6 py-10 lg:px-12">
            <div className="w-full max-w-md">
              <div className="mb-8">
                <h1 className="text-3xl font-semibold tracking-tight">
                  Create your account
                </h1>

                <p className="mt-3 text-sm leading-relaxed text-[#a3a3a3]">
                  Join Zend and take control of your finances.
                </p>
              </div>

              <form className="space-y-5">
                {/* First + Last Name */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
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
                      className="w-full border-0 border-b border-[#303030] bg-[#0a0a0a] px-0 py-3 text-base text-white outline-none transition-colors placeholder:text-[#555] focus:border-white"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
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
                      className="w-full border-0 border-b border-[#303030] bg-[#0a0a0a] px-0 py-3 text-base text-white outline-none transition-colors placeholder:text-[#555] focus:border-white"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-2">
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
                    className="w-full border-0 border-b border-[#303030] bg-[#0a0a0a] px-0 py-3 text-base text-white outline-none transition-colors placeholder:text-[#555] focus:border-white"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
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
                    className="w-full border-0 border-b border-[#303030] bg-[#0a0a0a] px-0 py-3 text-base text-white outline-none transition-colors placeholder:text-[#555] focus:border-white"
                  />
                </div>

                {/* Password */}
                <div className="flex flex-col gap-2">
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
                    className="w-full border-0 border-b border-[#303030] bg-[#0a0a0a] px-0 py-3 text-base text-white outline-none transition-colors placeholder:text-[#555] focus:border-white"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="mt-4 w-full bg-white py-4 text-base font-semibold text-black transition-colors hover:bg-[#d9d9d9]"
                >
                  Create account
                </button>
              </form>

              {/* Login */}
              <div className="mt-8 border-t border-[#262626] pt-6 text-center">
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
          </div>

          {/** Footer */}
          <footer className="flex items-center justify-between border-t border-[#262626] px-6 py-8 lg:px-12">
            <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#666]">
              © 2026 ZEND TECHNOLOGIES
            </span>

            <div className="hidden gap-5 md:flex">
              <button className="text-[11px] uppercase tracking-[0.08em] text-[#666] transition-colors hover:text-white">
                Privacy
              </button>
            </div>

            <button className="text-[11px] uppercase tracking-[0.08em] text-[#666] transition-colors hover:text-white">
              Terms
            </button>
          </footer>
        </section>

        {/*RIGHT - VISUAL */}
        <section className="relative hidden min-h-screen w-full overflow-hidden  lg:flex lg:w-1/2">
          <div className="absolute inset-0">
            <img
              src="/src/assets/images/auth/loffy.jpeg"
              alt="Zend financial technologies"
              className="h-full w-full object-cover grayscale opacity-60"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-transparent to-transparent" />
          </div>

          
        </section>
      </div>
    </main>
  );
}
