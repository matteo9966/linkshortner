import { getAuthUserId } from "@/models/auth";
import { redirect } from "next/navigation";
import { SignUpButton, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Link2, BarChart3, Zap, Lock } from "lucide-react";

const features = [
  {
    icon: Link2,
    title: "Instant URL Shortening",
    description:
      "Transform any long URL into a short, memorable link in one click.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    description:
      "Track clicks and monitor the performance of each link from your dashboard.",
  },
  {
    icon: Zap,
    title: "AI-Powered",
    description:
      "Smart suggestions to help you craft the perfect short link for your audience.",
  },
  {
    icon: Lock,
    title: "Secure & Private",
    description:
      "Your links are protected with Clerk authentication and enterprise-grade security.",
  },
];

export default async function Home() {
  const userId = await getAuthUserId();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <main className="flex flex-col items-center">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-24 gap-6 w-full max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
          Shorten links,{" "}
          <span className="text-[#6c47ff]">amplify reach</span>
        </h1>
        <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl">
          Transform long URLs into clean, shareable links in seconds. Track
          performance and manage all your links from one powerful dashboard.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <SignUpButton>
            <Button>Get Started Free</Button>
          </SignUpButton>
          <SignInButton>
            <Button variant="outline">Sign In</Button>
          </SignInButton>
        </div>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full mx-auto px-4 pb-24">
        {features.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="rounded-xl border border-border bg-card p-6 flex flex-col gap-3"
          >
            <Icon className="h-6 w-6 text-[#6c47ff]" />
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
