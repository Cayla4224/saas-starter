import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session?.user) router.replace("/auth/signin");
  }, [session, status, router]);

  if (status === "loading" || !session?.user) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }


  // Options for each project type
  const projectOptions: Record<string, string[]> = {
    "Personal Portfolio Website": ["Photo Gallery", "Contact Form", "Blog Section", "Resume Download"],
    "Company Landing Page": ["Hero Section", "Team Profiles", "Contact Form", "Pricing Table"],
    "Custom Dashboard": ["Analytics Charts", "User Management", "Notifications", "Export Data"],
    "Blog Platform": ["Markdown Support", "Comments", "Categories", "Search"],
    "E-commerce Store": ["Product Catalog", "Shopping Cart", "Payment Integration", "Order Tracking"],
    "Internal Tools & Automation": ["Task Automation", "Reporting", "Integrations", "Role Management"],
    "API Integrations": ["REST API", "GraphQL", "Webhooks", "Third-party Auth"],
    "Team Collaboration App": ["Chat", "File Sharing", "Task Boards", "Calendar"],
    "Other": [],
  };

  return (
    <main className="flex min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 p-6 relative">
      <div className="flex w-full max-w-6xl mx-auto h-full">
        {/* Left side: Welcome, Types, Project Status */}
        <div className="flex flex-col flex-1 bg-white rounded-2xl shadow-2xl p-10 border-4 border-blue-900 mt-2 mr-8 min-w-[350px]">
          <h1 className="text-4xl font-extrabold text-blue-900 mb-2">Welcome to Your Dashboard</h1>
          <p className="text-lg text-gray-700 font-medium mb-4">
            Hello, <span className="font-bold text-blue-700">{session.user.email}</span>!
          </p>
          {/* Types of full stack projects */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-blue-800 mb-2">Types of Full-Stack Projects You Can Create</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {Object.keys(projectOptions).map(type => (
                <li key={type}>{type}</li>
              ))}
            </ul>
          </div>
          {/* Current Project Status */}
          <div className="bg-gray-100 border-l-4 border-blue-400 p-4 rounded mb-4">
            <h2 className="text-xl font-bold text-blue-800 mb-2">Current Project Status</h2>
            <p className="text-gray-700 mb-4">No active projects. Start a new project to see status updates here.</p>
            <a
              href="/pricing"
              className="inline-block bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full shadow transition text-lg mt-2"
            >
              Start a Project
            </a>
          </div>
        </div>
        {/* Right side: Notifications */}
        <div className="flex flex-col w-[350px] min-w-[300px]">
          <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-900 p-6 rounded-2xl shadow-lg mt-2">
            <strong>Notification:</strong> New features are coming soon! Stay tuned for updates.
          </div>
        </div>
      </div>
      {/* Contact Button fixed at bottom center */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <a
          href="/contact"
          className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition text-lg"
        >
          Contact
        </a>
      </div>
    </main>
  );
}
