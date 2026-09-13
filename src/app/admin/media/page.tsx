"use client";
import { Upload } from "lucide-react";

export default function AdminMedia() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Media Library</h1>
        <p className="text-sm text-gray-500">Upload and manage images, documents and files.</p>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
        <Upload size={40} className="text-gray-300 mx-auto mb-4" strokeWidth={1} />
        <p className="text-gray-500 mb-2">Media upload coming soon.</p>
        <p className="text-sm text-gray-400">Drag and drop files here, or use the button below.</p>
        <button className="mt-6 px-6 py-2 bg-charcoal text-white text-sm rounded hover:bg-charcoal-light transition-colors">Upload File</button>
      </div>
    </div>
  );
}
