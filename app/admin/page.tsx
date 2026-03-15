'use client'

import { useState } from 'react'
import { Package, ArrowLeft, Image as ImageIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { db } from '@/lib/firebase' 
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

const CATEGORIES = ['Meyvə', 'Tərəvəz', 'Et məhsulları', 'Süd məhsulları', 'Fırın məhsulları', 'Şirniyyat']

export default function AdminPage() {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('Meyvə')
  const [price, setPrice] = useState('')
  const = useState('') // BURA DÜZƏLDİLDİ!
  const [loading, setLoading] = useState(false)

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !price || !image) {
      alert("Zəhmət olmasa bütün xanaları doldurun!")
      return
    }

    setLoading(true)
    try {
      await addDoc(collection(db, "products"), {
        name,
        category,
        price: parseFloat(price),
        image,
        createdAt: serverTimestamp() 
      });
      alert("Məhsul uğurla bazaya əlavə edildi!");
      setName(''); setPrice(''); setImage(''); setCategory('Meyvə');
    } catch (error) {
      console.error("Firebase xətası:", error)
      alert("Xəta baş verdi.")
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
          <h1 className="text-2xl font-black text-gray-800 mb-8">Yeni Məhsul Əlavə Et</h1>
          <form onSubmit={handleAddProduct} className="space-y-6">
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 border rounded-xl text-black" placeholder="Məhsul adı" required />
            <div className="grid grid-cols-2 gap-4">
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="p-3 border rounded-xl text-black">
                {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} className="p-3 border rounded-xl text-black" placeholder="Qiymət" required />
            </div>
            <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="w-full p-3 border rounded-xl text-black" placeholder="Şəkil URL-i" required />
            <Button type="submit" disabled={loading} className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold">
              {loading ? "Gözləyin..." : "Məhsulu Bazaya Yaz"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
