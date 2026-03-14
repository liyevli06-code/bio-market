"use client"

import { useState } from "react"
import { PlusCircle, Trash2, Edit, Package } from "lucide-react"

export default function AdminDashboard() {
  const [products, setProducts] = useState([
    { id: 1, name: "Orqanik Alma", price: "2.5", category: "Meyvə" },
    { id: 2, name: "Kənd Südü", price: "1.8", category: "Süd məhsulları" },
  ])

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Package className="text-green-600" /> Admin Paneli
            </h1>
            <p className="text-gray-500 text-sm">Məhsulları idarə edin</p>
          </div>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition">
            <PlusCircle size={20} /> Yeni Məhsul
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Məhsul Əlavə Etmə Forması */}
          <div className="bg-white p-6 rounded-xl shadow-sm h-fit">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Məhsul Əlavə Et</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">Məhsul Adı</label>
                <input type="text" className="w-full mt-1 p-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-green-500 outline-none" placeholder="məs: Təzə Brokoli" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Qiymət (AZN)</label>
                <input type="number" className="w-full mt-1 p-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-green-500 outline-none" placeholder="məs: 4.50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Kateqoriya</label>
                <select className="w-full mt-1 p-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-green-500 outline-none">
                  <option>Meyvə</option>
                  <option>Tərəvəz</option>
                  <option>Süd məhsulları</option>
                  <option>Ət məhsulları</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Şəkil URL</label>
                <input type="text" className="w-full mt-1 p-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-green-500 outline-none" placeholder="https://..." />
              </div>
              <button className="w-full bg-green-600 text-white py-2 rounded-md font-medium hover:bg-green-700 transition">
                Bazaya Əlavə Et
              </button>
            </form>
          </div>

          {/* Mövcud Məhsullar Siyahısı */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Məhsul Siyahısı</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 text-sm">
                    <th className="py-3 font-medium">Məhsul</th>
                    <th className="py-3 font-medium">Kateqoriya</th>
                    <th className="py-3 font-medium">Qiymət</th>
                    <th className="py-3 font-medium text-right">Əməliyyatlar</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  {products.map((product) => (
                    <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                      <td className="py-4 font-medium">{product.name}</td>
                      <td className="py-4 text-sm text-gray-400">{product.category}</td>
                      <td className="py-4 text-green-600 font-semibold">{product.price} AZN</td>
                      <td className="py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-md transition"><Edit size={18} /></button>
                          <button className="p-2 text-red-500 hover:bg-red-50 rounded-md transition"><Trash2 size={18} /></button>
                        </div>
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
