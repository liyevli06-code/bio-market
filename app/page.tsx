"use client";

import React, { useState } from 'react';

export default function BioMarket() {
  const [səbət, setSəbət] = useState(0);

  const məhsullar = [
    { id: 1, ad: "Orqanik Alma", qiymət: 2.5, emoji: "🍎" },
    { id: 2, ad: "Təzə Brokoli", qiymət: 4.1, emoji: "🥦" },
    { id: 3, ad: "Kənd Südü", qiymət: 1.8, emoji: "🥛" },
    { id: 4, ad: "Təbii Bal", qiymət: 12.0, emoji: "🍯" }
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-slate-800 font-sans">
      {/* Naviqasiya */}
      <nav className="bg-white border-b border-emerald-100 p-4 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-black text-emerald-700">🌿 BİO MARKET</h1>
          <button className="bg-emerald-600 text-white px-6 py-2 rounded-full font-bold shadow-md">
            Səbət: {səbət}
          </button>
        </div>
      </nav>

      {/* Əsas Hissə */}
      <main className="max-w-5xl mx-auto p-6">
        <header className="bg-emerald-800 text-white rounded-3xl p-10 mb-10 shadow-xl">
          <h2 className="text-4xl font-bold mb-4">Təbiətdən Süfrənizə!</h2>
          <p className="text-emerald-100 opacity-90 text-lg">100% təbii və sağlam məhsulların tək ünvanı.</p>
        </header>

        {/* Məhsullar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {məhsullar.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-2xl border border-emerald-50 shadow-sm hover:shadow-lg transition">
              <div className="text-5xl mb-4 bg-emerald-50 w-20 h-20 flex items-center justify-center rounded-2xl">
                {item.emoji}
              </div>
              <h3 className="font-bold text-lg">{item.ad}</h3>
              <p className="text-emerald-600 font-black text-xl mt-2">${item.qiymət}</p>
              <button 
                onClick={() => setSəbət(səbət + 1)}
                className="w-full mt-4 bg-emerald-50 text-emerald-700 font-bold py-2 rounded-xl hover:bg-emerald-600 hover:text-white transition"
              >
                Səbətə At
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
