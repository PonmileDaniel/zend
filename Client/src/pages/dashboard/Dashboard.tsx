import { useState } from "react";

import Sidebar from "../../components/dashboard/Sidebar";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import Transaction, {
  type TransactionData,
} from "../../components/dashboard/Transaction";
import HelpSection from "../../components/dashboard/HelpSection";
import ThisMonth from "../../components/dashboard/ThisMonth";

const transactions: TransactionData[] = [
  {
    name: "Daniel Ihenychukwu Ndukwe",
    description: "Transfer",
    amount: "₦50.00",
    type: "debit",
  },
  {
    name: "Daniel Ihenychukwu Ndukwe",
    description: "Received money",
    amount: "+ ₦150.00",
    type: "credit",
  },
  {
    name: "MTN NIG VTU",
    description: "Airtime",
    amount: "₦100.00",
    type: "debit",
  },
  {
    name: "Netflix",
    description: "Subscription",
    amount: "₦7,000.00",
    type: "debit",
  },
];

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
          <DashboardHeader title="Home"/>

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
                            1101423675
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
                        ₦109.57
                      </h2>
                    </div>

                    {/* Actions */}
                    <div className="border-t border-[#303030] px-5 py-4">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="bg-white px-5 py-3 text-sm font-semibold text-black transition-colors hover:bg-[#d9d9d9]"
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
