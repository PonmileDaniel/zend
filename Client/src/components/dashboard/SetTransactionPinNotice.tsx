import { useState } from "react";
import SetTransactionPinModal from "./SetTransactionPinModal";

interface SetTransactionPinNoticeProps {
  onSuccess: () => void;
}

export default function SetTransactionPinNotice({
  onSuccess,
}: SetTransactionPinNoticeProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="border border-[#303030] bg-[#1A181A]">
        <div className="px-5 py-5">
          <p className="text-xs uppercase tracking-[0.08em] text-[#777]">
            Security
          </p>

          <h2 className="mt-2 text-base font-semibold text-white">
            Set your transaction PIN
          </h2>

          <p className="mt-2 max-w-xl text-sm leading-6 text-[#999]">
            A 4-digit PIN is required to authorize transfers from your account.
          </p>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="mt-5 cursor-pointer bg-white px-5 py-3 text-sm font-semibold text-black transition-colors hover:bg-[#d9d9d9]"
          >
            Set PIN
          </button>
        </div>
      </section>
      {isModalOpen && (
        <SetTransactionPinModal
          onClose={() => setIsModalOpen(false)}
          onSuccess={onSuccess}
        />
      )}
    </>
  );
}
