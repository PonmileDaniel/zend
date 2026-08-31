export default function AuthFooter() {
  return (
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
  );
}
