import { Check, X } from "lucide-react";

type TransferResultModalProps = {
  isOpen: boolean;
  status: "success" | "failed";
  onClose: () => void;
  recipientName: string;
  amount: string;
  description: string;
};

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * A modal component that displays a transfer result.
 *
 * It takes in the following props:
 * - `isOpen`: A boolean indicating whether the modal should be open or not.
 * - `status`: A string indicating whether the transfer was successful or not.
 * - `onClose`: A function to be called when the modal is closed.

/*******  c7189808-342c-41f6-b9ec-7d4a31073610  *******/
export default function TransferResultModal({
  isOpen,
  status,
  onClose,
  recipientName,
  amount,
  description,
}: TransferResultModalProps) {
  if (!isOpen) {
    return null;
  }

  const isSuccess = status === "success";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-[4px]"
        onClick={onClose}
      />

      {/* Modal */}
      <section className="relative z-10 w-[calc(100%-2rem)] max-w-md border border-[#383638] bg-[#1A181A] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#383638] px-5 py-4">
          <h2 className="text-base font-semibold">
            {isSuccess ? "Transfer successful" : "Transfer failed"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center text-[#777] transition-colors hover:bg-[#292729] hover:text-white"
            aria-label="Close"
          >
            <X size={17} />
          </button>
        </div>

        {/* Content */}
        <div className="px-5 py-7">
          {/* Result Icon */}
          <div className="flex justify-center">
            <div
              className={`flex h-16 w-16 items-center justify-center rounded-full border ${
                isSuccess
                  ? "border-[#35CF8A]/30 bg-[#35CF8A]/10"
                  : "border-[#ef4444]/30 bg-[#ef4444]/10"
              }`}
            >
              {isSuccess ? (
                <div className="animate-[successIcon_0.45s_ease-out]">
                  <Check
                    size={32}
                    strokeWidth={2.5}
                    className="text-[#35CF8A]"
                  />
                </div>
              ) : (
                <div className="animate-[failedIcon_0.45s_ease-out]">
                  <X size={32} strokeWidth={2.5} className="text-[#ef4444]" />
                </div>
              )}
            </div>
          </div>

          {/* Result Message */}
          <div className="mt-5 text-center">
            <h3 className="text-xl font-semibold">
              {isSuccess
                ? "Money sent successfully"
                : "We couldn't complete the transfer"}
            </h3>

            <p className="mt-2 text-sm text-[#777]">
              {isSuccess
                ? `Your transfer to ${recipientName} has been completed.`
                : "Something went wrong while processing your transfer. Your account has not been charged."}
            </p>
          </div>

          {/* Transfer Details */}
          <div className="mt-6 bg-[#242224] px-4 py-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#999]">Recipient</span>

              <span className="max-w-[210px] truncate text-sm font-medium">
                {recipientName}
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm text-[#999]">Amount</span>

              <span className="text-sm font-semibold">₦{amount}</span>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm text-[#999]">Transaction Fee</span>

              <span className="text-sm font-medium">₦0.00</span>
            </div>

            <div className="mt-3 flex items-center justify-between gap-4">
              <span className="text-sm text-[#999]">Description</span>

              <span className="max-w-[210px] truncate text-sm font-medium">
                {description || "—"}
              </span>
            </div>
          </div>

          {/* Bottom Action */}
          <button
            type="button"
            onClick={onClose}
            className="mt-7 w-full bg-white py-3.5 text-sm font-semibold text-black transition-colors hover:bg-[#d9d9d9]"
          >
            {isSuccess ? "Done" : "Close"}
          </button>
        </div>
      </section>
    </div>
  );
}
