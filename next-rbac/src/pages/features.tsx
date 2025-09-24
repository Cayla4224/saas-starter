export default function Features() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-md p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">Features</h1>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Role-based access control (RBAC)</li>
          <li>Authentication with NextAuth</li>
          <li>Modern UI with Tailwind CSS</li>
          <li>Admin dashboard</li>
          <li>Easy user management</li>
          <li>Scalable architecture</li>
        </ul>
      </div>
    </main>
  );
}
