import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

type MobileBackButtonProps = {
  to?: string;
};

export default function MobileBackButton({
  to = "/dashboard",
}: MobileBackButtonProps) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(to)}
      aria-label="Back to dashboard"
      className="flex h-10 w-10 shrink-0 items-center justify-center text-[#999] transition-colors hover:text-white lg:hidden"
    >
      <ArrowLeft size={20} />
    </button>
  );
}