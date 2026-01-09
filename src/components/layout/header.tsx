"use client";

import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import LoginButton from "@/components/auth/login-button";
import UserMenu from "@/components/auth/user-menu";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { GithubIcon } from "@/components/icons/github";

const GITHUB_REPO = "https://github.com/parthsali/next-better-auth-mongodb-template";

export default function Header() {
    const { data: session, isPending } = useSession();

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
            <div className="container mx-auto flex h-14 items-center justify-between px-4">
                <span className="text-lg font-semibold">Next + Better Auth</span>

                <div className="flex items-center">
                    <Link
                        href={GITHUB_REPO}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View on GitHub"
                        className="p-2 text-foreground"
                    >
                        <GithubIcon className="h-[1.1rem] w-[1.1rem]" />
                    </Link>
                    <ThemeToggle />

                    <div className="ml-3">
                        {isPending ? (
                            <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
                        ) : session?.user ? (
                            <UserMenu />
                        ) : (
                            <LoginButton />
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
