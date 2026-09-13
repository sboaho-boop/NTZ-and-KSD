"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { setSession } from "@/lib/auth";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.user) {
        setSession(data.user);
        router.replace("/admin");
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch {
      setError("Connection error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-charcoal-dark flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="flex items-baseline justify-center gap-1.5 mb-4">
            <span className="font-serif text-3xl font-semibold text-warm-white">NTZ</span>
            <span className="w-5 h-px bg-gold inline-block mb-1" />
            <span className="font-serif text-xl text-warm-white/50">KSD</span>
          </div>
          <p className="text-[11px] tracking-[0.3em] uppercase text-gold">Admin Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 space-y-5">
          <div>
            <label className="block text-[11px] font-medium tracking-[0.15em] uppercase text-gray-600 mb-2">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 text-sm outline-none focus:border-gold transition-colors"
              placeholder="admin@ntz-ksd.com"
            />
          </div>
          <div>
            <label className="block text-[11px] font-medium tracking-[0.15em] uppercase text-gray-600 mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 text-sm outline-none focus:border-gold transition-colors"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-charcoal text-warm-white text-[13px] font-semibold tracking-widest uppercase hover:bg-charcoal-light disabled:opacity-50 transition-colors"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
