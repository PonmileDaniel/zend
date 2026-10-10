import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

export type TransactionData = {
  reference: string;
  name: string;
  description: string;
  transactionType: string;
  amount: string;
  type: "credit" | "debit";
  status: string;
  timestamp: string;
};

type TransactionProps = {
  transaction: TransactionData;
  onClick: () => void;
};

function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleString("en-NG", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export default function Transaction({
  transaction,
  onClick,
}: TransactionProps) {
  const isCredit = transaction.type === "credit";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`View receipt for ${transaction.transactionType}`}
      className="flex w-full cursor-pointer items-center justify-between border-b border-[#262626] px-4 py-4 text-left transition-colors hover:bg-[#222022] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white last:border-b-0"
    >
      {/* Left: Icon, name, type and timestamp */}
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#303030] bg-[#0A0A0A]">
          {isCredit ? (
            <ArrowDownLeft size={17} className="text-[#35CF8A]" />
          ) : (
            <ArrowUpRight size={17} className="text-[#aaa]" />
          )}
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-medium">
            {transaction.name}
          </p>

          <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-[#666]">
            <span>{formatTimestamp(transaction.timestamp)}</span>
          </div>
        </div>
      </div>

      {/* Right: Amount and status */}
      <div className="ml-4 shrink-0 text-right">
        <p
          className={`text-sm font-semibold ${
            isCredit ? "text-[#35CF8A]" : "text-white"
          }`}
        >
          {isCredit ? "+" : "−"}{transaction.amount}
        </p>

        <p className="mt-1 text-[10px] uppercase tracking-[0.05em] text-[#666]">
          {transaction.status}
        </p>
      </div>
    </button>
  );
}