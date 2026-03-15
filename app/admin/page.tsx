'use client'

import { useState } from 'react'
import { Package, ArrowLeft, Image as ImageIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
// 1. Firebase-i və bazanı import edirik
import { db } from '@/lib/firebase' 
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

const CATEGORIES = ['Meyvə', 'Tərəvəz', 'Et məhsulları', 'Süd məhsulları', 'Fırın məhsulları', 'Şirniyyat']

export default function AdminPage() {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('Meyvə')
  const [price, setPrice] = useState('')
  const = useState('')
  const [loading, setLoading] = useState(false)

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name || !price || !image) {
      alert("Zəhmət olmasa bütün xanaları doldurun!")
      return
    }

    setLoading(true)

    try {
      // 2. Məlumatı birbaşa Firebase Firestore-a göndəririk
      // Bu məlumat artıq buludda saxlanılacaq və hər kəs görəcək
      await addDoc(collection(db, "products"), {
        name,
        category,
        price: parseFloat(price),
        image,
        createdAt: serverTimestamp() // Məhsulun əlavə edilmə vaxtı
      });

      alert("Məhsul uğurla bazaya əlavə edildi! Artıq hər kəs görə biləcək.");
      
      // Formu təmizləyirik
      setName('')
      setPrice('')
      setImage('')
      setCategory('Meyvə')
      
    } catch (error) {
      console.error("Firebase xətası:", error)
      alert("Xəta baş verdi. Zəhmət olmasa Firebase qaydalarını (Rules) yoxlayın.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-emerald-600 font-bold mb-8 hover:gap-3 transition-all">
          <ArrowLeft size={20} /> Mağazaya qayıt
        </Link>

        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 border border-gray-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl">
              <Package size={32} />
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-800">Yeni Məhsul (Bulud Bazası)</h1>
          </div>

          <form onSubmit={handleAddProduct} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Məhsulun Adı</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition text-black"
                placeholder="Məs: Qırmızı Alma"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Kateqoriya</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition text-black"
                >
                  {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Qiymət (AZN)</label>
                <input 
                  type="number" 
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition text-black"
                  placeholder="0.00"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Şəkil Linki (URL)</label>
              <div className="relative">
                <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition text-black"
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>
              <p className="text-xs text-gray-400 mt-2">Qeyd: Şəkil linkinin işlədiyindən əmin olun.</p>
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6 rounded-2xl font-bold text-lg shadow-lg shadow-emerald-200 transition-all active:scale-95"
            >
              {loading ? "Bazaya yazılır..." : "Məhsulu Hər Kəs Üçün Əlavə Et"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
