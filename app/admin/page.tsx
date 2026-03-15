'use client'

import { useState } from 'react'
import { Package, Plus, ArrowLeft, Image as ImageIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const CATEGORIES = ['Meyvə', 'Tərəvəz', 'Et məhsulları', 'Süd məhsulları', 'Fırın məhsulları', 'Şirniyyat']

export default function AdminPage() {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('Meyvə')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false)

  // ƏSAS HİSSƏ: Məhsulu bazaya (Neon) göndərən funksiya
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !price || !image) {
      alert("Zəhmət olmasa bütün xanaları doldurun!")
      return
    }

    setLoading(true)

    const newProduct = { 
      name, 
      category, 
      price: parseFloat(price), 
      image 
    }

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      })

      if (response.ok) {
        alert("Məhsul uğurla bazaya əlavə edildi! Artıq həm telefonda, həm də kompüterdə görünəcək.")
        setName('')
        setPrice('')
        setImage('')
      } else {
        alert("Xəta baş verdi.")
      }
    } catch (error) {
      console.error("Göndərmə xətası:", error)
      alert("Baza ilə əlaqə qurulmadı.")
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
            <h1 className="text-2xl md:text-3xl font-black text-gray-800">Yeni Məhsul</h1>
          </div>

          <form onSubmit={handleAddProduct} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Məhsulun Adı</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition"
                placeholder="Məs: Qırmızı Alma"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Kateqoriya</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition"
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
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition"
                  placeholder="0.00"
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
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <p className="text-xs text-gray-400 mt-2">Qeyd: Google-dan şəkli götürərkən "Копировать URL картинки" seçin.</p>
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6 rounded-2xl font-bold text-lg shadow-lg shadow-emerald-200 transition-all active:scale-95"
            >
              {loading ? "Gözləyin..." : "Məhsulu Bazaya Əlavə Et"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
