"use client";

import { useState } from "react";
import GoogleIcon from "@/components/icons/google";
import { signIn } from "@/lib/auth-client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface LoginButtonProps {
    redirectTo?: string;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    showTrigger?: boolean;
}

export default function LoginButton({
    redirectTo = "/",
    open: controlledOpen,
    onOpenChange,
    showTrigger = true,
}: LoginButtonProps) {
    const [internalOpen, setInternalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
    const setOpen = onOpenChange || setInternalOpen;

    const handleSignIn = async () => {
        setError("");
        setIsLoading(true);

        try {
            await signIn.social({
                provider: "google",
                callbackURL: redirectTo,
            });
        } catch (err) {
            console.error("Sign-in error:", err);
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {showTrigger && (
                <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                        Sign In
                    </Button>
                </DialogTrigger>
            )}
            <DialogContent className="sm:max-w-[400px]">
                <DialogHeader className="space-y-1">
                    <DialogTitle className="text-2xl font-semibold tracking-tight text-center">
                        Welcome
                    </DialogTitle>
                    <DialogDescription className="text-center text-sm">
                        Sign in to continue
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-4 pt-2">
                    <Button
                        variant="outline"
                        size="lg"
                        className="w-full flex items-center justify-center gap-2.5"
                        onClick={handleSignIn}
                        disabled={isLoading}
                    >
                        <GoogleIcon className="size-4" />
                        <span className="text-sm font-medium">
                            {isLoading ? "Signing in..." : "Continue with Google"}
                        </span>
                    </Button>

                    {error && (
                        <p className="text-destructive text-xs text-center">{error}</p>
                    )}

                    <p className="text-xs text-center text-muted-foreground">
                        By continuing, you agree to our Terms and Privacy Policy
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
}
