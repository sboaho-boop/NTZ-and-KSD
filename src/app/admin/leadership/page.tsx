"use client";
import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface Leader { id: string; name: string; slug: string; position: string; biography: string; }

export default function AdminLeadership() {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [editing, setEditing] = useState<Leader | null>(null);
  const [form, setForm] = useState({ name: "", slug: "", position: "", biography: "" });

  const load = () => fetch("/api/admin/leadership").then(r => r.json()).then(setLeaders).catch(() => {});
  useEffect(() => { load(); }, []);

  async function handleSave() {
    const method = editing ? "PUT" : "POST";
    const url = editing ? `/api/admin/leadership?id=${editing.id}` : "/api/admin/leadership";
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setEditing(null); setForm({ name: "", slug: "", position: "", biography: "" }); load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete?")) return;
    await fetch(`/api/admin/leadership?id=${id}`, { method: "DELETE" }); load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="text-2xl font-semibold text-gray-900 mb-1">Leadership</h1><p className="text-sm text-gray-500">Manage leadership profiles.</p></div>
        <button onClick={() => { setEditing(null); setForm({ name: "", slug: "", position: "", biography: "" }); }} className="flex items-center gap-2 px-4 py-2 bg-charcoal text-white text-sm rounded hover:bg-charcoal-light transition-colors"><Plus size={16} /> Add Leader</button>
      </div>
      {(editing || form.name) && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">{editing ? "Edit" : "Add"} Leader</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Name</label><input value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded text-sm outline-none focus:border-gold" /></div>
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Slug</label><input value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded text-sm outline-none focus:border-gold" /></div>
          </div>
          <div className="mb-4"><label className="block text-xs font-medium text-gray-600 mb-1">Position</label><input value={form.position} onChange={e => setForm({...form, position: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded text-sm outline-none focus:border-gold" /></div>
          <div className="mb-4"><label className="block text-xs font-medium text-gray-600 mb-1">Biography</label><textarea value={form.biography} onChange={e => setForm({...form, biography: e.target.value})} rows={5} className="w-full px-3 py-2 border border-gray-200 rounded text-sm outline-none focus:border-gold resize-none" /></div>
          <div className="flex gap-2">
            <button onClick={handleSave} className="px-4 py-2 bg-gold text-charcoal-dark text-sm font-medium rounded hover:bg-gold-light transition-colors">{editing ? "Update" : "Create"}</button>
            <button onClick={() => { setEditing(null); setForm({ name: "", slug: "", position: "", biography: "" }); }} className="px-4 py-2 border border-gray-200 text-gray-600 text-sm rounded hover:bg-gray-50 transition-colors">Cancel</button>
          </div>
        </div>
      )}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b border-gray-200 bg-gray-50">
            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Name</th>
            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase hidden md:table-cell">Position</th>
            <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr></thead>
          <tbody>{leaders.map(l => (
            <tr key={l.id} className="border-b border-gray-100 last:border-0">
              <td className="px-6 py-4 text-sm font-medium text-gray-900">{l.name}</td>
              <td className="px-6 py-4 text-sm text-gray-500 hidden md:table-cell">{l.position}</td>
              <td className="px-6 py-4 text-right">
                <button onClick={() => { setEditing(l); setForm({ name: l.name, slug: l.slug, position: l.position, biography: l.biography }); }} className="text-gray-400 hover:text-gold mr-2"><Pencil size={16} /></button>
                <button onClick={() => handleDelete(l.id)} className="text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
              </td>
            </tr>
          ))}{leaders.length === 0 && <tr><td colSpan={3} className="px-6 py-8 text-center text-sm text-gray-400">No leaders.</td></tr>}</tbody>
        </table>
      </div>
    </div>
  );
}
