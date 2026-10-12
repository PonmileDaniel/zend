import { useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Check,
  Clipboard,
  Clock3,
  X,
  XCircle,
} from "lucide-react";
import type { TransactionData } from "./Transaction";

type TransactionReceiptProps = {
  transaction: TransactionData;
  onClose: () => void;
};

function formatReceiptDate(timestamp: string): string {
  const date = new Date(timestamp);

  if (Number.isNaN(date.getTime())) {
    return "Date unavailable";
  }

  return date.toLocaleString("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function formatStatus(status: string): string {
  switch (status.toUpperCase()) {
    case "SUCCESS":
    case "SUCCESSFUL":
      return "Successful";
    case "PENDING":
      return "Pending";
    case "FAILED":
      return "Failed";
    default:
      return status;
  }
}

export default function TransactionReceipt({
  transaction,
  onClose,
}: TransactionReceiptProps) {
  const [copied, setCopied] = useState(false);

  const isCredit = transaction.type === "credit";
  const normalizedStatus = transaction.status.toUpperCase();
  const isSuccessful =
    normalizedStatus === "SUCCESS" || normalizedStatus === "SUCCESSFUL";
  const isPending = normalizedStatus === "PENDING";
  const isFailed = normalizedStatus === "FAILED";

  async function copyReference() {
    try {
      await navigator.clipboard.writeText(transaction.reference);
      setCopied(true);
    } catch (error) {
      console.error("Unable to copy transaction reference:", error);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="transaction-receipt-title"
        className="my-auto w-full max-w-lg border border-[#333] bg-[#171617] text-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#303030] px-5 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.12em] text-[#777]">
              Zend
            </p>
            <h2
              id="transaction-receipt-title"
              className="mt-1 text-lg font-semibold"
            >
              Transaction receipt
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close transaction receipt"
            className="flex h-9 w-9 cursor-pointer items-center justify-center border border-[#333] text-[#aaa] transition-colors hover:bg-[#292729] hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Receipt summary */}
        <div className="px-5 py-8 text-center">
          <div
            className={`mx-auto flex h-12 w-12 items-center justify-center border ${
              isSuccessful
                ? "border-[#24563f] bg-[#12281d] text-[#35CF8A]"
                : isPending
                  ? "border-[#655125] bg-[#2b2415] text-[#e7bd63]"
                  : isFailed
                    ? "border-[#642d2d] bg-[#301919] text-[#ff7777]"
                    : "border-[#333] bg-[#222] text-[#bbb]"
            }`}
          >
            {isSuccessful ? (
              <Check size={23} />
            ) : isPending ? (
              <Clock3 size={23} />
            ) : isFailed ? (
              <XCircle size={23} />
            ) : (
              <Clipboard size={23} />
            )}
          </div>

          <p
            className={`mt-4 text-sm font-medium ${
              isSuccessful
                ? "text-[#35CF8A]"
                : isPending
                  ? "text-[#e7bd63]"
                  : isFailed
                    ? "text-[#ff7777]"
                    : "text-[#aaa]"
            }`}
          >
            {formatStatus(transaction.status)}
          </p>

          <p className="mt-3 text-3xl font-semibold tracking-tight">
            {isCredit ? "+" : "−"}₦{transaction.amount}
          </p>

          <p className="mt-2 text-sm text-[#888]">
            {isCredit ? "Money received" : "Money sent"}
          </p>
        </div>

        {/* Receipt details */}
        <div className="mx-5 border-t border-dashed border-[#454045]" />

        <div className="space-y-5 px-5 py-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#333] bg-[#0d0d0d]">
              {isCredit ? (
                <ArrowDownLeft size={18} className="text-[#35CF8A]" />
              ) : (
                <ArrowUpRight size={18} className="text-[#aaa]" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs text-[#777]">
                {isCredit ? "Received from" : "Sent to"}
              </p>
              <p className="mt-1 break-words text-sm font-medium">
                {transaction.name}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <span className="text-sm text-[#888]">Transaction type</span>
              <span className="text-right text-sm">
                {transaction.transactionType}
              </span>
            </div>

            <div className="flex items-start justify-between gap-4">
              <span className="text-sm text-[#888]">Description</span>
              <span className="max-w-[60%] break-words text-right text-sm">
                {transaction.description || "Not provided"}
              </span>
            </div>

            <div className="flex items-start justify-between gap-4">
              <span className="text-sm text-[#888]">Date and time</span>
              <span className="max-w-[65%] text-right text-sm">
                {formatReceiptDate(transaction.timestamp)}
              </span>
            </div>

            <div className="flex items-start justify-between gap-4">
              <span className="text-sm text-[#888]">Status</span>
              <span className="text-right text-sm">
                {formatStatus(transaction.status)}
              </span>
            </div>
          </div>
        </div>

        {/* Transaction reference */}
        <div className="mx-5 border-t border-dashed border-[#454045]" />

        <div className="px-5 py-5">
          <p className="text-xs text-[#777]">Transaction reference</p>

          <div className="mt-2 flex items-start gap-3">
            <p className="min-w-0 flex-1 break-all font-mono text-xs leading-5 text-[#ddd]">
              {transaction.reference}
            </p>

            <button
              type="button"
              onClick={copyReference}
              aria-label="Copy transaction reference"
              className="flex shrink-0 cursor-pointer items-center gap-1.5 border border-[#393939] px-3 py-2 text-xs text-[#ccc] transition-colors hover:bg-[#292729] hover:text-white"
            >
              {copied ? <Check size={14} /> : <Clipboard size={14} />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#303030] px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full cursor-pointer bg-white px-4 py-3 text-sm font-semibold text-black transition-colors hover:bg-[#ddd]"
          >
            Done
          </button>

          <p className="mt-3 text-center text-[11px] text-[#666]">
            Zend · Transaction record
          </p>
        </div>
      </section>
    </div>
  );
}
