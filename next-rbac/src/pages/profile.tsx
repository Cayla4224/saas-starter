import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";

export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [name, setName] = useState(session?.user?.name || "");
  const [company, setCompany] = useState("");
  const [about, setAbout] = useState("");
  const [contact, setContact] = useState("");
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (status === "loading") return;
    if (!session?.user) router.replace("/auth/signin");
  }, [session, status, router]);

  if (status === "loading" || !session?.user) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 p-6">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-10 space-y-8 border-4 border-blue-900">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-2 text-left">Profile</h1>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Profile Picture */}
          <div className="flex flex-col items-center md:items-start">
            <div className="w-32 h-32 rounded-full bg-blue-100 border-4 border-blue-700 flex items-center justify-center overflow-hidden mb-4">
              {profilePic ? (
                <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <svg className="w-16 h-16 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.657 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={e => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = () => setProfilePic(reader.result as string);
                  reader.readAsDataURL(file);
                }
              }}
            />
            <button
              className="mt-2 px-4 py-2 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              onClick={() => fileInputRef.current?.click()}
            >
              {profilePic ? "Change Photo" : "Add Photo"}
            </button>
          </div>
          {/* Profile Info */}
          <div className="flex-1 space-y-4">
            <label className="block text-gray-700 font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="block text-gray-700 font-medium">Company</label>
            <input
              type="text"
              value={company}
              onChange={e => setCompany(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="block text-gray-700 font-medium">About Me</label>
            <textarea
              value={about}
              onChange={e => setAbout(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Tell us about yourself..."
            />
            <label className="block text-gray-700 font-medium">Contact (optional)</label>
            <input
              type="text"
              value={contact}
              onChange={e => setContact(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Phone, LinkedIn, etc."
            />
            <p className="text-gray-500 mt-2">Email: <span className="font-semibold">{session.user.email}</span></p>
          </div>
        </div>
        {/* Current Project Status */}
        <div className="bg-gray-100 border-l-4 border-blue-400 p-4 rounded mt-8">
          <h2 className="text-xl font-bold text-blue-800 mb-2">Current Project Status</h2>
          <p className="text-gray-700">No active projects. Start a new project to see status updates here.</p>
        </div>
      </div>
    </main>
  );
}
