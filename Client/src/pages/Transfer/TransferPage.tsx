import { useState } from "react";

import Sidebar from "../../components/dashboard/Sidebar";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import ThisMonth from "../../components/dashboard/ThisMonth";

import Transfer from "../../components/Transfers/Transfer";
import SendMoneyForm from "../../components/Transfers/SendMoneyForm";
import TransferPinModal from "../../components/Transfers/TransferPinModal";
import TransferResultModal from "../../components/Transfers/TransferResultModal";

import {
  getRecipient,
  transferMoney,
  type RecipientResponse,
} from "../../services/transferApi";

type TransferStep = "recipient" | "amount";

export default function TransferPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [transferError, setTransferError] = useState("");

  // -----------------------------
  // Recipient lookup state
  // -----------------------------

  const [accountNumber, setAccountNumber] = useState("");

  const [recipient, setRecipient] =
    useState<RecipientResponse | null>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  // -----------------------------
  // Transfer step
  // -----------------------------

  const [step, setStep] =
    useState<TransferStep>("recipient");

  // -----------------------------
  // PIN modal
  // -----------------------------

  const [isPinModalOpen, setIsPinModalOpen] =
    useState(false);

  // -----------------------------
  // Result modal
  // -----------------------------

  const [isResultModalOpen, setIsResultModalOpen] =
    useState(false);

  const [transferStatus, setTransferStatus] =
    useState<"success" | "failed">("success");

  // -----------------------------
  // Transfer data
  // -----------------------------

  const [transferData, setTransferData] = useState({
    recipientName: "",
    accountNumber: "",
    amount: "",
    description: "",
  });

  // =========================================
  // RECIPIENT LOOKUP
  // =========================================

  async function handleRecipientLookup(value: string) {
    if (value.length !== 10) {
      return;
    }

    setLoading(true);
    setError("");
    setRecipient(null);

    try {
      const data = await getRecipient(value);

      setRecipient(data);
    } catch {
      setError("Account not found");
    } finally {
      setLoading(false);
    }
  }

  // =========================================
  // ACCOUNT NUMBER CHANGE
  // =========================================

  function handleAccountNumberChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const value = event.target.value.replace(/\D/g, "");

    if (value.length <= 10) {
      setAccountNumber(value);

      setRecipient(null);
      setError("");

      if (value.length === 10) {
        handleRecipientLookup(value);
      }
    }
  }

  // =========================================
  // NEXT BUTTON
  // =========================================

  function handleContinue() {
    if (!recipient || accountNumber.length !== 10) {
      return;
    }

    setStep("amount");
  }

  // =========================================
  // AMOUNT FORM SUBMITTED
  // =========================================

  function handleSendMoney({
    recipientName,
    amount,
    description,
  }: {
    recipientName: string;
    amount: string;
    description: string;
  }) {
    setTransferData({
      recipientName,
      accountNumber,
      amount,
      description,
    });

    setIsPinModalOpen(true);
  }

  // =========================================
  // PIN CONFIRMED
  // =========================================

  async function handlePinConfirm(pin: string) {
    setTransferError("");
    try {
      await transferMoney({
        to: transferData.accountNumber,
        amount: Number(transferData.amount),
        description: transferData.description,
        pin,
      });

      // Backend accepted the transfer
      setTransferStatus("success");

      setIsPinModalOpen(false);
      setIsResultModalOpen(true);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Transfer failed";
      setTransferError(message)
      setTransferStatus("failed");

      setIsPinModalOpen(false);
      setIsResultModalOpen(true);
    }
  }

  // =========================================
  // RESULT MODAL CLOSED
  // =========================================

  function handleResultClose() {
    setIsResultModalOpen(false);

    // After a successful transfer,
    // return to the recipient screen.
    if (transferStatus === "success") {
      setStep("recipient");

      setAccountNumber("");
      setRecipient(null);
      setError("");

      setTransferData({
        recipientName: "",
        accountNumber: "",
        amount: "",
        description: "",
      });
    }
  }

  return (
    <main className="min-h-screen bg-[#131313] text-white">
      <div className="flex min-h-screen">

        {/* SIDEBAR */}

        <Sidebar
          isOpen={isSidebarOpen}
          onToggle={() =>
            setIsSidebarOpen((previous) => !previous)
          }
          activeItem="Send"
        />

        {/* MAIN */}

        <div className="flex min-w-0 flex-1 flex-col">

          {/* HEADER */}

          <DashboardHeader title="Send" />

          {/* CONTENT */}

          <div className="flex-1 overflow-y-auto">
            <div className="mx-auto w-full max-w-[1250px] px-5 py-6 lg:px-8 lg:py-8">

              <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">

                {/* LEFT */}

                <div className="min-w-0">

                  {/* STEP 1 */}

                  {step === "recipient" && (
                    <Transfer
                      accountNumber={accountNumber}
                      recipient={recipient}
                      loading={loading}
                      error={error}
                      onAccountNumberChange={
                        handleAccountNumberChange
                      }
                      onContinue={handleContinue}
                    />
                  )}

                  {/* STEP 2 */}

                  {step === "amount" && recipient && (
                    <div>
                      <button
                        type="button"
                        onClick={() => setStep("recipient")}
                        className="mb-5 text-sm text-[#777] transition-colors hover:text-white"
                      >
                        ← Back
                      </button>

                      <div className="mb-6">
                        <h1 className="text-2xl font-semibold tracking-tight">
                          Send money
                        </h1>

                        <p className="mt-2 text-sm text-[#777]">
                          Transfer money securely to your recipient.
                        </p>
                      </div>

                      <SendMoneyForm
                        recipientName={`${recipient.firstName} ${recipient.lastName}`}
                        accountNumber={accountNumber}
                        onSend={handleSendMoney}
                      />
                    </div>
                  )}

                </div>

                {/* RIGHT */}

                <aside className="hidden xl:block">
                  <ThisMonth />
                </aside>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PIN MODAL */}

      <TransferPinModal
        isOpen={isPinModalOpen}
        onClose={() => setIsPinModalOpen(false)}
        recipientName={transferData.recipientName}
        amount={transferData.amount}
        description={transferData.description}
        onConfirm={handlePinConfirm}
      />

      {/* RESULT MODAL */}

      <TransferResultModal
        isOpen={isResultModalOpen}
        status={transferStatus}
        onClose={handleResultClose}
        recipientName={transferData.recipientName}
        amount={transferData.amount}
        description={transferData.description}
        errorMessage={transferError}
      />

    </main>
  );
}