'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { db } from '@/lib/firebase' 
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy, doc, deleteDoc } from 'firebase/firestore'

const CATEGORIES = ['Meyvə', 'Tərəvəz', 'Ət məhsulları', 'Süd məhsulları', 'Fırın məhsulları', 'Şirniyyat']

// Məhsulun obyekt tipini təyin edirik
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
}

export default function AdminPage() {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('Meyvə')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('') // XƏTA DÜZƏLDİLDİ: [image, setImage] əlavə olundu
  const [products, setProducts] = useState<Product[]>([]) // Bazadan gələn məhsullar üçün state
  const [loading, setLoading] = useState(false)

  // 1. BAZADAN MƏHSULLARI REAL-TIME ÇƏKMƏK
  useEffect(() => {
    // "products" kolleksiyasını yaradılma tarixinə görə sıralayırıq
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
    
    // onSnapshot bazada dəyişiklik olan kimi siyahını avtomatik yeniləyir
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const productList: Product[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        productList.push({
          id: doc.id,
          name: data.name,
          category: data.category,
          price: data.price,
          image: data.image
        });
      });
      setProducts(productList);
    });

    return () => unsubscribe(); // Səhifədən çıxanda dinləməni dayandırır
  }, []);

  // 2. BAZAYA YENİ MƏHSUL ƏLAVƏ ETMƏK
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

  // 3. BAZADAN MƏHSUL SİLMƏK
  const handleDeleteProduct = async (id: string) => {
    if (confirm("Bu məhsulu silmək istədiyinizdən əminsiniz?")) {
      try {
        await deleteDoc(doc(db, "products", id));
        alert("Məhsul silindi!");
      } catch (error) {
        console.error("Silmə xətası:", error);
        alert("Məhsulu silmək mümkün olmadı.");
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10">
      <div className="max-w-6xl mx-auto"> {/* Form və Siyahı yan-yana dura bilsin deyə genişliyi artırdım */}
        
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-emerald-600 font-bold hover:gap-3 transition-all">
            <ArrowLeft size={20} /> Mağazaya qayıt
          </Link>
          <div className="text-emerald-700 font-bold bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200">
            Bio Market Admin
          </div>
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* SOL TƏRƏF: YENİ MƏHSUL ƏLAVƏ ET FORMU */}
          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 border border-gray-100">
            <h1 className="text-2xl font-black text-gray-800 mb-8">Yeni Məhsul Əlavə Et</h1>
            <form onSubmit={handleAddProduct} className="space-y-6">
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 border rounded-xl text-black bg-white" placeholder="Məhsul adı" required />
              <div className="grid grid-cols-2 gap-4">
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="p-3 border rounded-xl text-black bg-white">
                  {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} className="p-3 border rounded-xl text-black bg-white" placeholder="Qiymət (AZN)" required />
              </div>
              <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="w-full p-3 border rounded-xl text-black bg-white" placeholder="Şəkil URL-i" required />
              <Button type="submit" disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-bold transition-all">
                {loading ? "Gözləyin..." : "Məhsulu Bazaya Yaz"}
              </Button>
            </form>
          </div>

          {/* SAĞ TƏRƏF: BAZADAKI MƏHSULLARIN SİYAHISI */}
          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 border border-gray-100">
            <h2 className="text-2xl font-black text-gray-800 mb-8">Məhsullar ({products.length})</h2>
            
            {products.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Bazada hələ heç bir məhsul yoxdur.</p>
            ) : (
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {products.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-4 border rounded-2xl hover:bg-gray-50 transition-all">
                    <div className="flex items-center gap-4">
                      {/* Şəkil önizləməsi */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={product.image} alt={product.name} className="w-12 h-12 rounded-xl object-cover border bg-gray-100" onError={(e)=>{(e.target as HTMLImageElement).src='https://placehold.co/100'}} />
                      <div>
                        <h4 className="font-bold text-gray-800 text-lg capitalize">{product.name}</h4>
                        <p className="text-sm text-gray-500">{product.category} - {product.price} AZN</p>
                      </div>
                    </div>
                    {/* Silmə düyməsi */}
                    <button onClick={() => handleDeleteProduct(product.id)} className="text-red-500 hover:text-red-700 p-2 rounded-xl hover:bg-red-50 transition-all" title="Sil">
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
