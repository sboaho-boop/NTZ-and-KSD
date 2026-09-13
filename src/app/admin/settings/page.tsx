"use client";
import { useEffect, useState } from "react";

interface Setting { key: string; value: string; }

export default function AdminSettings() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings").then(r => r.json()).then(data => {
      setSettings(data.map((s: Setting) => ({ key: s.key, value: s.value })));
    }).catch(() => {});
  }, []);

  function updateValue(key: string, value: string) {
    setSettings(prev => prev.map(s => s.key === key ? { ...s, value } : s));
  }

  async function handleSave() {
    setSaving(true);
    await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const fields = [
    { key: "site_name", label: "Site Name" },
    { key: "site_tagline", label: "Site Tagline" },
    { key: "management_quote", label: "Management Quote", type: "textarea" },
    { key: "quote_author", label: "Quote Author" },
    { key: "ntz_address", label: "NTZ Address", type: "textarea" },
    { key: "ksd_address", label: "KSD Address", type: "textarea" },
    { key: "email_primary", label: "Primary Email" },
    { key: "email_secondary", label: "Secondary Email" },
    { key: "map_center_lat", label: "Map Latitude" },
    { key: "map_center_lng", label: "Map Longitude" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">Settings</h1>
          <p className="text-sm text-gray-500">Manage site-wide settings and content.</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="px-6 py-2 bg-gold text-charcoal-dark text-sm font-medium rounded hover:bg-gold-light disabled:opacity-50 transition-colors">
          {saving ? "Saving..." : saved ? "Saved!" : "Save Settings"}
        </button>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
        {fields.map(field => {
          const setting = settings.find(s => s.key === field.key);
          return (
            <div key={field.key}>
              <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wider">{field.label}</label>
              {field.type === "textarea" ? (
                <textarea
                  value={setting?.value || ""}
                  onChange={e => updateValue(field.key, e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded text-sm outline-none focus:border-gold resize-none"
                />
              ) : (
                <input
                  value={setting?.value || ""}
                  onChange={e => updateValue(field.key, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded text-sm outline-none focus:border-gold"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
