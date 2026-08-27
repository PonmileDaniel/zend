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
                      className="w-full border-0 border-b border-[#303030] bg-[#0a0a0a] px-0 py-3 text-base text-white outline-none transition-colors placeholder:text-[#555] focus:border-white"/>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-2">

                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
