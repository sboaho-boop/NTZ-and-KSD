"use client";

import { useEffect, useState } from "react";
import { Building2, Newspaper, FolderKanban, Mail, Briefcase } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    companies: 0,
    news: 0,
    projects: 0,
    messages: 0,
    activities: 0,
  });

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {});
  }, []);

  const cards = [
    { label: "Companies", value: stats.companies, icon: Building2 },
    { label: "Activities", value: stats.activities, icon: Briefcase },
    { label: "Projects", value: stats.projects, icon: FolderKanban },
    { label: "News Articles", value: stats.news, icon: Newspaper },
    { label: "Messages", value: stats.messages, icon: Mail },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Dashboard</h1>
        <p className="text-sm text-gray-500">Overview of your website content.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-white border border-gray-200 rounded-lg p-6">
              <Icon size={20} className="text-gray-400 mb-3" strokeWidth={1.5} />
              <p className="text-3xl font-semibold text-gray-900">{card.value}</p>
              <p className="text-sm text-gray-500 mt-1">{card.label}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Manage Companies", href: "/admin/companies" },
            { label: "Manage Activities", href: "/admin/activities" },
            { label: "Manage Projects", href: "/admin/projects" },
            { label: "Manage News", href: "/admin/news" },
            { label: "Manage Leadership", href: "/admin/leadership" },
            { label: "View Messages", href: "/admin/messages" },
            { label: "Media Library", href: "/admin/media" },
            { label: "Site Settings", href: "/admin/settings" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block p-4 border border-gray-200 rounded hover:border-gold hover:bg-gray-50 text-sm text-gray-700 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
