import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "loading") return;
    if (!session?.user || session.user.role !== "ADMIN") {
      router.replace("/");
    }
  }, [session, status, router]);

  useEffect(() => {
    async function fetchAdminData() {
      try {
        const res = await fetch("/api/admin/users");
        const data = await res.json();
        if (data.error) {
          setError(data.error);
        } else {
          setUsers(data.users || []);
          setRequests(data.requests || []);
        }
      } catch {
        setError("Failed to fetch admin data.");
      }
    }
    if (session?.user?.role === "ADMIN") fetchAdminData();
  }, [session]);

  if (status === "loading" || !session?.user || session.user.role !== "ADMIN") {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-md p-8 space-y-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">Admin Dashboard</h1>
        <p className="text-center text-gray-600">Welcome, <span className="font-semibold">{session.user.email}</span></p>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 rounded-lg p-4 text-center mb-4">{error}</div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold text-blue-800 mb-2">Users</h2>
            <div className="bg-gray-50 rounded-lg p-4 border border-blue-200">
              {users.length === 0 ? (
                <p className="text-gray-500">No users found.</p>
              ) : (
                <ul className="space-y-2">
                  {users.map((user: any) => (
                    <li key={user.id} className="border-b pb-2">
                      <span className="font-semibold">{user.name || user.email}</span> — <span className="text-xs">{user.role}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-blue-800 mb-2">Project Requests</h2>
            <div className="bg-gray-50 rounded-lg p-4 border border-blue-200">
              {requests.length === 0 ? (
                <p className="text-gray-500">No project requests found.</p>
              ) : (
                <ul className="space-y-2">
                  {requests.map((req: any) => (
                    <li key={req.id} className="border-b pb-2">
                      <span className="font-semibold">{req.projectType}</span> — <span className="text-xs">{req.userEmail}</span>
                      <div className="text-xs text-gray-600">{req.description}</div>
                      <div className="text-xs text-gray-400">{new Date(req.createdAt).toLocaleString()}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/auth/signin" })}
          className="w-full rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600 mt-8"
        >
          Sign out
        </button>
      </div>
    </main>
  );
}
