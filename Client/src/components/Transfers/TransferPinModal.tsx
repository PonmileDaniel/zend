import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

type TransferPinModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;

  recipientName: string;
  amount: string;
  description: string;
};

export default function TransferPinModal({
  isOpen,
  onClose,
  onConfirm,
  // onFailed,
  recipientName,
  amount,
  description,
}: TransferPinModalProps) {
  const [pin, setPin] = useState<string[]>([
    "",
    "",
    "",
    "",
  ]);

  const inputRefs = useRef<
    (HTMLInputElement | null)[]
  >([]);


  /*
   * Focus first PIN input
   */
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const timer = setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 100);

    return () => clearTimeout(timer);
  }, [isOpen]);


  /*
   * Close modal
   */
  const handleClose = () => {
    setPin(["", "", "", ""]);
    onClose();
  };


  /*
   * PIN input
   */
  const handlePinChange = (
    index: number,
    value: string,
  ) => {
    const numericValue = value.replace(/\D/g, "");

    if (!numericValue) {
      const updatedPin = [...pin];

      updatedPin[index] = "";

      setPin(updatedPin);

      return;
    }

    const updatedPin = [...pin];

    updatedPin[index] =
      numericValue.slice(-1);

    setPin(updatedPin);


    /*
     * Move to next box
     */
    if (index < pin.length - 1) {
      inputRefs.current[
        index + 1
      ]?.focus();
    }
  };


  /*
   * Keyboard navigation
   */
  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {

    /*
     * Backspace
     */
    if (
      event.key === "Backspace" &&
      !pin[index] &&
      index > 0
    ) {
      inputRefs.current[
        index - 1
      ]?.focus();
    }


    /*
     * Arrow left
     */
    if (
      event.key === "ArrowLeft" &&
      index > 0
    ) {
      inputRefs.current[
        index - 1
      ]?.focus();
    }


    /*
     * Arrow right
     */
    if (
      event.key === "ArrowRight" &&
      index < pin.length - 1
    ) {
      inputRefs.current[
        index + 1
      ]?.focus();
    }
  };


  /*
   * Confirm transfer
   */
  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const enteredPin = pin.join("");

    if (enteredPin.length !== 4) {
      return;
    }

    // console.log({
    //   recipientName,
    //   amount,
    //   description,
    //   pin: enteredPin,
    // });

    /*
     * Later:
     *
     * POST /api/transfers
     *
     * {
     *   accountNumber,
     *   amount,
     *   description,
     *   pin
     * }
     *
     * For now we just log it.
     */
    onConfirm();
  };


  if (!isOpen) {
    return null;
  }


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* BACKDROP */}

      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-[3px]"
        onClick={handleClose}
      />


      {/* MODAL */}

      <section className="relative z-10 w-[calc(100%-2rem)] max-w-md border border-[#383638] bg-[#1A181A] shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-[#383638] px-5 py-4">

          <h2 className="text-base font-semibold">
            Confirm
          </h2>

          <button
            type="button"
            onClick={handleClose}
            className="flex h-8 w-8 items-center justify-center text-[#777] transition-colors hover:bg-[#292729] hover:text-white"
            aria-label="Close"
          >
            <X size={17} />
          </button>

        </div>


        {/* Content */}

        <div className="px-5 py-6">

          {/* Recipient */}

          <div className="text-center">

            <p className="text-xs text-[#777]">
              To:
            </p>

            <h3 className="mt-2 text-lg font-semibold">
              {recipientName}
            </h3>

          </div>


          {/* Amount */}

          <div className="mt-6 text-center">

            <p className="text-xs text-[#777]">
              Amount
            </p>

            <p className="mt-1 text-2xl font-semibold">
              ₦{amount}
            </p>

          </div>


          {/* Transfer Details */}

          <div className="mt-6 bg-[#242224] px-4 py-4">

            <div className="flex items-center justify-between">

              <span className="text-sm text-[#999]">
                From
              </span>

              <span className="text-sm font-medium">
                NGN balance
              </span>

            </div>


            <div className="mt-3 flex items-center justify-between">

              <span className="text-sm text-[#999]">
                Transaction Fee
              </span>

              <span className="text-sm font-medium">
                ₦0.00
              </span>

            </div>


            <div className="mt-3 flex items-center justify-between gap-4">

              <span className="text-sm text-[#999]">
                Description
              </span>

              <span className="max-w-[200px] truncate text-sm font-medium">
                {description || "—"}
              </span>

            </div>

          </div>


          {/* PIN */}

          <form onSubmit={handleSubmit}>

            <div className="mt-7">

              <p className="text-center text-sm font-medium">
                Please, type in your transaction PIN
              </p>


              <div className="mt-4 flex justify-center gap-2">

                {pin.map((digit, index) => (
                  <input
                    key={index}
                    ref={(element) => {
                      inputRefs.current[index] =
                        element;
                    }}
                    type="password"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(event) =>
                      handlePinChange(
                        index,
                        event.target.value,
                      )
                    }
                    onKeyDown={(event) =>
                      handleKeyDown(
                        index,
                        event,
                      )
                    }
                    aria-label={`PIN digit ${
                      index + 1
                    }`}
                    className="h-12 w-12 border border-[#303030] bg-[#242224] text-center text-lg font-semibold text-white outline-none transition-colors focus:border-white"
                  />
                ))}

              </div>

            </div>


            {/* Confirm */}

            <button
              type="submit"
              disabled={
                pin.join("").length !== 4
              }
              className="mt-7 w-full bg-white py-3.5 text-sm font-semibold text-black transition-colors hover:bg-[#d9d9d9] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Send money
            </button>

          </form>

        </div>

      </section>

    </div>
  );
}