"use client";

import { useSession } from "@/lib/auth-client";
import LoginButton from "@/components/auth/login-button";
import UserMenu from "@/components/auth/user-menu";
import { ThemeToggle } from "@/components/common/theme-toggle";

export default function Header() {
    const { data: session, isPending } = useSession();

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
            <div className="container mx-auto flex h-14 items-center justify-between px-4">
                <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold">Next + Better Auth</span>
                </div>

                <nav className="flex items-center gap-2">
                    <ThemeToggle />
                    {isPending ? (
                        <div className="h-8 w-20 animate-pulse rounded-md bg-muted" />
                    ) : session?.user ? (
                        <UserMenu />
                    ) : (
                        <LoginButton />
                    )}
                </nav>
            </div>
        </header>
    );
}
