import type { ReactNode } from "react";

import AuthFooter from "../components/auth/AuthFooter";
import AuthHeader from "../components/auth/AuthHeader";
import AuthVisual from "../components/auth/AuthVisual";

interface AuthLayoutProps {
    children: ReactNode;
}

export default function AuthLayout({
    children,
}: AuthLayoutProps) {
    return (
        <main className="h-screen overflow-hidden bg-[#131313] text-white">
            <div className="flex h-screen flex-col lg:flex-row">
                {/* LEFT */}
                <section className="flex h-screen w-full flex-col border-b border-[#262626] lg:w-1/2 lg:border-b-0 lg:border-r">
                    <AuthHeader />

                    {/* Page-specific content */}
                    <div className="flex flex-1 items-center justify-center overflow-hidden px-6 py-4 lg:px-12">
                        {children}
                    </div>

                    <AuthFooter />
                </section>
                <AuthVisual />

            </div>
        </main>
    )
}