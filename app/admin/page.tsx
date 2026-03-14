"use client"

import { useState, useEffect } from "react"
import { PlusCircle, Trash2, Edit, Package, Lock, LogOut } from "lucide-react"

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [password, setPassword] = useState("")
  
  // Məhsullar siyahısı (State)
  const [products, setProducts] = useState([
    { id: 1, name: "Orqanik Alma", price: "2.5", category: "Meyvə", image: "" },
    { id: 2, name: "Kənd Südü", price: "1.8", category: "Süd məhsulları", image: "" },
  ])

  // Yeni məhsul üçün inputlar
  const [newName, setNewName] = useState("")
  const [newPrice, setNewPrice] = useState("")
  const [newCategory, setNewCategory] = useState("Meyvə")
  const [newImage, setNewImage] = useState("")

  useEffect(() => {
    const auth = localStorage.getItem("admin_auth")
    if (auth === "true") setIsLoggedIn(true)
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "admin123") {
      localStorage.setItem("admin_auth", "true")
      setIsLoggedIn(true)
    } else {
      alert("Şifrə yanlışdır!")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("admin_auth")
    setIsLoggedIn(false)
  }

  // --- MƏHSUL ƏLAVƏ ET FUNKSİYASI ---
  const addProduct = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newName || !newPrice) {
      alert("Zəhmət olmasa ad və qiymət daxil edin!")
      return
    }

    const newObj = {
      id: Date.now(), // Unikal ID yaradır
      name: newName,
      price: newPrice,
      category: newCategory,
      image: newImage
    }

    setProducts([newObj, ...products]) // Yeni məhsulu siyahının başına əlavə edir
    
    // Formanı təmizləyirik
    setNewName("")
    setNewPrice("")
    setNewImage("")
  }

  // --- MƏHSUL SİL FUNKSİYASI ---
  const deleteProduct = (id: number) => {
    if (confirm("Bu məhsulu silmək istədiyinizə əminsiniz?")) {
      setProducts(products.filter(p => p.id !== id))
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Admin Girişi</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Şifrə"
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="w-full bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700">Giriş Et</button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Package className="text-green-600" /> Bio Market Admin
          </h1>
          <button onClick={handleLogout} className="text-red-500 font-medium flex items-center gap-2"><LogOut size={18}/> Çıxış</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FORM HİSSƏSİ */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
            <h2 className="text-lg font-bold mb-6">Yeni Məhsul</h2>
            <form onSubmit={addProduct} className="space-y-4">
              <input 
                value={newName} 
                onChange={(e) => setNewName(e.target.value)} 
                type="text" placeholder="Məhsul Adı" 
                className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-green-500" 
              />
              <input 
                value={newPrice} 
                onChange={(e) => setNewPrice(e.target.value)} 
                type="number" placeholder="Qiymət" 
                className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-green-500" 
              />
              <select 
                value={newCategory} 
                onChange={(e) => setNewCategory(e.target.value)} 
                className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-green-500"
              >
                <option>Meyvə</option>
                <option>Tərəvəz</option>
                <option>Süd məhsulları</option>
                <option>Ət məhsulları</option>
              </select>
              <input 
                value={newImage} 
                onChange={(e) => setNewImage(e.target.value)} 
                type="text" placeholder="Şəkil Linki (URL)" 
                className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-green-500" 
              />
              <button type="submit" className="w-full bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 transition">
                Məhsulu Əlavə Et
              </button>
            </form>
          </div>

          {/* SİYAHI HİSSƏSİ */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold mb-6 text-gray-800">Mövcud Məhsullar ({products.length})</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-xs font-bold text-gray-400 uppercase border-b border-gray-50">
                    <th className="pb-4">Adı</th>
                    <th className="pb-4">Kateqoriya</th>
                    <th className="pb-4">Qiymət</th>
                    <th className="pb-4 text-right">Sil</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                      <td className="py-4 font-semibold">{p.name}</td>
                      <td className="py-4 text-sm text-gray-500">{p.category}</td>
                      <td className="py-4 font-bold text-green-600">{p.price} AZN</td>
                      <td className="py-4 text-right">
                        <button onClick={() => deleteProduct(p.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
