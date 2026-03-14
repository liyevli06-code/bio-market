"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Burdakı "admin123" sənin şifrəndir, istədiyinlə dəyişə bilərsən
    if (password === "admin123") {
      document.cookie = "is_admin=true; path=/;" // Girişi yadda saxlayır
      router.push("/admin") // Düzdürsə adminə göndər
    } else {
      alert("Şifrə səhvdir!")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Admin Girişi</h2>
        <input
          type="password"
          placeholder="Şifrəni daxil edin"
          className="w-full p-3 border rounded-lg mb-4 outline-none focus:ring-2 focus:ring-green-500"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition">
          Giriş Et
        </button>
      </form>
    </div>
  )
}
