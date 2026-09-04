import { useState } from "react";

import Sidebar from "../../components/dashboard/Sidebar";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import ThisMonth from "../../components/dashboard/ThisMonth";
import SendMoneyForm from "../../components/Transfers/SendMoneyForm";
import TransferPinModal from "../../components/Transfers/TransferPinModal";
import TransferResultModal from "../../components/Transfers/TransferResultModal";

export default function SendMoney() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [isPinModalOpen, setIsPinModalOpen] = useState(false);

  const [isResultModalOpen, setIsResultModalOpen] = useState(false);

  const [transferStatus, setTransferStatus] = useState<
    "success" | "failed"
  >("success");

  const [transferData, setTransferData] = useState({
    recipientName: "",
    amount: "",
    description: "",
  });

  const handleSendMoney = ({
    recipientName,
    amount,
    description,
  }: {
    recipientName: string;
    amount: string;
    description: string;
  }) => {
    setTransferData({
      recipientName,
      amount,
      description,
    });

    setIsPinModalOpen(true);
  };

  const handlePinConfirm = () => {
    setIsPinModalOpen(false);

    /*
     * Temporary simulation.
     *
     * Later this is where the backend response
     * will determine success or failure.
     */

    const successful = true;

    setTransferStatus(successful ? "success" : "failed");

    setIsResultModalOpen(true);
  };

  const handleResultClose = () => {
    setIsResultModalOpen(false);
  };

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
                  {/* PAGE HEADING */}

                  <div className="mb-6">
                    <h1 className="text-2xl font-semibold tracking-tight">
                      Send money
                    </h1>

                    <p className="mt-2 text-sm text-[#777]">
                      Transfer money securely to your recipient.
                    </p>
                  </div>

                  {/* TRANSFER FORM */}

                  <SendMoneyForm
                    recipientName="Daniel Ihenychukwu Ndukwe"
                    accountNumber="2919144394"
                    onSend={handleSendMoney}
                  />
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
      />
    </main>
  );
}