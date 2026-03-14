'use client'

import { useState, useEffect } from 'react'
import { ShoppingCart, Trash2, Plus, Minus, Package, ChevronLeft, Phone, MapPin, Instagram, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Tiplərin təyini
interface Product {
  id: number
  name: string
  category: string
  price: number | string
  image: string
}

interface CartItem extends Product {
  quantity: number
}

// Başlanğıc Məhsullar
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

  // Səhifə yüklənəndə LocalStorage-dan məlumatları çəkir
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

  // Filtrasiya məntiqi
  const filteredProducts = allProducts.filter(product => {
    const matchesCategory = selectedCategory === 'Hamısı' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Səbət funksiyaları
  const addToCart = (product: Product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id)
      if (exists) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item))
  }

  const removeFromCart = (id: number) => setCart(prev => prev.filter(item => item.id !== id))
  
  const getPrice = (product: Product) => Number(product.price) || 0
  const cartTotal = cart.reduce((sum, item) => sum + (getPrice(item) * item.quantity), 0)

  // SSR xətalarının qarşısını almaq üçün
  if (!mounted) return <div className="min-h-screen bg-white"></div>

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col font-sans">
      
      {/* HEADER - Responsive */}
      <header className="bg-emerald-600 text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 md:py-4 flex items-center justify-between gap-4">
          {/* Logo */}
          <div 
            className="text-lg md:text-2xl font-black flex items-center gap-2 cursor-pointer shrink-0 select-none" 
            onClick={() => { setShowCart(false); setSelectedCategory('Hamısı'); }}
          >
             <Package size={28} className="md:w-8 md:h-8 w-6 h-6" /> 
             <span className="tracking-tighter md:tracking-normal">BİO MARKET</span>
          </div>
          
          {/* Axtarış Paneli - Kompüterdə görünür, Mobildə gizlənir */}
          <div className="hidden md:flex flex-1 max-w-md relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-200" size={20} />
            <input 
              type="text" 
              placeholder="Məhsul axtar..." 
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-emerald-700 border-none text-white outline-none placeholder:text-emerald-300 focus:ring-2 focus:ring-white/30 transition"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Səbət Düyməsi */}
          <button 
            onClick={() => setShowCart(!showCart)} 
            className="relative p-2.5 bg-emerald-500 hover:bg-emerald-400 transition rounded-full shadow-inner shrink-0"
          >
            <ShoppingCart size={24} className="md:w-6 md:h-6 w-5 h-5" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-emerald-600">
                {cart.reduce((a, b) => a + b.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* ƏSAS MƏZMUN */}
      <main className="max-w-7xl mx-auto px-3 md:px-6 py-6 md:py-10 flex-grow w-full">
        {!showCart ? (
          <>
            {/* Mobildə Axtarış Inputu (Ancaq telefonda görünür) */}
            <div className="md:hidden mb-6 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
               <input 
                  type="text" 
                  placeholder="Məhsul axtar..." 
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white border border-gray-200 shadow-sm outline-none focus:ring-2 focus:ring-emerald-500 transition"
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* KATEQORİYALAR - Mobil Scroll Optimizasiyası */}
            <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide -mx-3 px-3">
              {CATEGORIES.map(cat => (
                <button 
                  key={cat} 
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-xl whitespace-nowrap transition-all duration-300 font-bold text-sm md:text-base ${
                    selectedCategory === cat 
                    ? 'bg-emerald-600 text-white shadow-lg scale-105' 
                    : 'bg-white border border-gray-200 text-gray-500 hover:border-emerald-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* MƏHSULLAR - Kompüterdə 4, Telefonda 2 sütun */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8">
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-white border border-gray-100 rounded-2xl md:rounded-3xl p-3 md:p-5 shadow-sm hover:shadow-xl transition-all duration-300 group">
                  <div className="aspect-square bg-gray-50 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 overflow-hidden relative">
                    {product.image?.startsWith('http') ? (
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="h-full w-full object-contain p-2 group-hover:scale-110 transition duration-500" 
                        onError={(e) => { (e.target as HTMLImageElement).src = "https://cdn-icons-png.flaticon.com/512/679/679821.png" }} 
                      />
                    ) : (
                      <span className="text-4xl md:text-6xl group-hover:scale-125 transition duration-500">{product.image}</span>
                    )}
                  </div>
                  <h3 className="font-bold text-sm md:text-lg text-gray-800 line-clamp-1">{product.name}</h3>
                  <p className="text-emerald-700 font-black text-lg md:text-2xl my-1 md:my-3">{getPrice(product).toFixed(2)} AZN</p>
                  <Button 
                    onClick={() => addToCart(product)} 
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl py-5 md:py-7 font-bold text-xs md:text-base transition-all active:scale-95 shadow-md"
                  >
                    Səbətə At
                  </Button>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20 text-gray-400 font-medium bg-white rounded-3xl border border-dashed border-gray-200">
                Axtarışa uyğun məhsul tapılmadı.
              </div>
            )}
          </>
        ) : (
          /* SƏBƏT BÖLMƏSİ */
          <div className="max-w-2xl mx-auto">
            <button onClick={() => setShowCart(false)} className="flex items-center gap-1 text-emerald-600 font-bold mb-8 hover:translate-x-[-4px] transition-all">
              <ChevronLeft size={24} /> Alış-verişə davam et
            </button>
            <h2 className="text-2xl md:text-4xl font-black mb-8 text-gray-800">Səbətiniz</h2>
            {cart.length === 0 ? (
              <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-100 text-gray-400">
                Səbətiniz hələ ki, boşdur.
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="bg-white p-4 md:p-6 rounded-2xl border border-gray-50 flex items-center gap-4 shadow-sm">
                    <div className="w-16 h-16 md:w-24 md:h-24 bg-gray-50 rounded-xl flex items-center justify-center text-3xl shrink-0 overflow-hidden">
                       {item.image?.startsWith('http') ? <img src={item.image} className="h-full object-contain p-1" /> : item.image}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm md:text-xl text-gray-800 truncate">{item.name}</h4>
                      <p className="text-emerald-600 font-black text-sm md:text-lg">{getPrice(item).toFixed(2)} AZN</p>
                    </div>
                    <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-1 md:p-2 border border-gray-100">
                      <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-emerald-600"><Minus size={18}/></button>
                      <span className="font-bold text-sm md:text-lg w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-emerald-600"><Plus size={18}/></button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-500 p-2 transition"><Trash2 size={22}/></button>
                  </div>
                ))}
                
                <div className="mt-10 bg-emerald-600 text-white p-6 md:p-10 rounded-[2rem] shadow-2xl relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="flex justify-between items-center text-2xl md:text-4xl font-black mb-8">
                      <span>Cəmi:</span>
                      <span>{cartTotal.toFixed(2)} AZN</span>
                    </div>
                    <button className="w-full bg-white text-emerald-700 py-4 md:py-6 rounded-2xl font-black text-lg md:text-2xl hover:bg-gray-100 transition-all active:scale-95 shadow-xl">
                      Ödənişə Keç
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* FOOTER - Responsive */}
      <footer className="bg-white border-t border-gray-100 mt-auto px-4 md:px-10 py-12 md:py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          <div className="space-y-4">
            <h3 className="font-black text-2xl text-emerald-600 flex items-center gap-2 justify-center md:justify-start">
              <Package className="text-emerald-500" /> BİO MARKET
            </h3>
            <p className="text-gray-400 font-medium">Azərbaycanın ən geniş seçimli orqanik marketi.</p>
          </div>
          
          <div className="hidden md:block md:ml-auto">
            <h4 className="font-bold text-lg mb-6 text-gray-800">Bölmələr</h4>
            <ul className="space-y-3 text-gray-500 font-medium">
              {CATEGORIES.slice(1, 5).map(cat => (
                <li key={cat} onClick={() => setSelectedCategory(cat)} className="hover:text-emerald-600 cursor-pointer transition flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-300 rounded-full"></div> {cat}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:ml-auto space-y-6">
            <h4 className="font-bold text-lg text-gray-800">Bizimlə Əlaqə</h4>
            <div className="flex flex-col items-center md:items-start gap-4 text-gray-500">
              <a href="tel:+994500000000" className="flex items-center gap-3 hover:text-emerald-600 transition">
                <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600"><Phone size={20} /></div>
                <span className="font-bold">+994 50 000 00 00</span>
              </a>
              <a href="https://instagram.com/bioaz1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-emerald-600 transition">
                <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600"><Instagram size={20} /></div>
                <span className="font-black text-lg">@bioaz1</span>
              </a>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600"><MapPin size={20} /></div>
                <span className="font-medium">Bakı, Azərbaycan</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto border-t border-gray-50 mt-12 pt-8 text-center text-xs text-gray-300">
          &copy; 2026 BİO Market. Bütün hüquqlar qorunur.
        </div>
      </footer>
    </div>
  )
}
