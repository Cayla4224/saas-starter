import { useState } from "react";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 p-4">
      <div className="max-w-sm w-full bg-white/90 rounded-2xl shadow-2xl p-8 border-4 border-blue-900 text-center">
        <h1 className="text-3xl font-extrabold text-blue-900 mb-6">Contact</h1>
        <div className="space-y-6">
          <div>
            <span className="block text-base text-blue-800 font-medium mb-1">Phone</span>
            <a href="tel:8643150861" className="text-lg text-blue-900 font-normal">(864) 315-0861</a>
          </div>
          <div>
            <span className="block text-base text-blue-800 font-medium mb-1">Email</span>
            <a href="mailto:developersmith1125@gmail.com" className="text-lg text-blue-900 font-normal">developersmith1125@gmail.com</a>
          </div>
        </div>
      </div>
    </main>
  );
}
