import {
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Home,
  PiggyBank,
  Settings,
  Send,
  TrendingUp,
  Wallet,
} from "lucide-react";

type SidebarProps = {
  isOpen: boolean;
  onToggle: () => void;
};

const navigationItems = [
  {
    label: "Home",
    icon: Home,
  },
  {
    label: "Send",
    icon: Send,
  },
  {
    label: "Save",
    icon: PiggyBank,
  },
  {
    label: "Borrow",
    icon: Wallet,
  },
  {
    label: "Invest",
    icon: TrendingUp,
  },
  {
    label: "Cards",
    icon: CreditCard,
  },
];

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  return (
    <aside
      className={`hidden shrink-0 border-r border-[#262626] bg-[#0A0A0A] transition-all duration-300 lg:flex lg:flex-col ${
        isOpen ? "w-[220px]" : "w-[72px]"
      }`}
    >
      {/* Logo */}
      <div
        className={`flex h-[72px] shrink-0 items-center border-b border-[#262626] ${
          isOpen ? "justify-start px-6" : "justify-center"
        }`}
      >
        <span
          className={`font-extrabold tracking-[-0.08em] transition-all duration-300 ${
            isOpen ? "text-3xl" : "text-xl"
          }`}
        >
          {isOpen ? "ZEND" : "Z"}
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        {navigationItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = index === 0;

          return (
            <button
              key={item.label}
              type="button"
              title={!isOpen ? item.label : undefined}
              className={`mb-1 flex w-full items-center transition-colors ${
                isOpen ? "gap-3 px-4" : "justify-center px-0"
              } ${
                isActive
                  ? "bg-white text-black"
                  : "text-[#8f8f8f] hover:bg-[#1c1b1b] hover:text-white"
              } h-11`}
            >
              <Icon size={18} strokeWidth={1.8} className="shrink-0" />

              {isOpen && (
                <span className="font-medium text-sm">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-[#262626] p-3">
        {/* Settings */}
        <button
          type="button"
          title={!isOpen ? "Settings" : undefined}
          className={`mb-1 flex h-11 w-full items-center text-sm text-[#8f8f8f] transition-colors hover:bg-[#1c1b1b] hover:text-white ${
            isOpen ? "gap-3 px-4" : "justify-center px-0"
          }`}
        >
          <Settings size={18} strokeWidth={1.8} className="shrink-0" />

          {isOpen && <span>Settings</span>}
        </button>

        {/* Collapse / Expand */}
        <button
          type="button"
          onClick={onToggle}
          title={isOpen ? "Collapse sidebar" : "Expand sidebar"}
          className={`flex h-11 w-full items-center text-[#777] transition-colors hover:bg-[#1c1b1b] hover:text-white ${
            isOpen ? "gap-3 px-4" : "justify-center px-0"
          }`}
        >
          {isOpen ? (
            <>
              <ChevronLeft size={18} strokeWidth={1.8} />

              <span className="text-sm">Collapse</span>
            </>
          ) : (
            <ChevronRight size={18} strokeWidth={1.8} />
          )}
        </button>
      </div>
    </aside>
  );
}
