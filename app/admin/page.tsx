"use client"

import { useState, useEffect } from "react"
import { PlusCircle, Trash2, Edit, Package, Lock, LogOut } from "lucide-react"

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [password, setPassword] = useState("")
  const [products, setProducts] = useState([
    { id: 1, name: "Orqanik Alma", price: "2.5", category: "Meyvə" },
    { id: 2, name: "Kənd Südü", price: "1.8", category: "Süd məhsulları" },
  ])

  // Sayt açılanda əvvəlcədən giriş edib-etmədiyini yoxla
  useEffect(() => {
    const auth = localStorage.getItem("admin_auth")
    if (auth === "true") setIsLoggedIn(true)
  }, [])

  // Giriş funksiyası
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "admin123") { // Şifrəni buradan dəyişə bilərsən
      localStorage.setItem("admin_auth", "true")
      setIsLoggedIn(true)
    } else {
      alert("Şifrə yanlışdır!")
    }
  }

  // Çıxış funksiyası
  const handleLogout = () => {
    localStorage.removeItem("admin_auth")
    setIsLoggedIn(false)
  }

  // --- 1. GİRİŞ EKRANI (Əgər giriş etməyibsə bu görünəcək) ---
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 p-4 rounded-full text-green-600">
              <Lock size={40} />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Admin Girişi</h2>
          <p className="text-center text-gray-500 mb-8">Davam etmək üçün şifrəni daxil edin</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Şifrə"
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-green-500 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="w-full bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 transition shadow-lg shadow-green-200">
              Giriş Et
            </button>
          </form>
        </div>
      </div>
    )
  }
