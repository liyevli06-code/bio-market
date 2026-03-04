"use client";

import React, { useState } from 'react';

export default function BioMarket() {
  const [cartCount, setCartCount] = useState(0);

  const categories = ["Hamısı", "Orqanik Meyvə", "Təzə Tərəvəz", "Bio Süd", "Təbii Şirələr"];

  return (
    <div className="min-h-screen bg-[#f8faf8] font-sans text-slate-900">
      {/* Üst Menyü (Header) */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-emerald-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🌿</span>
            <h1 className="text-2xl font-black text-emerald-800 tracking-tighter">BİO MARKET</h1>
          </div>
          
          <div className="hidden md:flex flex-1 mx-12">
            <input 
              type="text" 
              placeholder="Təbii məhsul axtar..." 
              className="w-full bg-emerald-50/50 border border-emerald-100 rounded-2xl px-5 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
            />
          </div>

          <button className="relative bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-2xl font-bold transition-all shadow-lg shadow-emerald-200 active:scale-95">
            Səbət ({cartCount})
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Banner hissəsi */}
        <section className="relative overflow-hidden rounded-[2.5rem] bg-emerald-900 text-white p-12 mb-12">
          <div className="relative z-10 max-w-lg">
            <span className="bg-emerald-500/30 text-emerald-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">YENİ MÖVSÜM</span>
            <h2 className="text-5xl font-bold mt-4 mb-6 leading-tight">100% Təbii və Orqanik Məhsullar</h2>
            <p className="text-emerald-100/80 text-lg mb-8">Kənddən birbaşa süfrənizə gələn təravətli meyvə və tərəvəzlər.</p>
            <button className="bg-white text-emerald-900 px-8 py-4 rounded-2xl font-black hover:bg-emerald-50 transition-colors">İndi Alış-veriş Et</button>
          </div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-emerald-800/50 to-transparent flex items-center justify-center text-[10rem] opacity-20 select-none">
            🥦
          </div>
        </section>

        {/* Kateqoriyalar */}
        <section className="mb-12">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="w-8 h-1 bg-emerald-500 rounded-full"></span>
            Kateqoriyalar
          </h3>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {categories.map((cat, index) => (
              <button 
                key={index}
                className={`whitespace-nowrap px-8 py-3 rounded-2xl font-bold transition-all ${
                  index === 0 
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-200" 
                  : "bg-white border border-emerald-50 text-emerald-800 hover:border-emerald-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Məhsul Grid-i */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { name: "Qırmızı Fuji Alma", price: "2.50", oldPrice: "3.20", emoji: "🍎", cat: "Meyvə" },
            { name: "Təzə Brokoli", price: "4.10", oldPrice: null, emoji: "🥦", cat: "Tərəvəz" },
            { name: "Kənd Südü (1L)", price: "1.80", oldPrice: "2.10", emoji: "🥛", cat: "Süd" },
            { name: "Təbii Bal", price: "12.00", oldPrice: null, emoji: "🍯", cat: "Təbii" },
          ].map((item, i) => (
            <div key={i} className="group bg-white p-6 rounded-[2rem] border border-emerald-50 hover:shadow-2xl hover:shadow-emerald-100 transition-all duration-500">
              <div className="relative h-48 bg-emerald-50/50 rounded-[1.5rem] mb-6 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-500">
                {item.emoji}
                {item.oldPrice && (
                  <span className="absolute top-4 left-4 bg-orange-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">Endirim</span>
                )}
              </div>
              <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">{item.cat}</p>
              <h4 className="font-bold text-lg text-slate-800 mb-4">{item.name}</h4>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-slate-900">${item.price}</span>
                  {item.oldPrice && <span className="text-sm text-slate-400 line-through">${item.oldPrice}</span>}
                </div>
                <button 
                  onClick={() => setCartCount(prev => prev + 1)}
                  className="bg-emerald-600 text-white w-12 h-12 rounded-2xl flex items-center justify-center hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-100"
                >
                  <span className="text-xl">+</span>
                </button>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
