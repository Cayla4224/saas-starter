import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [error, setError] = useState("");

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
    fetchAdminData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-md p-8 space-y-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">Admin Dashboard</h1>
        <p className="text-center text-gray-600">Welcome{session?.user?.email ? `, ${session.user.email}` : ""}</p>
        <div className="bg-gray-50 rounded-lg p-4 text-center text-blue-700 border border-blue-200 mb-4">
          This is a demonstration admin page. No access restrictions.
        </div>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 rounded-lg p-4 text-center mb-4">{error}</div>
        )}
        <div>
          {/* User and Project Requests Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold text-blue-800 mb-2">Users</h2>
              <div className="bg-gray-50 rounded-lg p-4 border border-blue-200">
                {Array.isArray(users) && users.length === 0 ? (
                  <p className="text-gray-500">No users found.</p>
                ) : (
                  <ul className="space-y-2">
                    {Array.isArray(users) && users.map((user: any) => (
                      <li key={(user as any).id} className="border-b pb-2">
                        <span className="font-semibold">{(user as any).name || (user as any).email}</span> — <span className="text-xs">{(user as any).role}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-blue-800 mb-2">Project Requests</h2>
              <div className="bg-gray-50 rounded-lg p-4 border border-blue-200">
                {Array.isArray(requests) && requests.length === 0 ? (
                  <p className="text-gray-500">No project requests found.</p>
                ) : (
                  <ul className="space-y-2">
                    {Array.isArray(requests) && requests.map((req: any) => (
                      <li key={(req as any).id} className="border-b pb-2">
                        <span className="font-semibold">{(req as any).projectType ?? ""}</span> — <span className="text-xs">{(req as any).userEmail ?? ""}</span>
                        <div className="text-xs text-gray-600">{(req as any).description ?? ""}</div>
                        <div className="text-xs text-gray-400">{(req as any).createdAt ? new Date((req as any).createdAt).toLocaleString() : ""}</div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <h2 className="text-xl font-bold text-blue-800 mb-2">Demo Analytics</h2>
              <ul className="space-y-2">
                <li>Total Users: <span className="font-semibold">{Array.isArray(users) ? users.length : 0}</span></li>
                <li>Total Project Requests: <span className="font-semibold">{Array.isArray(requests) ? requests.length : 0}</span></li>
                <li>Active Users: <span className="font-semibold">{Array.isArray(users) ? users.filter((u: any) => (u as any).role === "USER").length : 0}</span></li>
                <li>Admins: <span className="font-semibold">{Array.isArray(users) ? users.filter((u: any) => (u as any).role === "ADMIN").length : 0}</span></li>
              </ul>
            </div>
            <div className="bg-green-50 rounded-lg p-6 border border-green-200">
              <h2 className="text-xl font-bold text-green-800 mb-2">Demo Widgets</h2>
              <ul className="space-y-2">
                <li>Recent Request: <span className="font-semibold">{Array.isArray(requests) && requests.length > 0 && (requests[0] as any)?.projectType ? (requests[0] as any).projectType : "None"}</span></li>
                <li>Last User: <span className="font-semibold">{Array.isArray(users) && users.length > 0 && (users[users.length-1] as any)?.email ? (users[users.length-1] as any).email : "None"}</span></li>
                <li>System Status: <span className="font-semibold text-green-700">Operational</span></li>
              </ul>
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
