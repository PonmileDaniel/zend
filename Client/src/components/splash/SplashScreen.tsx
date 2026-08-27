export default function SplashScreen() {
  return (
    <div className="splash-screen relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Expanding white ZEND */}
      <h1 className="splash-logo absolute text-[90px] font-black tracking-[-0.08em] text-white sm:text-[10rem] md:text-[12rem]">
        ZEND
      </h1>

      {/* Tagline */}
      <p className="tagline absolute mt-44 text-xs font-medium tracking-[0.25em] text-white sm:mt-52 sm:text-sm">
        THE FUTURE OF FINANCE
      </p>

      {/* Final black ZEND */}
      <h1 className="final-logo absolute text-[90px] font-black tracking-[-0.08em] text-black sm:text-[10rem] md:text-[12rem]">
        ZEND
      </h1>

      {/* Final black tagline */}
      <p className="final-tagline absolute mt-44 text-xs font-medium tracking-[0.25em] text-black sm:mt-52 sm:text-sm">
        THE FUTURE OF FINANCE
      </p>
    </div>
  );
}
