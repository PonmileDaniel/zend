import { useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Send,
} from "lucide-react";

type TransferProps = {
  recipientName: string;
  accountNumber: string;
};

type PreviousTransfer = {
  name: string;
  accountNumber: string;
  amount: string;
  type: "sent" | "received";
};

const previousTransfers: PreviousTransfer[] = [
  {
    name: "Daniel Ihenychukwu Ndukwe",
    accountNumber: "2919144394",
    amount: "₦50.00",
    type: "sent",
  },
  {
    name: "Daniel Ihenychukwu Ndukwe",
    accountNumber: "2919144394",
    amount: "₦150.00",
    type: "received",
  },
  {
    name: "MTN NIG VTU",
    accountNumber: "2349137158820",
    amount: "₦100.00",
    type: "sent",
  },
];

export default function SendMoneyForm({
  recipientName,
  accountNumber,
}: TransferProps) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;

    // Only allow numbers and decimal point
    if (!/^\d*\.?\d*$/.test(value)) {
      return;
    }

    setAmount(value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value.slice(0, 30));
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    console.log({
      recipientName,
      accountNumber,
      amount,
      description,
    });
  };

  return (
    <div className="space-y-8">

      {/* =========================================
          TRANSFER PANEL
      ========================================== */}

      <section className="border border-[#303030] bg-[#1A181A]">

        {/* Recipient */}
        <div className="border-b border-[#303030] px-5 py-5">

          <p className="text-xs uppercase tracking-[0.08em] text-[#777]">
            Send money to
          </p>

          <div className="mt-3">

            <p className="text-base font-semibold">
              {recipientName}
            </p>

            <p className="mt-1 font-mono text-sm text-[#777]">
              {accountNumber}
            </p>

          </div>

        </div>


        {/* Form */}
        <form onSubmit={handleSubmit}>

          {/* Amount */}
          <div className="border-b border-[#303030] px-5 py-6">

            <label
              htmlFor="amount"
              className="text-xs font-medium uppercase tracking-[0.08em] text-[#777]"
            >
              Amount
            </label>

            <div className="mt-3 flex items-center border-b border-[#404040] focus-within:border-white">

              <span className="mr-3 text-lg text-[#777]">
                ₦
              </span>

              <input
                id="amount"
                name="amount"
                type="text"
                inputMode="decimal"
                value={amount}
                onChange={handleAmountChange}
                placeholder="0.00"
                className="w-full bg-transparent py-3 text-3xl font-semibold text-white outline-none placeholder:text-[#444]"
              />

            </div>

          </div>


          {/* Description */}
          <div className="px-5 py-6">

            <div className="flex items-center justify-between">

              <label
                htmlFor="description"
                className="text-xs font-medium uppercase tracking-[0.08em] text-[#777]"
              >
                Description
              </label>

              <span className="text-[11px] text-[#666]">
                {description.length}/30
              </span>

            </div>

            <input
              id="description"
              name="description"
              type="text"
              maxLength={30}
              value={description}
              onChange={handleDescriptionChange}
              placeholder="What is this transfer for?"
              className="mt-3 w-full border-0 border-b border-[#303030] bg-transparent px-0 py-3 text-base text-white outline-none transition-colors placeholder:text-[#555] focus:border-white"
            />

          </div>


          {/* Send */}
          <div className="border-t border-[#303030] px-5 py-4">

            <button
              type="submit"
              disabled={!amount}
              className="flex w-full items-center justify-center gap-2 bg-white py-3.5 text-sm font-semibold text-black transition-colors hover:bg-[#d9d9d9] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Send size={16} />

              Send money
            </button>

          </div>

        </form>

      </section>


      {/* =========================================
          PREVIOUS TRANSFERS
      ========================================== */}

      <section>

        <div className="mb-3 flex items-center justify-between">

          <h2 className="text-sm font-semibold">
            Previous transfers
          </h2>

          <button
            type="button"
            className="text-xs font-medium text-[#999] transition-colors hover:text-white"
          >
            View more
          </button>

        </div>


        <div className="border border-[#262626] bg-[#1A181A]">

          {previousTransfers.map((transfer, index) => (
            <div
              key={`${transfer.accountNumber}-${index}`}
              className="flex items-center justify-between border-b border-[#262626] px-4 py-4 last:border-b-0"
            >

              {/* Left */}
              <div className="flex min-w-0 items-center gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#303030] bg-[#0A0A0A]">

                  {transfer.type === "received" ? (
                    <ArrowDownLeft
                      size={17}
                      className="text-[#35CF8A]"
                    />
                  ) : (
                    <ArrowUpRight
                      size={17}
                      className="text-[#aaa]"
                    />
                  )}

                </div>


                <div className="min-w-0">

                  <p className="truncate text-sm font-medium">
                    {transfer.name}
                  </p>

                  <p className="mt-1 font-mono text-xs text-[#666]">
                    {transfer.accountNumber}
                  </p>

                </div>

              </div>


              {/* Amount */}
              <div className="ml-4 shrink-0 text-right">

                <p
                  className={`text-sm font-semibold ${
                    transfer.type === "received"
                      ? "text-[#35CF8A]"
                      : "text-white"
                  }`}
                >
                  {transfer.type === "received" ? "+" : "-"}{" "}
                  {transfer.amount.replace("+ ", "")}
                </p>

              </div>

            </div>
          ))}

        </div>

      </section>

    </div>
  );
}