import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
// import { string } from "zod";

export type TransactionData = {
  name: string;
  description: string;
  amount: string;
  type: "credit" | "debit";
  timestamp: string;
};

type TransactionProps = {
  transaction: TransactionData;
};

function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export default function Transaction({ transaction }: TransactionProps) {
  const isCredit = transaction.type === "credit";
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

          {/* <p className="mt-1 text-xs text-[#666]">{transaction.description}</p> */}
          {/* </div> */}

          <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-[#666]">
            <span>{transaction.description}</span>
            <span>.</span>
            <span>{formatTimestamp(transaction.timestamp)}</span>

            {/* <p className="mt-1 text-xs text-[#666]">{transaction.description}</p> */}
          </div>
        </div>
      </div>


      {/* Right */}
      <div className="ml-4 shrink-0 text-right">
        <p
          className={`text-sm font-semibold ${
           isCredit ? "text-[#35CF8A]" : "text-white"
          }`}
        >
          {isCredit ? "+" : "−"}{transaction.amount}
        </p>

        <p className="mt-1 text-[10px] uppercase tracking-[0.05em] text-[#666]">
          Completed
        </p>
      </div>
    </div>
  );
}
