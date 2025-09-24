import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function UserManagement() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session?.user || session.user.role !== "ADMIN") router.replace("/");
  }, [session, status, router]);

  if (status === "loading" || !session?.user || session.user.role !== "ADMIN") {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">User Management</h1>
        <p className="text-center text-gray-600">Manage users and roles here. (Feature coming soon!)</p>
      </div>
    </main>
  );
}
