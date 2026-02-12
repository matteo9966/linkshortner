import { requireDashboardAuth } from "@/models/auth";

export const metadata = {
  title: 'Dashboard',
  description: 'Placeholder dashboard page',
};

export default async function DashboardPage() {
  // server-side enforcement of Clerk auth (redirects if not signed in)
 await requireDashboardAuth();

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4">Dashboard</h1>

      <section className="rounded-lg border border-dashed border-gray-200 p-6">

      </section>
    </main>
  );
}
