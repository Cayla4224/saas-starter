
import type { AppProps } from "next/app";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";


import Link from "next/link";

function Navbar() {
  return (
    <nav className="bg-white shadow mb-8">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="font-bold text-xl text-blue-600">SaaS Starter</div>
        <div className="space-x-4">
          <Link href="/" className="text-gray-700 hover:text-blue-600">Home</Link>
          <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
          <Link href="/profile" className="text-gray-700 hover:text-blue-600">Profile</Link>
          <Link href="/pricing" className="text-gray-700 hover:text-blue-600">Pricing</Link>
          <Link href="/about" className="text-gray-700 hover:text-blue-600">About</Link>
          <Link href="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
          <Link href="/admin" className="text-gray-700 hover:text-blue-600">Admin</Link>
        </div>
      </div>
    </nav>
  );
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Navbar />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

    
