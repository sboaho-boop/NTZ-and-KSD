"use client";
import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface Activity { id: string; title: string; slug: string; description: string; order: number; status: string; }

export default function AdminActivities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [editing, setEditing] = useState<Activity | null>(null);
  const [form, setForm] = useState({ title: "", slug: "", description: "", order: 0, status: "active" });

  const load = () => fetch("/api/admin/activities").then(r => r.json()).then(setActivities).catch(() => {});
  useEffect(() => { load(); }, []);

  async function handleSave() {
    const method = editing ? "PUT" : "POST";
    const url = editing ? `/api/admin/activities?id=${editing.id}` : "/api/admin/activities";
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setEditing(null); setForm({ title: "", slug: "", description: "", order: 0, status: "active" }); load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete?")) return;
    await fetch(`/api/admin/activities?id=${id}`, { method: "DELETE" }); load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="text-2xl font-semibold text-gray-900 mb-1">Activities</h1><p className="text-sm text-gray-500">Manage your business activities.</p></div>
        <button onClick={() => { setEditing(null); setForm({ title: "", slug: "", description: "", order: 0, status: "active" }); }} className="flex items-center gap-2 px-4 py-2 bg-charcoal text-white text-sm rounded hover:bg-charcoal-light transition-colors"><Plus size={16} /> Add Activity</button>
      </div>
      {(editing || form.title) && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">{editing ? "Edit" : "Add"} Activity</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Title</label><input value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded text-sm outline-none focus:border-gold" /></div>
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Slug</label><input value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded text-sm outline-none focus:border-gold" /></div>
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Order</label><input type="number" value={form.order} onChange={e => setForm({...form, order: parseInt(e.target.value)})} className="w-full px-3 py-2 border border-gray-200 rounded text-sm outline-none focus:border-gold" /></div>
          </div>
          <div className="mb-4"><label className="block text-xs font-medium text-gray-600 mb-1">Description</label><textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={3} className="w-full px-3 py-2 border border-gray-200 rounded text-sm outline-none focus:border-gold resize-none" /></div>
          <div className="flex gap-2">
            <button onClick={handleSave} className="px-4 py-2 bg-gold text-charcoal-dark text-sm font-medium rounded hover:bg-gold-light transition-colors">{editing ? "Update" : "Create"}</button>
            <button onClick={() => { setEditing(null); setForm({ title: "", slug: "", description: "", order: 0, status: "active" }); }} className="px-4 py-2 border border-gray-200 text-gray-600 text-sm rounded hover:bg-gray-50 transition-colors">Cancel</button>
          </div>
        </div>
      )}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b border-gray-200 bg-gray-50">
            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Title</th>
            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase hidden md:table-cell">Slug</th>
            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase hidden md:table-cell">Order</th>
            <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr></thead>
          <tbody>{activities.map(a => (
            <tr key={a.id} className="border-b border-gray-100 last:border-0">
              <td className="px-6 py-4 text-sm font-medium text-gray-900">{a.title}</td>
              <td className="px-6 py-4 text-sm text-gray-500 hidden md:table-cell">{a.slug}</td>
              <td className="px-6 py-4 text-sm text-gray-500 hidden md:table-cell">{a.order}</td>
              <td className="px-6 py-4 text-right">
                <button onClick={() => { setEditing(a); setForm({ title: a.title, slug: a.slug, description: a.description, order: a.order, status: a.status }); }} className="text-gray-400 hover:text-gold mr-2"><Pencil size={16} /></button>
                <button onClick={() => handleDelete(a.id)} className="text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
              </td>
            </tr>
          ))}{activities.length === 0 && <tr><td colSpan={4} className="px-6 py-8 text-center text-sm text-gray-400">No activities.</td></tr>}</tbody>
        </table>
      </div>
    </div>
  );
}
