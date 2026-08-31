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

export default function Login() {
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

        {/* LEFT - LOGIN FORM*/}

        <section className="flex h-screen w-full flex-col border-b border-[#262626] lg:w-1/2 lg:border-b-0 lg:border-r">

          {/* Header */}
          <header className="flex shrink-0 items-center px-6 py-5 lg:px-12 lg:py-6">
            <span className="text-3xl font-extrabold tracking-[-0.08em]">
              ZEND
            </span>
          </header>


          {/* Login Form Container */}
          <div className="flex flex-1 items-center justify-center overflow-hidden px-6 py-4 lg:px-12">

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

          </div>


          {/* Footer */}
          <footer className="flex shrink-0 items-center justify-between border-t border-[#262626] px-6 py-5 lg:px-12">

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


        {/* RIGHT - VISUAL*/}

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

            {/* Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-transparent to-transparent" />

          </div>


          {/* Slide Content */}
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