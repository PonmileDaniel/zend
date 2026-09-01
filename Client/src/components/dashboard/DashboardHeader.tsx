import { Bell, ChevronDown, Moon } from "lucide-react";
type DashboardHeaderProps = {
  title: string;
}

export default function DashboardHeader({ title, } : DashboardHeaderProps) {
  return (
    <header className="flex h-[72px] shrink-0 items-center justify-between border-b border-[#262626] bg-[#131313] px-5 lg:px-8">
      {/* Mobile Logo */}
      <div className="lg:hidden">
        <span className="text-2xl font-extrabold tracking-[-0.08em]">ZEND</span>
      </div>

      {/* Desktop Title */}
      <div className="hidden lg:block">
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>

      {/* Right */}
      <div className="ml-auto flex items-center gap-2">
        {/* Notifications */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center text-[#888] transition-colors hover:bg-[#1c1b1b] hover:text-white"
        >
          <Bell size={18} />
        </button>

        {/* Theme */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center text-[#888] transition-colors hover:bg-[#1c1b1b] hover:text-white"
          title="Change theme"
        >
          <Moon size={18} />
        </button>

        {/* User */}
        <button
          type="button"
          className="flex items-center gap-2 px-2 py-1.5 transition-colors hover:bg-[#1c1b1b]"
        >
          <div className="flex h-8 w-8 items-center justify-center bg-white text-sm font-semibold text-black">
            D
          </div>

          <ChevronDown size={16} className="text-[#777]" />
        </button>
      </div>
    </header>
  );
}
