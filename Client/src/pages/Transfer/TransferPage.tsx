import Sidebar from "../../components/dashboard/Sidebar";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import ThisMonth from "../../components/dashboard/ThisMonth";
import Transfer from "../../components/Transfers/Transfer";
import { useState } from "react";

export default function TransferPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
          <DashboardHeader title="Send"/>

          {/* CONTENT */}
          <div className="flex-1 overflow-y-auto">

            <div className="mx-auto w-full max-w-[1250px] px-5 py-6 lg:px-8 lg:py-8">

              <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">

                {/* LEFT */}
                <div className="min-w-0">
                  <Transfer />
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