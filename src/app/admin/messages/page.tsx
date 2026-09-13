"use client";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface Message { id: string; name: string; company?: string; email: string; phone?: string; subject: string; message: string; status: string; createdAt: string; }

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selected, setSelected] = useState<Message | null>(null);

  const load = () => fetch("/api/admin/messages").then(r => r.json()).then(setMessages).catch(() => {});
  useEffect(() => { load(); }, []);

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/admin/messages?id=${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete?")) return;
    await fetch(`/api/admin/messages?id=${id}`, { method: "DELETE" });
    setSelected(null); load();
  }

  const unread = messages.filter(m => m.status === "unread").length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Messages</h1>
        <p className="text-sm text-gray-500">{unread} unread message{unread !== 1 ? "s" : ""}.</p>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b border-gray-200 bg-gray-50">
            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">From</th>
            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase hidden md:table-cell">Subject</th>
            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase hidden md:table-cell">Date</th>
            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr></thead>
          <tbody>{messages.map(m => (
            <tr key={m.id} className={`border-b border-gray-100 last:border-0 cursor-pointer ${m.status === "unread" ? "bg-gray-50" : ""}`} onClick={() => { setSelected(m); if (m.status === "unread") updateStatus(m.id, "read"); }}>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">{m.name}</td>
              <td className="px-6 py-4 text-sm text-gray-500 hidden md:table-cell">{m.subject}</td>
              <td className="px-6 py-4 text-sm text-gray-500 hidden md:table-cell">{formatDate(m.createdAt)}</td>
              <td className="px-6 py-4"><span className={`text-[10px] font-medium tracking-wider uppercase px-2 py-1 rounded ${m.status === "unread" ? "bg-blue-50 text-blue-600" : m.status === "replied" ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500"}`}>{m.status}</span></td>
              <td className="px-6 py-4 text-right">
                <button onClick={(e) => { e.stopPropagation(); handleDelete(m.id); }} className="text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
              </td>
            </tr>
          ))}{messages.length === 0 && <tr><td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-400">No messages.</td></tr>}</tbody>
        </table>
      </div>
      {selected && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-6" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-lg max-w-lg w-full p-8" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{selected.subject}</h3>
                <p className="text-sm text-gray-500">From: {selected.name} ({selected.email}){selected.company ? ` — ${selected.company}` : ""}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6 whitespace-pre-wrap">{selected.message}</p>
            <div className="flex gap-2">
              <a href={`mailto:${selected.email}`} className="px-4 py-2 bg-charcoal text-white text-sm rounded hover:bg-charcoal-light transition-colors">Reply via Email</a>
              <button onClick={() => updateStatus(selected.id, "archived")} className="px-4 py-2 border border-gray-200 text-gray-600 text-sm rounded hover:bg-gray-50 transition-colors">Archive</button>
              <button onClick={() => handleDelete(selected.id)} className="px-4 py-2 border border-red-200 text-red-500 text-sm rounded hover:bg-red-50 transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
