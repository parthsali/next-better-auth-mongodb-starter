"use client";

import { signOut, useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserMenu() {
    const { data: session } = useSession();

    const handleSignOut = async () => {
        await signOut();
    };

    if (!session?.user) return null;

    const initials = session.user.name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    return (
        <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
                <Avatar className="size-8">
                    <AvatarImage src={session.user.image || ""} alt={session.user.name || "User"} />
                    <AvatarFallback className="text-xs">{initials || "U"}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium hidden sm:inline">
                    {session.user.name}
                </span>
            </div>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
                Sign Out
            </Button>
        </div>
    );
}
