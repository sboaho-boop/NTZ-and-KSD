"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { clearSession } from "@/lib/auth";
import {
  LayoutDashboard,
  Building2,
  Briefcase,
  FolderKanban,
  Newspaper,
  Users,
  Image,
  Mail,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Companies", href: "/admin/companies", icon: Building2 },
  { label: "Activities", href: "/admin/activities", icon: Briefcase },
  { label: "Projects", href: "/admin/projects", icon: FolderKanban },
  { label: "News", href: "/admin/news", icon: Newspaper },
  { label: "Leadership", href: "/admin/leadership", icon: Users },
  { label: "Media", href: "/admin/media", icon: Image },
  { label: "Messages", href: "/admin/messages", icon: Mail },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const subscribe = (cb: () => void) => {
    window.addEventListener("storage", cb);
    return () => window.removeEventListener("storage", cb);
  };
  const getSession = () => {
    if (typeof window === "undefined") return "";
    return sessionStorage.getItem("admin_session") || "";
  };
  const session = useSyncExternalStore(subscribe, getSession, () => "");

  const isLoginPage = pathname === "/admin/login";
  const authenticated = isLoginPage || !!session;

  useEffect(() => {
    if (!isLoginPage && !session) {
      router.replace("/admin/login");
    }
  }, [isLoginPage, session, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!authenticated) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-charcoal-dark text-warm-white/70 flex flex-col transition-transform duration-300 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6 border-b border-warm-white/10">
          <Link href="/admin" className="flex items-baseline gap-1.5">
            <span className="font-serif text-xl font-semibold text-warm-white">Admin</span>
            <span className="w-4 h-px bg-gold inline-block mb-0.5" />
            <span className="font-serif text-sm text-warm-white/40">NTZ/KSD</span>
          </Link>
        </div>
        <nav className="flex-1 py-4 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-6 py-3 text-sm transition-colors duration-200",
                  isActive ? "bg-warm-white/10 text-gold border-r-2 border-gold" : "hover:bg-warm-white/5 text-warm-white/60 hover:text-warm-white"
                )}
              >
                <Icon size={18} strokeWidth={1.5} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-6 border-t border-warm-white/10">
          <button
            onClick={() => { clearSession(); router.replace("/admin/login"); }}
            className="flex items-center gap-3 text-sm text-warm-white/40 hover:text-warm-white transition-colors"
          >
            <LogOut size={18} strokeWidth={1.5} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden mr-4 text-gray-600">
            <Menu size={20} />
          </button>
          <h1 className="text-sm font-medium text-gray-700 capitalize">
            {pathname === "/admin" ? "Dashboard" : pathname.split("/").pop()?.replace(/-/g, " ")}
          </h1>
        </header>

        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
