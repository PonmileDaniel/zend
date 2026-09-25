import Sidebar from "../../components/dashboard/Sidebar";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import ThisMonth from "../../components/dashboard/ThisMonth";
import Transfer from "../../components/Transfers/Transfer";
import {
  getRecipient,
  type RecipientResponse,
} from "../../services/transferApi";
import { useState } from "react";

export default function TransferPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [accountNumber, setAccountNumber] = useState("");
  const [recipient, setRecipient] = useState<RecipientResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  function handleAccountNumberChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const value = event.target.value.replace(/\D/g, "");

    if (value.length <= 10) {
      setAccountNumber(value);
      setRecipient(null);
      setError("");

      // Automatically search when the 10th digit is entered
      if (value.length === 10) {
        handleRecipientLookup(value);
      }
    }
  }

  return (
    <main className="min-h-screen bg-[#131313] text-white">
      <div className="flex min-h-screen">
        {/* SIDEBAR */}
        <Sidebar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen((previous) => !previous)}
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
                  <Transfer
                    accountNumber={accountNumber}
                    recipient={recipient}
                    loading={loading}
                    error={error}
                    onAccountNumberChange={handleAccountNumberChange}
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
    </main>
  );
}
