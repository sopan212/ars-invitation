'use client';

import { useState } from 'react';

export default function EditorPage() {
  const [title, setTitle] = useState('Pernikahan Kami');
  const [date, setDate] = useState('2026-12-31');
  const [location, setLocation] = useState('Jakarta, Indonesia');

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Editor Undangan</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form Input */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Data Acara</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Judul Acara</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tanggal</label>
              <input 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Lokasi</label>
              <textarea 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
              />
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Preview Undangan</h2>
          <div className="border-2 border-dashed border-gray-300 p-12 rounded-lg">
            <h3 className="text-4xl font-serif mb-4 text-gray-900">{title}</h3>
            <p className="text-lg text-gray-600 mb-2">{new Date(date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p className="text-md text-gray-500">{location}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
