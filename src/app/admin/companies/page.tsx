"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface Company {
  id: string;
  name: string;
  slug: string;
  brandName?: string | null;
  description: string;
}

export default function AdminCompanies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [editing, setEditing] = useState<Company | null>(null);
  const [form, setForm] = useState({ name: "", slug: "", brandName: "", description: "" });

  useEffect(() => {
    fetch("/api/admin/companies").then(r => r.json()).then(setCompanies).catch(() => {});
  }, []);

  async function handleSave() {
    const method = editing ? "PUT" : "POST";
    const url = editing ? `/api/admin/companies?id=${editing.id}` : "/api/admin/companies";
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setEditing(null);
    setForm({ name: "", slug: "", brandName: "", description: "" });
    const updated = await fetch("/api/admin/companies").then(r => r.json());
    setCompanies(updated);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this company?")) return;
    await fetch(`/api/admin/companies?id=${id}`, { method: "DELETE" });
    setCompanies(companies.filter(c => c.id !== id));
  }

  function startEdit(company: Company) {
    setEditing(company);
    setForm({ name: company.name, slug: company.slug, brandName: company.brandName || "", description: company.description });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">Companies</h1>
          <p className="text-sm text-gray-500">Manage your companies.</p>
        </div>
        <button onClick={() => { setEditing(null); setForm({ name: "", slug: "", brandName: "", description: "" }); }} className="flex items-center gap-2 px-4 py-2 bg-charcoal text-white text-sm rounded hover:bg-charcoal-light transition-colors">
          <Plus size={16} /> Add Company
        </button>
      </div>

      {/* Form */}
      {(editing || form.name) && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">{editing ? "Edit Company" : "Add Company"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Name</label>
              <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded text-sm outline-none focus:border-gold" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Slug</label>
              <input value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded text-sm outline-none focus:border-gold" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Brand Name</label>
              <input value={form.brandName} onChange={e => setForm({...form, brandName: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded text-sm outline-none focus:border-gold" />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
            <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={3} className="w-full px-3 py-2 border border-gray-200 rounded text-sm outline-none focus:border-gold resize-none" />
          </div>
          <div className="flex gap-2">
            <button onClick={handleSave} className="px-4 py-2 bg-gold text-charcoal-dark text-sm font-medium rounded hover:bg-gold-light transition-colors">
              {editing ? "Update" : "Create"}
            </button>
            <button onClick={() => { setEditing(null); setForm({ name: "", slug: "", brandName: "", description: "" }); }} className="px-4 py-2 border border-gray-200 text-gray-600 text-sm rounded hover:bg-gray-50 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Slug</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase hidden md:table-cell">Brand</th>
              <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {companies.map(company => (
              <tr key={company.id} className="border-b border-gray-100 last:border-0">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{company.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{company.slug}</td>
                <td className="px-6 py-4 text-sm text-gray-500 hidden md:table-cell">{company.brandName || "—"}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => startEdit(company)} className="text-gray-400 hover:text-gold transition-colors mr-2"><Pencil size={16} /></button>
                  <button onClick={() => handleDelete(company.id)} className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
            {companies.length === 0 && (
              <tr><td colSpan={4} className="px-6 py-8 text-center text-sm text-gray-400">No companies yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
