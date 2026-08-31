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

const SLIDE_DURATION = 15000;

export default function AuthVisual() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((previousSlide) => (previousSlide + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, []);

  const currentSlideData = slides[currentSlide];

  return (
    <section className="relative hidden h-screen w-full overflow-hidden lg:flex lg:w-1/2">
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <img
            key={slide.image}
            src={slide.image}
            alt={`Zend financial technology ${index + 1}`}
            className={`absolute inset-0 h-full w-full object-cover grayscale transition-opacity duration-1000 ${
              currentSlide === index ? "opacity-60" : "opacity-0"
            }`}
          />
        ))}

        <div className="absolute inset-0  bg-gradient-to-t from-[#131313] via-transparent to-transparent" />
      </div>

      {/* Slide Content */}

      <div className="relative z-10 mt-auto w-full max-w-lg px-12 py-12">
        <h2 className="text-4dxl font-semibold leading-tight tracking-tight">
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
                currentSlide === index ? "w-8 bg-white" : "w-2 bg-[#444]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
