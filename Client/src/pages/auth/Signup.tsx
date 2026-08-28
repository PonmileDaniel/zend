import { useEffect, useState } from "react";

const slides = [
  {
    image: "/src/assets/images/auth/loffy.jpeg",
    title: (
      <>
        Built for the way
        <br />
        you move money.
      </>
    ),
    description:
      "Simple financial tools designed to give you more control, clarity, and confidence over your money.",
  },
  {
    image: "/src/assets/images/auth/second-image.jpeg",
    title: (
      <>
        Your money.
        <br />
        Your control.
      </>
    ),
    description:
      "A modern financial experience designed to give you clarity and confidence over your finances.",
  },
  {
    image: "/src/assets/images/auth/third-image.jpeg",
    title: (
      <>
        Simple tools.
        <br />
        Smarter decisions.
      </>
    ),
    description:
      "Everything you need to manage your money with simplicity and confidence.",
  },
];

export default function Signup() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((previousSlide) => {
        return (previousSlide + 1) % slides.length;
      });
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const currentSlideData = slides[currentSlide];

  return (
    <main className="h-screen overflow-hidden bg-[#131313] text-white">
      <div className="flex h-screen flex-col lg:flex-row">

        {/* LEFT - SIGNUP FORM */}
        <section className="flex h-screen w-full flex-col border-b border-[#262626] lg:w-1/2 lg:border-b-0 lg:border-r">

          {/* Header */}
          <header className="flex shrink-0 items-center px-6 py-5 lg:px-12 lg:py-3">
            <span className="text-3xl font-extrabold tracking-[-0.08em]">
              ZEND
            </span>
          </header>


          {/* Form container */}
          <div className="flex flex-1 items-center justify-center overflow-hidden px-6 py-4 lg:px-12">

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

          </div>


          {/* Footer */}
          <footer className="flex shrink-0 items-center justify-between px-6 py-5 lg:px-12">

            <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#666]">
              © 2026 ZEND TECHNOLOGIES
            </span>

            <div className="flex gap-5">

              <button
                type="button"
                className="text-[11px] uppercase tracking-[0.08em] text-[#666] transition-colors hover:text-white"
              >
                Privacy
              </button>

              <button
                type="button"
                className="text-[11px] uppercase tracking-[0.08em] text-[#666] transition-colors hover:text-white"
              >
                Terms
              </button>

            </div>

          </footer>

        </section>


        {/* RIGHT - VISUAL */}
        <section className="relative hidden h-screen w-full overflow-hidden lg:flex lg:w-1/2">

          {/* Images */}
          <div className="absolute inset-0">

            {slides.map((slide, index) => (
              <img
                key={slide.image}
                src={slide.image}
                alt={`Zend financial technology ${index + 1}`}
                className={`absolute inset-0 h-full w-full object-cover grayscale transition-opacity duration-1000 ${
                  currentSlide === index
                    ? "opacity-60"
                    : "opacity-0"
                }`}
              />
            ))}

            {/* Dark gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-transparent to-transparent" />

          </div>


          {/* Slide content */}
          <div className="relative z-10 mt-auto w-full max-w-lg px-12 py-12">

            <h2 className="text-4xl font-semibold leading-tight tracking-tight">
              {currentSlideData.title}
            </h2>

            <p className="mt-5 max-w-md text-base leading-relaxed text-[#b5b5b5]">
              {currentSlideData.description}
            </p>


            {/* Indicators */}
            <div className="mt-8 flex items-center gap-2">

              {slides.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Show slide ${index + 1}`}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 transition-all duration-500 ${
                    currentSlide === index
                      ? "w-8 bg-white"
                      : "w-2 bg-[#444]"
                  }`}
                />
              ))}

            </div>

          </div>

        </section>

      </div>
    </main>
  );
}