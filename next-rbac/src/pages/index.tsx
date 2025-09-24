// src/pages/index.tsx



import { Inter } from "next/font/google";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <main className={`${inter.className} min-h-screen flex flex-col justify-center items-center relative`}>
      {/* Navy blue background */}
      <div className="fixed inset-0 w-full h-full bg-[#0a2540] -z-20" />
      {/* Device SVGs and accent shapes above the navy background */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
        {/* Glowing accent shapes */}
        <div className="absolute rounded-full bg-blue-500 blur-3xl opacity-40 w-[32rem] h-[32rem] top-[-120px] left-[-120px] animate-pulse" />
        <div className="absolute rounded-full bg-cyan-400 blur-2xl opacity-40 w-[24rem] h-[24rem] top-1/2 right-[-100px] animate-bounce" />
        <div className="absolute rounded-full bg-indigo-400 blur-2xl opacity-40 w-[28rem] h-[28rem] bottom-[-100px] left-1/2 animate-spin" />

        {/* Realistic Monitor */}
        <svg width="220" height="140" viewBox="0 0 220 140" fill="none" className="absolute top-24 left-32 opacity-60" xmlns="http://www.w3.org/2000/svg">
          <rect x="30" y="30" width="160" height="80" rx="12" fill="#e0e7ff" stroke="#38bdf8" strokeWidth="4" />
          <rect x="60" y="50" width="100" height="40" rx="6" fill="#38bdf8" />
          <rect x="90" y="115" width="40" height="10" rx="3" fill="#a5b4fc" />
        </svg>
        {/* Realistic Laptop */}
        <svg width="180" height="100" viewBox="0 0 180 100" fill="none" className="absolute bottom-32 right-40 opacity-60" xmlns="http://www.w3.org/2000/svg">
          <rect x="30" y="25" width="120" height="40" rx="8" fill="#e0e7ff" stroke="#38bdf8" strokeWidth="3" />
          <rect x="50" y="35" width="80" height="20" rx="4" fill="#38bdf8" />
          <rect x="10" y="70" width="160" height="15" rx="4" fill="#a5b4fc" />
          <ellipse cx="90" cy="85" rx="8" ry="2" fill="#38bdf8" />
        </svg>
        {/* Realistic Tablet */}
        <svg width="100" height="160" viewBox="0 0 100 160" fill="none" className="absolute top-1/2 left-16 opacity-60" xmlns="http://www.w3.org/2000/svg">
          <rect x="15" y="25" width="70" height="110" rx="16" fill="#e0e7ff" stroke="#38bdf8" strokeWidth="3" />
          <rect x="30" y="45" width="40" height="70" rx="8" fill="#38bdf8" />
          <circle cx="50" cy="140" r="3" fill="#a5b4fc" />
        </svg>
        {/* Realistic Phone */}
        <svg width="60" height="120" viewBox="0 0 60 120" fill="none" className="absolute bottom-16 left-1/2 opacity-60" xmlns="http://www.w3.org/2000/svg">
          <rect x="12" y="20" width="36" height="80" rx="16" fill="#e0e7ff" stroke="#38bdf8" strokeWidth="2" />
          <rect x="20" y="35" width="20" height="50" rx="6" fill="#38bdf8" />
          <circle cx="30" cy="100" r="2" fill="#a5b4fc" />
        </svg>
      </div>
      <section className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-12 mt-16 mb-8 border-4 border-blue-900">
        <h1 className="text-5xl font-extrabold text-blue-900 mb-6 text-center tracking-tight drop-shadow-[0_2px_8px_rgba(37,99,235,0.5)]">Full-Stack Development for Modern Businesses</h1>
        <p className="text-lg text-gray-700 text-center mb-8 font-medium">
          We deliver robust, scalable, and secure web solutions for individuals and companies. Partner with us for bold results and professional service.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-blue-600/90 rounded-xl p-6 shadow-lg text-center border-2 border-blue-900 text-white">
            <h2 className="text-xl font-bold text-white mb-2">For Individuals</h2>
            <ul className="space-y-2 text-left list-disc list-inside">
              <li>Personal websites & portfolios</li>
              <li>Startup MVPs</li>
              <li>Custom dashboards</li>
              <li>Consulting & code reviews</li>
            </ul>
          </div>
          <div className="bg-cyan-500/90 rounded-xl p-6 shadow-lg text-center border-2 border-blue-900 text-white">
            <h2 className="text-xl font-bold text-white mb-2">For Companies</h2>
            <ul className="space-y-2 text-left list-disc list-inside">
              <li>Enterprise SaaS platforms</li>
              <li>Internal tools & automation</li>
              <li>API development & integrations</li>
              <li>Team training & support</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-6">
          <Link href="/contact" className="rounded-lg bg-blue-900 px-8 py-4 text-white font-bold text-xl hover:bg-cyan-500 transition shadow-lg text-center border-2 border-cyan-400">
            Contact Us
          </Link>
          <Link href="/pricing" className="rounded-lg bg-white border-2 border-blue-900 px-8 py-4 text-blue-900 font-bold text-xl hover:bg-blue-50 transition shadow-lg text-center">
            View Pricing
          </Link>
        </div>
      </section>
      <section className="w-full max-w-4xl py-8 px-4">
        <h2 className="text-3xl font-bold text-white mb-8 text-center drop-shadow-[0_2px_8px_rgba(37,99,235,0.5)]">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-blue-600/90 rounded-xl shadow-lg p-8 text-center border-2 border-blue-900 text-white">
            <span className="text-5xl text-cyan-300">⚡</span>
            <h3 className="font-bold text-xl mt-4 mb-2 text-white">Speed & Reliability</h3>
            <p className="">Rapid delivery and dependable results for every project.</p>
          </div>
          <div className="bg-cyan-500/90 rounded-xl shadow-lg p-8 text-center border-2 border-blue-900 text-white">
            <span className="text-5xl text-blue-200">🔒</span>
            <h3 className="font-bold text-xl mt-4 mb-2 text-white">Security & Scalability</h3>
            <p className="">Modern best practices for growth and protection.</p>
          </div>
          <div className="bg-indigo-600/90 rounded-xl shadow-lg p-8 text-center border-2 border-blue-900 text-white">
            <span className="text-5xl text-cyan-200">💼</span>
            <h3 className="font-bold text-xl mt-4 mb-2 text-white">Professional Partnership</h3>
            <p className="">Expert guidance and support from start to finish.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

