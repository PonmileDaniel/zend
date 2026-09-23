import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/dashboard/Sidebar";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import HelpSection from "../../components/dashboard/HelpSection";
import ThisMonth from "../../components/dashboard/ThisMonth";
import {
  type DashboardResponse,
  getDashboard,
} from "../../services/dashboardApi";
import Transaction, {
  type TransactionData,
} from "../../components/dashboard/Transaction";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [dashboard, setDashboard] = useState<DashboardResponse | null>(null);
  const navigate = useNavigate();

  const transactions: TransactionData[] =
    dashboard?.recentTransactions.map((transaction) => ({
      name: transaction.description,
      description: transaction.transactionType,
      amount: `₦${transaction.amount.toFixed(2)}`,
      type: transaction.direction === "INWARD" ? "credit" : "debit",
    })) ?? [];

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data = await getDashboard();
        setDashboard(data);
      } catch (error) {
        console.error(error);
      }
    }
    loadDashboard();
  }, []);

  return (
    <main className="min-h-screen bg-[#131313] text-white">
      <div className="flex min-h-screen">
        {/* SIDEBAR */}
        <Sidebar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen((previous) => !previous)}
          activeItem="Home"
        />

        {/* MAIN */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* HEADER */}
          <DashboardHeader title="Home" />

          {/* CONTENT */}
          <div className="flex-1 overflow-y-auto">
            <div className="mx-auto w-full max-w-[1250px] px-5 py-6 lg:px-8 lg:py-8">
              <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
                {/* LEFT */}
                <div className="min-w-0">
                  {/* BALANCE */}
                  <section className="border border-[#303030] bg-[#1A181A]">
                    {/* Account Information */}
                    <div className="flex items-center justify-between border-b border-[#303030] px-5 py-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.08em] text-[#777]">
                          Personal account
                        </p>

                        <div className="mt-1">
                          <span className="font-mono text-sm text-[#d5d5d5]">
                            {dashboard?.accountNumber}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Balance */}
                    <div className="px-5 py-7">
                      <p className="text-xs uppercase tracking-[0.08em] text-[#777]">
                        Available balance
                      </p>

                      <h2 className="mt-2 text-4xl font-semibold tracking-tight">
                        ₦{dashboard?.balance.toFixed(2) ?? "0.00"}
                      </h2>
                    </div>

                    {/* Actions */}
                    <div className="border-t border-[#303030] px-5 py-4">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => navigate("/transfer")}
                          className="cursor-pointer bg-white px-5 py-3 text-sm font-semibold text-black transition-colors hover:bg-[#d9d9d9]"
                        >
                          Transfer
                        </button>

                        <button
                          type="button"
                          className="border border-[#404040] bg-[#0A0A0A] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#202020]"
                        >
                          Deposit
                        </button>
                      </div>
                    </div>
                  </section>

                  {/* TRANSACTIONS */}
                  <section className="mt-8">
                    <div className="mb-3 flex items-center justify-between">
                      <h2 className="text-sm font-semibold">
                        Recent transactions
                      </h2>

                      <button
                        type="button"
                        className="text-xs font-medium text-[#999] transition-colors hover:text-white"
                      >
                        View all
                      </button>
                    </div>

                    <div className="border border-[#262626] bg-[#1A181A]">
                      {transactions.map((transaction, index) => (
                        <Transaction
                          key={`${transaction.name}-${index}`}
                          transaction={transaction}
                        />
                      ))}
                    </div>
                  </section>
                </div>

                {/* RIGHT */}
                <aside className="hidden xl:block">
                  <HelpSection />

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
