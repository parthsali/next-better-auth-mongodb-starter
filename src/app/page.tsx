"use client";

import { useSession } from "@/lib/auth-client";
import Header from "@/components/layout/header";

export default function Home() {
  const { data: session, isPending } = useSession();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center text-center space-y-8">
          {/* Hero Section */}
          <div className="space-y-4 max-w-2xl">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Next.js + Better Auth
            </h1>
            <p className="text-lg text-muted-foreground">
              A minimal template with MongoDB, Google OAuth, and shadcn/ui
            </p>
          </div>

          {/* Status Card */}
          <div className="w-full max-w-md rounded-xl border bg-card p-6 shadow-sm">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Auth Status</h2>

              {isPending ? (
                <div className="flex items-center justify-center py-4">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                </div>
              ) : session?.user ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                    {session.user.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={session.user.image}
                        alt={session.user.name || "User"}
                        className="size-10 rounded-full"
                      />
                    )}
                    <div className="text-left">
                      <p className="font-medium">{session.user.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {session.user.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="size-2 rounded-full bg-green-500" />
                    <span className="text-muted-foreground">
                      Connected to MongoDB
                    </span>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Sign in to see your profile
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="size-2 rounded-full bg-yellow-500" />
                    <span className="text-muted-foreground">
                      Waiting for authentication
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid gap-4 sm:grid-cols-3 w-full max-w-3xl pt-8">
            <FeatureCard
              title="Better Auth"
              description="Modern authentication with OAuth support"
            />
            <FeatureCard
              title="MongoDB"
              description="NoSQL database with Mongoose ODM"
            />
            <FeatureCard
              title="shadcn/ui"
              description="Beautiful components built with Radix"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-lg border bg-card p-4 text-left transition-colors hover:bg-accent/50">
      <h3 className="font-medium">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}