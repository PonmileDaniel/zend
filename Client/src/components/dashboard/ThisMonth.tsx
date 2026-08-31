import { BarChart3 } from "lucide-react";

export default function ThisMonth() {
  return (
    <section className="mt-6 border border-[#262626] bg-[#1A181A] p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.08em] text-[#666]">
          This month
        </p>

        <BarChart3
          size={17}
          className="text-[#777]"
        />
      </div>

      <p className="mt-4 text-2xl font-semibold">
        ₦12,450.00
      </p>

      <p className="mt-1 text-xs text-[#666]">
        Total spending
      </p>

      <div className="mt-5 h-px bg-[#303030]" />

      <div className="mt-4 flex items-center justify-between text-xs">
        <span className="text-[#777]">
          Compared to last month
        </span>

        <span className="text-[#35CF8A]">
          +8.4%
        </span>
      </div>
    </section>
  );
}