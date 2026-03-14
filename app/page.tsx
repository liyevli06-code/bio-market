'use client'

import { useState, useCallback, useEffect } from 'react'
import { ShoppingCart, Search, Trash2, Plus, Minus, Package, ChevronLeft, Phone, Mail, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Product {
  id: number
  name: string
  category: string
  price: number | string
  image: string
  discount?: number | string
}

interface CartItem extends Product {
  quantity: number
}

const INITIAL_PRODUCTS: Product[] = [
  { id: 1, name: 'Orqanik Alma', category: 'Meyvə', price: 2.50, image: '🍎' },
  { id: 2, name: 'Təzə Brokoli', category: 'Tərəvəz', price: 4.1, image: '🥦' },
  { id: 3, name: 'Kənd Südü', category: 'Süd məhsulları', price: 1.8, image: '🥛' },
  { id: 4, name: 'Təbii Bal', category: 'Şirniyyat', price: 12, image: '🍯' }
]

const CATEGORIES = ['Hamısı', 'Meyvə', 'Tərəvəz', 'Et məhsulları', 'Süd məhsulları', 'Fırın məhsulları', 'Şirniyyat']

export default function SupermarketPage() {
  const [allProducts, setAllProducts] = useState<Product[]>(INITIAL_PRODUCTS)
  const [selectedCategory, setSelectedCategory] = useState('Hamısı')
  const [cart, setCart] = useState<CartItem[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [showCart, setShowCart] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("my_products")
    if (saved) {
      try {
        const adminProducts = JSON.parse(saved)
        setAllProducts([...INITIAL_PRODUCTS, ...adminProducts])
      } catch (e) {
        console.error("Məlumat oxunarkən xəta:", e)
      }
    }
  }, [])

  const filteredProducts = allProducts.filter(product => {
    const name = product?.name || ""
    const category = product?.category || ""
    const matchesCategory = selectedCategory === 'Hamısı' || category === selectedCategory
    const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const addToCart = (product: Product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id)
      if (exists) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta
        return newQty > 0 ? { ...item, quantity: newQty } : item
      }
      return item
    }))
  }

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  const getPrice = (product: Product) => Number(product.price) || 0
  const cartTotal = cart.reduce((sum, item) => sum + (getPrice(item) * item.quantity), 0)

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      {/* Header */}
      <header className="bg-emerald-600 text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-xl font-bold flex items-center gap-2 cursor-pointer" onClick={() => setShowCart(false)}>
             <Package /> BİO MARKET
          </div>
          <div className="hidden md:flex flex-1 mx-10">
            <input 
              type="text" 
              placeholder="Axtar..." 
              className="w-full max-w-sm px-4 py-2 rounded-full bg-emerald-700 border-none text-white outline-none placeholder:text-emerald-200"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button onClick={() => setShowCart(!showCart)} className="relative p-2 bg-emerald-500 rounded-full">
            <ShoppingCart size={24} />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cart.reduce((a, b) => a + b.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 flex-grow w-full">
        {!showCart ? (
          <>
            <div className="flex gap-2 overflow-x-auto pb-6 scrollbar-hide">
              {CATEGORIES.map(cat => (
                <button 
                  key={cat} 
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2 rounded-full whitespace-nowrap transition ${selectedCategory === cat ? 'bg-emerald-600 text-white' : 'bg-white border text-gray-600'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-white border rounded-2xl overflow-hidden p-4 shadow-sm hover:shadow-md transition">
                  <div className="h-40 bg-gray-50 rounded-xl flex items-center justify-center mb-4 overflow-hidden">
                    {product.image?.startsWith('http') ? (
                      <img src={product.image} className="h-full w-full object-contain p-2" onError={(e) => { (e.target as HTMLImageElement).src = "https://cdn-icons-png.flaticon.com/512/679/679821.png" }} />
                    ) : (
                      <span className="text-5xl">{product.image || '🍎'}</span>
                    )}
                  </div>
                  <h3 className="font-bold text-lg">{product.name}</h3>
                  <p className="text-emerald-700 font-black text-xl my-2">{getPrice(product).toFixed(2)} AZN</p>
                  <Button onClick={() => addToCart(product)} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl py-6 font-bold">
                    Səbətə At
                  </Button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="max-w-2xl mx-auto">
            <button onClick={() => setShowCart(false)} className="flex items-center gap-2 text-emerald-600 font-bold mb-6 hover:underline">
              <ChevronLeft /> Alış-verişə davam et
            </button>
            <h2 className="text-3xl font-black mb-6">Səbətiniz</h2>
            {cart.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed text-gray-400">
                Səbətiniz hələ ki, boşdur.
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="bg-white p-4 rounded-2xl border flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center text-2xl overflow-hidden">
                       {item.image?.startsWith('http') ? <img src={item.image} className="h-full object-contain" /> : item.image}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold">{item.name}</h4>
                      <p className="text-emerald-600 font-bold">{getPrice(item).toFixed(2)} AZN</p>
                    </div>
                    <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-1">
                      <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-white rounded shadow-sm transition"><Minus size={16}/></button>
                      <span className="font-bold w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-white rounded shadow-sm transition"><Plus size={16}/></button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 p-2 hover:bg-red-50 rounded-full transition"><Trash2 size={20}/></button>
                  </div>
                ))}
                <div className="mt-8 bg-emerald-600 text-white p-6 rounded-3xl shadow-xl">
                  <div className="flex justify-between text-2xl font-black">
                    <span>Cəmi:</span>
                    <span>{cartTotal.toFixed(2)} AZN</span>
                  </div>
                  <button className="w-full bg-white text-emerald-700 mt-6 py-4 rounded-2xl font-black text-lg hover:bg-gray-100 transition">
                    Ödənişə Keç
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* FOOTER - İstədiyin Əlaqə Bölməsi */}
      <footer className="bg-white border-t border-gray-200 mt-auto shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="font-black text-2xl text-emerald-600 mb-4 flex items-center gap-2">
                <Package /> BİO MARKET
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Azərbaycanın ən geniş seçimli və tam orqanik məhsullardan ibarət online supermarketidir.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6 text-gray-800">Sürətli Keçidlər</h4>
              <ul className="space-y-3 text-gray-600">
                {CATEGORIES.slice(1, 5).map(cat => (
                  <li key={cat} className="hover:text-emerald-600 cursor-pointer transition flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div> {cat}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 text-gray-800">Bizimlə Əlaqə</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-600 group">
                  <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition">
                    <Phone size={18} />
                  </div>
                  <span>+994 50 000 00 00</span>
                </li>
                <li className="flex items-center gap-3 text-gray-600 group">
                  <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition">
                    <Mail size={18} />
                  </div>
                  <span className="font-medium">info@bioaz1</span>
                </li>
                <li className="flex items-center gap-3 text-gray-600 group">
                  <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition">
                    <MapPin size={18} />
                  </div>
                  <span>Bakı, Azərbaycan</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>&copy; 2026 BİO Market. Bütün hüquqlar qorunur.</p>
            <div className="flex gap-6">
              <span className="hover:text-emerald-600 cursor-pointer">İstifadəçi şərtləri</span>
              <span className="hover:text-emerald-600 cursor-pointer">Məxfilik siyasəti</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
