"use client";
import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { NEWS_CATEGORIES } from "@/lib/constants";

interface Article { id: string; title: string; slug: string; category: string; content: string; summary: string; published: boolean; }

export default function AdminNews() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [editing, setEditing] = useState<Article | null>(null);
  const [form, setForm] = useState({ title: "", slug: "", category: "Company News", content: "", summary: "", published: false });

  const load = () => fetch("/api/admin/news").then(r => r.json()).then(setArticles).catch(() => {});
  useEffect(() => { load(); }, []);

  async function handleSave() {
    const method = editing ? "PUT" : "POST";
    const url = editing ? `/api/admin/news?id=${editing.id}` : "/api/admin/news";
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setEditing(null); setForm({ title: "", slug: "", category: "Company News", content: "", summary: "", published: false }); load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete?")) return;
    await fetch(`/api/admin/news?id=${id}`, { method: "DELETE" }); load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="text-2xl font-semibold text-gray-900 mb-1">News</h1><p className="text-sm text-gray-500">Manage news articles.</p></div>
        <button onClick={() => { setEditing(null); setForm({ title: "", slug: "", category: "Company News", content: "", summary: "", published: false }); }} className="flex items-center gap-2 px-4 py-2 bg-charcoal text-white text-sm rounded hover:bg-charcoal-light transition-colors"><Plus size={16} /> Add Article</button>
      </div>
      {(editing || form.title) && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">{editing ? "Edit" : "Add"} Article</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Title</label><input value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded text-sm outline-none focus:border-gold" /></div>
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Slug</label><input value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded text-sm outline-none focus:border-gold" /></div>
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Category</label><select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded text-sm outline-none focus:border-gold bg-white">{NEWS_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
            <div className="flex items-end"><label className="flex items-center gap-2 text-sm text-gray-600"><input type="checkbox" checked={form.published} onChange={e => setForm({...form, published: e.target.checked})} className="rounded border-gray-300 text-gold focus:ring-gold" /> Published</label></div>
          </div>
          <div className="mb-4"><label className="block text-xs font-medium text-gray-600 mb-1">Summary</label><textarea value={form.summary} onChange={e => setForm({...form, summary: e.target.value})} rows={2} className="w-full px-3 py-2 border border-gray-200 rounded text-sm outline-none focus:border-gold resize-none" /></div>
          <div className="mb-4"><label className="block text-xs font-medium text-gray-600 mb-1">Content</label><textarea value={form.content} onChange={e => setForm({...form, content: e.target.value})} rows={8} className="w-full px-3 py-2 border border-gray-200 rounded text-sm outline-none focus:border-gold resize-none" /></div>
          <div className="flex gap-2">
            <button onClick={handleSave} className="px-4 py-2 bg-gold text-charcoal-dark text-sm font-medium rounded hover:bg-gold-light transition-colors">{editing ? "Update" : "Create"}</button>
            <button onClick={() => { setEditing(null); setForm({ title: "", slug: "", category: "Company News", content: "", summary: "", published: false }); }} className="px-4 py-2 border border-gray-200 text-gray-600 text-sm rounded hover:bg-gray-50 transition-colors">Cancel</button>
          </div>
        </div>
      )}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b border-gray-200 bg-gray-50">
            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Title</th>
            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase hidden md:table-cell">Category</th>
            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase hidden md:table-cell">Status</th>
            <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr></thead>
          <tbody>{articles.map(a => (
            <tr key={a.id} className="border-b border-gray-100 last:border-0">
              <td className="px-6 py-4 text-sm font-medium text-gray-900">{a.title}</td>
              <td className="px-6 py-4 text-sm text-gray-500 hidden md:table-cell">{a.category}</td>
              <td className="px-6 py-4 hidden md:table-cell">{a.published ? <Eye size={14} className="text-green-500" /> : <EyeOff size={14} className="text-gray-300" />}</td>
              <td className="px-6 py-4 text-right">
                <button onClick={() => { setEditing(a); setForm({ title: a.title, slug: a.slug, category: a.category, content: a.content, summary: a.summary, published: a.published }); }} className="text-gray-400 hover:text-gold mr-2"><Pencil size={16} /></button>
                <button onClick={() => handleDelete(a.id)} className="text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
              </td>
            </tr>
          ))}{articles.length === 0 && <tr><td colSpan={4} className="px-6 py-8 text-center text-sm text-gray-400">No articles.</td></tr>}</tbody>
        </table>
      </div>
    </div>
  );
}
