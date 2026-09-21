'use client';

import { useState } from 'react';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://100.74.92.59:8090');

export default function EditorPage() {
  const [title, setTitle] = useState('Pernikahan Kami');
  const [date, setDate] = useState('2026-12-31');
  const [location, setLocation] = useState('Jakarta, Indonesia');

  const handleSave = async () => {
    try {
      const data = { 
        title, 
        event_date: new Date(date).toISOString(), 
        location 
      };
      
      await pb.collection('events').create(data);
      alert('Data berhasil disimpan ke database, BOSS!');
    } catch (error) {
      console.error(error);
      alert('Gagal simpan data, cek koneksi backend!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Editor Undangan</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form Input */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Judul Acara</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tanggal</label>
              <input 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Lokasi</label>
              <textarea 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                rows={3}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button 
              onClick={handleSave} 
              className="w-full bg-blue-600 text-white font-bold p-3 rounded-md hover:bg-blue-700 transition"
            >
              Simpan ke Database
            </button>
          </div>
        </div>

        {/* Preview Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
          <h3 className="text-4xl font-serif mb-4 text-gray-900">{title}</h3>
          <p className="text-lg text-gray-600 mb-2">{date}</p>
          <p className="text-md text-gray-500">{location}</p>
        </div>
      </div>
    </div>
  );
}
