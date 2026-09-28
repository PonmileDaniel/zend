import { useState } from "react";
import { setTransactionPin } from "../../services/dashboardApi";

interface SetTransactionPinModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function SetTransactionPinModal({
  onClose,
  onSuccess,
}: SetTransactionPinModalProps) {
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  function handlePinChange(value: string, setter: (value: string) => void) {
    if (!/^\d*$/.test(value)) {
      return;
    }
    if (value.length > 4) {
      return;
    }
    setter(value);
    setError("");
  }

  async function handleSubmit() {
    setError("");

    if (pin.length !== 4) {
      setError("Your PIN must contain 4 digits.");
      return;
    }

    if (confirmPin.length !== 4) {
      setError("Your PIN must contain 4 digits.");
      return;
    }

    if (pin !== confirmPin) {
      setError("PINs do not match.");
      return;
    }

    try {
      setIsSubmitting(true);
      await setTransactionPin({
        pin,
        confirmPin,
      });
      setSuccess(true);
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 800);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to set Transaction PIN",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isSubmitting) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-md border border-[#303030] bg-[#1A181A]">
        {/** HEADER */}
        <div className="flex items-start justify-between border-b border-[#303030] px-5 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.08em] text-[#777]">
              Security
            </p>
            <h2 className="mt-1 text-lg font-semibold text-white">
              Set transaction PIN
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="cursor-pointer text-xl leading-none text-[#777] transition-colors hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="px-5 py-6">
          <p className="text-sm leading-6 text-[#999]">
            Create a 4-digit PIN that you will use to authorize transfers.
          </p>

          <div className="mt-6">
            <label
              htmlFor="transaction-pin"
              className="mb-2 block text-xs font-medium text-[#aaa]"
            >
              Create PIN
            </label>
            <input
              type="password"
              id="transaction-pin"
              inputMode="numeric"
              autoComplete="new-password"
              maxLength={4}
              value={pin}
              onChange={(event) => handlePinChange(event.target.value, setPin)}
              placeholder="••••"
              className="w-full border border-[#404040] bg-[#0A0A0A] px-4 py-3 text-center text-xl tracking-[0.6em] text-white outline-none placeholder:text-[#555] focus:border-white"
            />
          </div>

          {/* CONFIRM PIN */}
          <div className="mt-4">
            <label
              htmlFor="confirm-transaction-pin"
              className="mb-2 block text-xs font-medium text-[#aaa]"
            >
              Confirm PIN
            </label>
            <input
              id="confirm-transaction-pin"
              type="password"
              inputMode="numeric"
              autoComplete="new-password"
              maxLength={4}
              value={confirmPin}
              onChange={(event) =>
                handlePinChange(event.target.value, setConfirmPin)
              }
              placeholder="••••"
              className="w-full border border-[#404040] bg-[#0A0A0A] px-4 py-3 text-center text-xl tracking-[0.6em] text-white outline-none placeholder:text-[#555] focus:border-white"
            />
          </div>

          {/*Error */}
          {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
          {/* Success */}
          {success && (
            <p className="mt-4 text-sm text-green-400">
              Transaction PIN created successfully.
            </p>
          )}
          <div className="mt-6 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="border border-[#404040] bg-[#0A0A0A] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#202020] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting || success}
              className="flex-1 bg-white px-5 py-3 text-sm font-semibold text-black transition-colors hover:bg-[#d9d9d9] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting
                ? "Setting PIN..."
                : success
                  ? "PIN created"
                  : "Set transaction PIN"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
