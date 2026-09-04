import { Check, ArrowRight } from "lucide-react";

type TransferSuccessProps = {
  recipientName: string;
  accountNumber: string;
  amount: string;
  onDone: () => void;
};

export default function TransferSuccess({
  recipientName,
  accountNumber,
  amount,
  onDone,
}: TransferSuccessProps) {
  return (
    <section className="border border-[#303030] bg-[#1A181A]">
      <div className="px-5 py-10 text-center">
        {/* Success Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#35CF8A]/30 bg-[#35CF8A]/10">
          <Check size={30} className="text-[#35CF8A]" strokeWidth={2.5} />
        </div>

        {/* Title */}
        <h1 className="mt-6 text-2xl font-semibold tracking-tight">
          Transfer successful
        </h1>

        <p className="mt-2 text-sm text-[#777]">
          Your money has been sent successfully.
        </p>

        {/* Amount */}
        <div className="mt-8">
          <p className="text-xs uppercase tracking-[0.08em] text-[#777]">
            Amount sent
          </p>

          <p className="mt-2 text-4xl font-semibold tracking-tight">
            ₦{amount}
          </p>
        </div>

        {/* Recipient */}
        <div className="mx-auto mt-8 max-w-md border border-[#303030] bg-[#242224] px-5 py-5 text-left">
          <p className="text-xs uppercase tracking-[0.08em] text-[#777]">
            Sent to
          </p>

          <p className="mt-2 text-sm font-semibold">
            {recipientName}
          </p>

          <p className="mt-1 font-mono text-sm text-[#666]">
            {accountNumber}
          </p>
        </div>
      </div>

      {/* Done */}
      <div className="border-t border-[#303030] px-5 py-4">
        <button
          type="button"
          onClick={onDone}
          className="flex w-full items-center justify-center gap-2 bg-white py-3.5 text-sm font-semibold text-black transition-colors hover:bg-[#d9d9d9]"
        >
          Done
          <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}