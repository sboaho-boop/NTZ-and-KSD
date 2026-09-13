"use client";
import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { PROJECT_STATUSES } from "@/lib/constants";

interface Project { id: string; name: string; slug: string; location: string; sector: string; status: string; description: string; featured: boolean; }

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState({ name: "", slug: "", location: "", sector: "", status: "Planning", description: "", featured: false });

  const load = () => fetch("/api/admin/projects").then(r => r.json()).then(setProjects).catch(() => {});
  useEffect(() => { load(); }, []);

  async function handleSave() {
    const method = editing ? "PUT" : "POST";
    const url = editing ? `/api/admin/projects?id=${editing.id}` : "/api/admin/projects";
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setEditing(null); setForm({ name: "", slug: "", location: "", sector: "", status: "Planning", description: "", featured: false }); load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete?")) return;
    await fetch(`/api/admin/projects?id=${id}`, { method: "DELETE" }); load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="text-2xl font-semibold text-gray-900 mb-1">Projects</h1><p className="text-sm text-gray-500">Manage your projects.</p></div>
        <button onClick={() => { setEditing(null); setForm({ name: "", slug: "", location: "", sector: "", status: "Planning", description: "", featured: false }); }} className="flex items-center gap-2 px-4 py-2 bg-charcoal text-white text-sm rounded hover:bg-charcoal-light transition-colors"><Plus size={16} /> Add Project</button>
      </div>
      {(editing || form.name) && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">{editing ? "Edit" : "Add"} Project</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Name</label><input value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded text-sm outline-none focus:border-gold" /></div>
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Slug</label><input value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded text-sm outline-none focus:border-gold" /></div>
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Location</label><input value={form.location} onChange={e => setForm({...form, location: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded text-sm outline-none focus:border-gold" /></div>
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Sector</label><input value={form.sector} onChange={e => setForm({...form, sector: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded text-sm outline-none focus:border-gold" /></div>
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Status</label><select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded text-sm outline-none focus:border-gold bg-white">{PROJECT_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
            <div className="flex items-end"><label className="flex items-center gap-2 text-sm text-gray-600"><input type="checkbox" checked={form.featured} onChange={e => setForm({...form, featured: e.target.checked})} className="rounded border-gray-300 text-gold focus:ring-gold" /> Featured Project</label></div>
          </div>
          <div className="mb-4"><label className="block text-xs font-medium text-gray-600 mb-1">Description</label><textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={3} className="w-full px-3 py-2 border border-gray-200 rounded text-sm outline-none focus:border-gold resize-none" /></div>
          <div className="flex gap-2">
            <button onClick={handleSave} className="px-4 py-2 bg-gold text-charcoal-dark text-sm font-medium rounded hover:bg-gold-light transition-colors">{editing ? "Update" : "Create"}</button>
            <button onClick={() => { setEditing(null); setForm({ name: "", slug: "", location: "", sector: "", status: "Planning", description: "", featured: false }); }} className="px-4 py-2 border border-gray-200 text-gray-600 text-sm rounded hover:bg-gray-50 transition-colors">Cancel</button>
          </div>
        </div>
      )}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b border-gray-200 bg-gray-50">
            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Name</th>
            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase hidden md:table-cell">Location</th>
            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase hidden md:table-cell">Status</th>
            <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr></thead>
          <tbody>{projects.map(p => (
            <tr key={p.id} className="border-b border-gray-100 last:border-0">
              <td className="px-6 py-4 text-sm font-medium text-gray-900">{p.name}</td>
              <td className="px-6 py-4 text-sm text-gray-500 hidden md:table-cell">{p.location}</td>
              <td className="px-6 py-4 text-sm text-gray-500 hidden md:table-cell">{p.status}</td>
              <td className="px-6 py-4 text-right">
                <button onClick={() => { setEditing(p); setForm({ name: p.name, slug: p.slug, location: p.location, sector: p.sector, status: p.status, description: p.description, featured: p.featured }); }} className="text-gray-400 hover:text-gold mr-2"><Pencil size={16} /></button>
                <button onClick={() => handleDelete(p.id)} className="text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
              </td>
            </tr>
          ))}{projects.length === 0 && <tr><td colSpan={4} className="px-6 py-8 text-center text-sm text-gray-400">No projects.</td></tr>}</tbody>
        </table>
      </div>
    </div>
  );
}
