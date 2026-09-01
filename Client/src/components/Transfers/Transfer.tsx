import { useState } from "react";
import { ArrowRight, Clock3 } from "lucide-react";

type RecentTransfer = {
  name: string;
  accountNumber: string;
};

const recentTransfers: RecentTransfer[] = [
  {
    name: "Daniel Ihenychukwu Ndukwe",
    accountNumber: "2919144394",
  },
  {
    name: "John Doe",
    accountNumber: "1029384756",
  },
  {
    name: "Jane Smith",
    accountNumber: "3847562910",
  },
];

export default function Transfer() {
  const [accountNumber, setAccountNumber] = useState("");

  const isValidAccountNumber = accountNumber.length === 10;

  // Temporary mock recipient.
  // Later this will come from the backend.
  const recipientName = isValidAccountNumber
    ? "Daniel Ihenychukwu Ndukwe"
    : "";

  const handleAccountNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value.replace(/\D/g, "");

    // Account numbers are exactly 10 digits.
    setAccountNumber(value.slice(0, 10));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValidAccountNumber) {
      return;
    }

    console.log("Transfer to:", {
      accountNumber,
      recipientName,
    });
  };

  return (
    <div className="space-y-8">

      {/* =====================================================
          TRANSFER FORM
      ====================================================== */}

      <section className="border border-[#303030] bg-[#1A181A]">

        {/* Header */}
        <div className="border-b border-[#303030] px-5 py-5">
          <h1 className="text-2xl font-semibold tracking-tight">
            Transfer money
          </h1>

          <p className="mt-2 text-sm text-[#777]">
            Enter the account number of the person you want to send money to.
          </p>
        </div>


        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="px-5 py-6"
        >

          {/* Account Number */}
          <div className="flex flex-col gap-2">

            <label
              htmlFor="accountNumber"
              className="text-xs font-medium uppercase tracking-[0.08em] text-[#a3a3a3]"
            >
              Account number
            </label>

            <input
              id="accountNumber"
              name="accountNumber"
              type="text"
              inputMode="numeric"
              maxLength={10}
              value={accountNumber}
              onChange={handleAccountNumberChange}
              placeholder="Enter 10-digit account number"
              className="w-full border-0 border-b border-[#303030] bg-[#0A0A0A] px-0 py-3 text-base text-white outline-none transition-colors placeholder:text-[#555] focus:border-white"
            />

            <div className="mt-1 flex justify-end">
              <span className="text-[11px] text-[#555]">
                {accountNumber.length}/10
              </span>
            </div>

          </div>


          {/* Recipient */}
          {isValidAccountNumber && (
            <div className="mt-6 border border-[#303030] bg-[#0A0A0A] px-4 py-4">

              <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-[#666]">
                Recipient
              </p>

              <p className="mt-2 text-sm font-medium text-white">
                {recipientName}
              </p>

              <p className="mt-1 font-mono text-xs text-[#777]">
                {accountNumber}
              </p>

            </div>
          )}


          {/* Next */}
          <button
            type="submit"
            disabled={!isValidAccountNumber}
            className={`mt-7 flex w-full items-center justify-center gap-2 py-3.5 text-sm font-semibold transition-colors ${
              isValidAccountNumber
                ? "bg-white text-black hover:bg-[#d9d9d9]"
                : "cursor-not-allowed bg-[#292929] text-[#666]"
            }`}
          >
            Next

            <ArrowRight size={16} />
          </button>

        </form>

      </section>


      {/* =====================================================
          RECENT TRANSFERS
      ====================================================== */}

      <section>

        {/* Section heading */}
        <div className="mb-3 flex items-center justify-between">

          <div>
            <h2 className="text-sm font-semibold">
              Recent transfers
            </h2>

            <p className="mt-1 text-xs text-[#666]">
              People you've recently sent money to.
            </p>
          </div>

          <button
            type="button"
            className="text-xs font-medium text-[#999] transition-colors hover:text-white"
          >
            View more
          </button>

        </div>


        {/* Transfers */}
        <div className="border border-[#262626] bg-[#1A181A]">

          {recentTransfers.map((transfer, index) => (
            <button
              key={`${transfer.accountNumber}-${index}`}
              type="button"
              className="flex w-full items-center justify-between border-b border-[#262626] px-4 py-4 text-left last:border-b-0 transition-colors hover:bg-[#202020]"
            >

              {/* Left */}
              <div className="flex min-w-0 items-center gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#303030] bg-[#0A0A0A]">
                  <span className="text-sm font-semibold text-white">
                    {transfer.name.charAt(0)}
                  </span>
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


              {/* Right */}
              <div className="ml-4 flex shrink-0 items-center gap-3">

                <Clock3
                  size={15}
                  className="hidden text-[#555] sm:block"
                />

                <ArrowRight
                  size={16}
                  className="text-[#666]"
                />

              </div>

            </button>
          ))}

        </div>

      </section>

    </div>
  );
}