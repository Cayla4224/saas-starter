import { useState } from "react";

export default function MaintenanceMessenger() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("");
    // Simulate sending request (replace with API call if needed)
    setTimeout(() => {
      setStatus("Your maintenance request has been sent!");
      setMessage("");
    }, 1000);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 space-y-6 border-4 border-blue-900">
        <h1 className="text-3xl font-bold text-blue-900 mb-2 text-center">Maintenance Request Messenger</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block text-gray-700 font-medium">Describe your issue</label>
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Describe the maintenance issue..."
            required
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-900 px-4 py-2 text-white font-semibold hover:bg-blue-700 transition"
          >
            Send Request
          </button>
          {status && <div className="text-center text-blue-700 font-semibold mt-2">{status}</div>}
        </form>
      </div>
    </main>
  );
}
