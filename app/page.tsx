'use client'

import { useState, useCallback, useEffect } from 'react' // useEffect əlavə edildi
import { ShoppingCart, Search, Menu, X, Home, LogOut, User } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Product {
  id: number
  name: string
  category: string
  price: number
  image: string
  discount?: number
}

interface CartItem extends Product {
  quantity: number
}

// Köhnə PRODUCTS siyahısını bura birbaşa yazmırıq, state-in içində birləşdirəcəyik
const INITIAL_PRODUCTS: Product[] = [
  { id: 1, name: 'Alma (Fuji)', category: 'Meyvə', price: 2.50, image: '🍎', discount: 10 },
  { id: 2, name: 'Pomidor', category: 'Tərəvəz', price: 3.00, image: '🍅' },
  { id: 3, name: 'Salam', category: 'Et məhsulları', price: 8.50, image: '🥩' },
  { id: 4, name: 'Süd', category: 'Süd məhsulları', price: 1.99, image: '🥛', discount: 15 },
  { id: 5, name: 'Peynir', category: 'Süd məhsulları', price: 5.00, image: '🧀' },
  { id: 6, name: 'Çörək', category: 'Fırın məhsulları', price: 0.99, image: '🍞' },
  { id: 12, name: 'Şokolad', category: 'Şirniyyat', price: 3.50, image: '🍫', discount: 5 }
]

const CATEGORIES = ['Hamısı', 'Meyvə', 'Tərəvəz', 'Et məhsulları', 'Süd məhsulları', 'Fırın məhsulları', 'Şirniyyat']

export default function SupermarketPage() {
  const [allProducts, setAllProducts] = useState<Product[]>(INITIAL_PRODUCTS) // Bütün məhsullar üçün state
  const [selectedCategory, setSelectedCategory] = useState('Hamısı')
  const [cart, setCart] = useState<CartItem[]>([])
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showCart, setShowCart] = useState(false)

  // --- ADMİN PANELİNDƏN GƏLƏN MƏHSULLARI YÜKLƏ ---
  useEffect(() => {
    const saved = localStorage.getItem("my_products")
    if (saved) {
      const adminProducts = JSON.parse(saved)
      // Sabit məhsullarla Admin-dən gələnləri birləşdiririk
      setAllProducts([...INITIAL_PRODUCTS, ...adminProducts])
    }
  }, [])

  // İndi filtrləməni allProducts üzərindən edirik
  const filteredProducts = allProducts.filter(product => {
    const matchesCategory = selectedCategory === 'Hamısı' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const addToCart = useCallback((product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id)
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prevCart, { ...product, quantity: 1 }]
    })
  }, [])

  const removeFromCart = useCallback((productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
  }, [])

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
    } else {
      setCart(prevCart =>
        prevCart.map(item => item.id === productId ? { ...item, quantity } : item)
      )
    }
  }, [removeFromCart])

  const totalPrice = cart.reduce((sum, item) => {
    const discountedPrice = item.discount ? item.price * (1 - item.discount / 100) : item.price
    return sum + discountedPrice * item.quantity
  }, 0)

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="bg-secondary text-secondary-foreground sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold flex items-center gap-2">
            🏪 BİO market
          </div>

          <div className="hidden md:flex items-center gap-6 flex-1 mx-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-60" />
              <input
                type="text"
                placeholder="Ürün ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-accent bg-opacity-20 text-secondary-foreground border border-accent border-opacity-30 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => setShowCart(!showCart)} className="relative p-2 hover:bg-accent hover:bg-opacity-20 rounded-lg transition">
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-lg transition">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Katagoriyalar</h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition ${
                  selectedCategory === category ? 'bg-primary text-primary-foreground shadow-lg' : 'bg-card text-card-foreground border hover:bg-muted'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {!showCart && (
            <>
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <div key={product.id} className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition">
                    <div className="p-4 bg-accent bg-opacity-10 text-center text-6xl min-h-[150px] flex items-center justify-center relative">
                      {/* Əgər şəkil linkdirsə img tag-ı, deyilsə emoji kimi göstər */}
                      {product.image.startsWith('http') ? (
                        <img src={product.image} alt={product.name} className="h-24 w-24 object-contain" />
                      ) : (
                        <span>{product.image || '📦'}</span>
                      )}
                      {product.discount && (
                        <div className="absolute top-2 right-2 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-bold">
                          -{product.discount}%
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-1">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{product.category}</p>
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-2xl font-bold text-primary">
                          {product.discount
                            ? (Number(product.price) * (1 - product.discount / 100)).toFixed(2)
                            : Number(product.price).toFixed(2)} AZN
                        </span>
                      </div>
                      <Button onClick={() => addToCart(product)} className="w-full bg-primary text-primary-foreground hover:bg-green-700">
                        Səbətə Əlavə Et
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-muted-foreground">Ürün tapılmadı.</div>
              )}
            </>
          )}

          {/* Səbət Hissəsi */}
          {showCart && (
             <div className="col-span-full">
                <h2 className="text-2xl font-bold mb-6">Alış-veriş Səbəti</h2>
                {/* Səbət detalları burada (köhnə kodun eynisi) */}
                <Button onClick={() => setShowCart(false)} className="mb-4">Geri Qayıt</Button>
                {/* ... (Səbət siyahısı bura gəlir) */}
             </div>
          )}
        </div>
      </main>
    </div>
  )
}
