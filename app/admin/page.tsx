"use client"

import { useState, useEffect } from "react"
import { PlusCircle, Trash2, Package, LogOut } from "lucide-react"

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [password, setPassword] = useState("")
  
  // Məhsullar siyahısını birbaşa brauzer yaddaşından (localStorage) oxuyuruq
  const [products, setProducts] = useState<any[]>([])

  // Inputlar üçün state-lər
  const [newName, setNewName] = useState("")
  const [newPrice, setNewPrice] = useState("")
  const [newCategory, setNewCategory] = useState("Meyvə")
  const [newImage, setNewImage] = useState("")

  // Səhifə yüklənəndə məlumatları gətir
  useEffect(() => {
    const auth = localStorage.getItem("admin_auth")
    if (auth === "true") setIsLoggedIn(true)

    const savedProducts = localStorage.getItem("my_products")
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts))
    } else {
      // Əgər yaddaş boşdursa, nümunə üçün birini qoyaq
      setProducts([{ id: 1, name: "Nümunə Məhsul", price: "0", category: "Meyvə" }])
    }
  }, [])

  // Hər dəfə products siyahısı dəyişəndə onu yaddaşa yaz
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem("my_products", JSON.stringify(products))
    }
  }, [products])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "admin123") {
      localStorage.setItem("admin_auth", "true")
      setIsLoggedIn(true)
    } else {
      alert("Şifrə yanlışdır!")
    }
  }

  const addProduct = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newName || !newPrice) {
      alert("Zəhmət olmasa Ad və Qiymət yazın!")
      return
    }

    const newObj = {
      id: Date.now(),
      name: newName,
      price: newPrice,
      category: newCategory,
      image: newImage
    }

    // Siyahını yeniləyirik
    setProducts(prevProducts => [newObj, ...prevProducts])
    
    // Formanı təmizləyirik
    setNewName("")
    setNewPrice("")
    setNewImage("")
    
    alert("Məhsul uğurla əlavə edildi!")
  }

  const deleteProduct = (id: number) => {
    const filtered = products.filter(p => p.id !== id)
    setProducts(filtered)
    localStorage.setItem("my_products", JSON.stringify(filtered))
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Girişi</h2>
          <input
            type="password"
            className="w-full p-4 border rounded-xl mb-4 outline-none focus:ring-2 focus:ring-green-500 text-black"
            placeholder="Şifrəni yazın..."
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-green-600 text-white py-4 rounded-xl font-bold">Giriş</button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 text-black">
      <div className="max-w-5xl mx-auto">
        
        <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-sm">
          <h1 className="text-2xl font-bold flex items-center gap-2 text-green-700">
            <Package /> Bio Market Admin
          </h1>
          <button onClick={() => { localStorage.removeItem("admin_auth"); setIsLoggedIn(false); }} className="text-red-500 font-bold">Çıxış</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* FORM */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-bold mb-4">Yeni Məhsul Əlavə Et</h3>
            <form onSubmit={addProduct} className="space-y-4">
              <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Ad" className="w-full p-3 border rounded-lg outline-none focus:border-green-500" />
              <input value={newPrice} onChange={(e) => setNewPrice(e.target.value)} type="number" placeholder="Qiymət" className="w-full p-3 border rounded-lg outline-none focus:border-green-500" />
              <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className="w-full p-3 border rounded-lg bg-white outline-none">
                <option>Meyvə</option>
                <option>Tərəvəz</option>
                <option>Süd məhsulları</option>
              </select>
              <input value={newImage} onChange={(e) => setNewImage(e.target.value)} placeholder="Şəkil URL" className="w-full p-3 border rounded-lg outline-none focus:border-green-500" />
              <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition">Əlavə Et</button>
            </form>
          </div>

          {/* SİYAHI */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-bold mb-4">Məhsullar ({products.length})</h3>
            <div className="space-y-3">
              {products.map((p) => (
                <div key={p.id} className="flex justify-between items-center p-3 border-b">
                  <div>
                    <p className="font-bold">{p.name}</p>
                    <p className="text-sm text-gray-500">{p.category} - {p.price} AZN</p>
                  </div>
                  <button onClick={() => deleteProduct(p.id)} className="text-red-500 p-2 hover:bg-red-50 rounded-full">
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
