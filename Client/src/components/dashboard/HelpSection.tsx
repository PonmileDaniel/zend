import {
  Bell,
  ChevronRight,
  CircleHelp,
} from "lucide-react";

export default function HelpSection() {
  return (
    <section>
      <h2 className="mb-3 text-sm font-semibold">
        Need help?
      </h2>

      <div className="border border-[#262626] bg-[#1A181A]">
        {/* Help Centre */}
        <button
          type="button"
          className="flex w-full items-center gap-3 border-b border-[#262626] px-4 py-4 text-left transition-colors hover:bg-[#202020]"
        >
          <div className="flex h-9 w-9 items-center justify-center border border-[#303030] bg-[#0A0A0A]">
            <CircleHelp size={17} />
          </div>

          <div className="flex-1">
            <p className="text-sm font-medium">
              Help centre
            </p>

            <p className="mt-1 text-xs text-[#666]">
              Find answers to common questions
            </p>
          </div>

          <ChevronRight
            size={16}
            className="text-[#666]"
          />
        </button>


        {/* Support */}
        <button
          type="button"
          className="flex w-full items-center gap-3 px-4 py-4 text-left transition-colors hover:bg-[#202020]"
        >
          <div className="flex h-9 w-9 items-center justify-center border border-[#303030] bg-[#0A0A0A]">
            <Bell size={17} />
          </div>

          <div className="flex-1">
            <p className="text-sm font-medium">
              Contact support
            </p>

            <p className="mt-1 text-xs text-[#666]">
              We're here when you need us
            </p>
          </div>

          <ChevronRight
            size={16}
            className="text-[#666]"
          />
        </button>
      </div>
    </section>
  );
}