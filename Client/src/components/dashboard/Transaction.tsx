import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

export type TransactionData = {
  name: string;
  description: string;
  amount: string;
  type: "credit" | "debit";
};

type TransactionProps = {
  transaction: TransactionData;
};

export default function Transaction({ transaction }: TransactionProps) {
  return (
    <div className="flex items-center justify-between border-b border-[#262626] px-4 py-4 last:border-b-0">
      {/* Left */}
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#303030] bg-[#0A0A0A]">
          {transaction.type === "credit" ? (
            <ArrowDownLeft size={17} className="text-[#35CF8A]" />
          ) : (
            <ArrowUpRight size={17} className="text-[#aaa]" />
          )}
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{transaction.name}</p>

          <p className="mt-1 text-xs text-[#666]">{transaction.description}</p>
        </div>
      </div>

      {/* Right */}
      <div className="ml-4 shrink-0 text-right">
        <p
          className={`text-sm font-semibold ${
            transaction.type === "credit" ? "text-[#35CF8A]" : "text-white"
          }`}
        >
          {transaction.amount}
        </p>

        <p className="mt-1 text-[10px] uppercase tracking-[0.05em] text-[#666]">
          Completed
        </p>
      </div>
    </div>
  );
}
