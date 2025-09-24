import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [apiMessage, setApiMessage] = useState("");

  useEffect(() => {
    if (status === "loading") return;
    if (!session?.user || session.user.role !== "ADMIN") {
      router.replace("/");
    }
    if (!session?.user || session.user.role !== "ADMIN") {
      router.replace("/");
    }
  }, [session, status, router]);

  useEffect(() => {
    async function fetchAdminData() {
      try {
        const res = await fetch("/api/admin/users");
        const data = await res.json();
        setApiMessage(data.message || data.error);
      } catch {
        setApiMessage("Failed to fetch admin data.");
      }
    }
    if (session?.user?.role === "ADMIN") fetchAdminData();
  }, [session]);

  if (status === "loading" || !session?.user || session.user.role !== "ADMIN") {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">Admin Dashboard</h1>
        <p className="text-center text-gray-600">Welcome, <span className="font-semibold">{session.user.email}</span></p>
        <div className="bg-gray-50 rounded-lg p-4 text-center text-blue-700 border border-blue-200">
          {apiMessage}
        </div>
        <button
          onClick={() => signOut()}
          className="w-full rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Sign out
        </button>
      </div>
    </main>
  );
}
