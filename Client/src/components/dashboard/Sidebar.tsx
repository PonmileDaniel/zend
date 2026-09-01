import {
  Home,
  Send,
  PiggyBank,
  Wallet,
  TrendingUp,
  CreditCard,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

type SidebarProps = {
  isOpen: boolean;
  onToggle: () => void;
  activeItem: string;
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

export default function Sidebar({
  isOpen,
  onToggle,
  activeItem,
}: SidebarProps) {
  return (
    <aside
      className={`hidden shrink-0 border-r border-[#262626] bg-[#0A0A0A] transition-all duration-300 lg:flex lg:flex-col ${
        isOpen ? "w-[220px]" : "w-[72px]"
      }`}
    >
      {/* Logo / Toggle */}
      <div
        className={`flex h-[72px] shrink-0 items-center border-b border-[#262626] ${
          isOpen ? "justify-between px-5" : "justify-center"
        }`}
      >
        {isOpen && (
          <span className="text-3xl font-extrabold tracking-[-0.08em]">
            ZEND
          </span>
        )}

        <button
          type="button"
          onClick={onToggle}
          className="flex h-9 w-9 items-center justify-center text-[#777] transition-colors hover:bg-[#1c1b1b] hover:text-white"
          aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isOpen ? (
            <PanelLeftClose size={18} />
          ) : (
            <PanelLeftOpen size={18} />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.label;

          return (
            <button
              key={item.label}
              type="button"
              title={!isOpen ? item.label : undefined}
              className={`mb-1 flex w-full items-center py-3 text-left text-sm transition-colors ${
                isOpen
                  ? "gap-3 px-4"
                  : "justify-center px-0"
              } ${
                isActive
                  ? "bg-white text-black"
                  : "text-[#8f8f8f] hover:bg-[#1c1b1b] hover:text-white"
              }`}
            >
              <Icon size={18} strokeWidth={1.8} />

              {isOpen && (
                <span className="font-medium">
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Settings */}
      <div className="border-t border-[#262626] p-3">
        <button
          type="button"
          title={!isOpen ? "Settings" : undefined}
          className={`flex w-full items-center py-3 text-sm text-[#8f8f8f] transition-colors hover:bg-[#1c1b1b] hover:text-white ${
            isOpen
              ? "gap-3 px-4"
              : "justify-center px-0"
          }`}
        >
          <Settings size={18} />

          {isOpen && <span>Settings</span>}
        </button>
      </div>
    </aside>
  );
}