'use client'

import { useState, useCallback } from 'react'
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

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Alma (Fuji)',
    category: 'Meyvə',
    price: 2.50,
    image: '🍎',
    discount: 10
  },
  {
    id: 2,
    name: 'Pomidor',
    category: 'Tərəvəz',
    price: 3.00,
    image: '🍅',
  },
  {
    id: 3,
    name: 'Salam',
    category: 'Et məhsulları',
    price: 8.50,
    image: '🥩',
  },
  {
    id: 4,
    name: 'Süd',
    category: 'Süd məhsulları',
    price: 1.99,
    image: '🥛',
    discount: 15
  },
  {
    id: 5,
    name: 'Peynir',
    category: 'Süd məhsulları',
    price: 5.00,
    image: '🧀',
  },
  {
    id: 6,
    name: 'Çörək',
    category: 'Fırın məhsulları',
    price: 0.99,
    image: '🍞',
  },
  {
    id: 7,
    name: 'Xiyar',
    category: 'Tərəvəz',
    price: 1.50,
    image: '🥒',
  },
  {
    id: 8,
    name: 'Naringi',
    category: 'Meyvə',
    price: 2.99,
    image: '🍊',
    discount: 20
  },
  {
    id: 9,
    name: 'Göz Alma',
    category: 'Meyvə',
    price: 4.50,
    image: '👁️',
  },
  {
    id: 10,
    name: 'Kişmiş',
    category: 'Quruqurutma',
    price: 6.00,
    image: '🍇',
  },
  {
    id: 11,
    name: 'Qoz',
    category: 'Qurumalar',
    price: 7.50,
    image: '🥜',
  },
  {
    id: 12,
    name: 'Şokolad',
    category: 'Şirniyyat',
    price: 3.50,
    image: '🍫',
    discount: 5
  }
]

const CATEGORIES = ['Hamısı', 'Meyvə', 'Tərəvəz', 'Et məhsulları', 'Süd məhsulları', 'Fırın məhsulları', 'Şirniyyat']

export default function SupermarketPage() {
  const [selectedCategory, setSelectedCategory] = useState('Hamısı')
  const [cart, setCart] = useState<CartItem[]>([])
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showCart, setShowCart] = useState(false)

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesCategory = selectedCategory === 'Hamısı' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const addToCart = useCallback((product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id)
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
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
        prevCart.map(item =>
          item.id === productId
            ? { ...item, quantity }
            : item
        )
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 flex-1 mx-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-60" />
              <input
                type="text"
                placeholder="Ürün ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-accent bg-opacity-20 text-secondary-foreground placeholder-secondary-foreground placeholder-opacity-60 border border-accent border-opacity-30 focus:outline-none focus:border-accent focus:border-opacity-100"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowCart(!showCart)}
              className="relative p-2 hover:bg-accent hover:bg-opacity-20 rounded-lg transition"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-accent hover:bg-opacity-20 rounded-lg transition"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-60" />
            <input
              type="text"
              placeholder="Ürün ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-accent bg-opacity-20 text-secondary-foreground placeholder-secondary-foreground placeholder-opacity-60 border border-accent border-opacity-30 focus:outline-none focus:border-accent focus:border-opacity-100"
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-accent border-opacity-30">
            <nav className="px-4 py-4 flex flex-col gap-2">
              <button className="flex items-center gap-2 p-2 hover:bg-accent hover:bg-opacity-20 rounded-lg transition w-full text-left">
                <Home className="w-5 h-5" />
                Ev
              </button>
              <button className="flex items-center gap-2 p-2 hover:bg-accent hover:bg-opacity-20 rounded-lg transition w-full text-left">
                <User className="w-5 h-5" />
                Profil
              </button>
              <button className="flex items-center gap-2 p-2 hover:bg-accent hover:bg-opacity-20 rounded-lg transition w-full text-left">
                <LogOut className="w-5 h-5" />
                Çıxış
              </button>
            </nav>
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 text-foreground">Katagoriyalar</h2>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold whitespace-nowrap transition ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-card text-card-foreground border border-border hover:bg-muted'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Products Grid */}
          {!showCart && (
            <>
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <div
                    key={product.id}
                    className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition transform hover:scale-105"
                  >
                    <div className="p-4 bg-accent bg-opacity-10 text-center text-6xl min-h-[150px] flex items-center justify-center relative">
                      {product.image}
                      {product.discount && (
                        <div className="absolute top-2 right-2 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-bold">
                          -{product.discount}%
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-card-foreground mb-1">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{product.category}</p>
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-2xl font-bold text-primary">
                          ${product.discount
                            ? (product.price * (1 - product.discount / 100)).toFixed(2)
                            : product.price.toFixed(2)}
                        </span>
                        {product.discount && (
                          <span className="text-sm line-through text-muted-foreground">
                            ${product.price.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <Button
                        onClick={() => addToCart(product)}
                        className="w-full bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground"
                      >
                        Səbətə Əlavə Et
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground text-lg">Ürün tapılmadı.</p>
                </div>
              )}
            </>
          )}

          {/* Shopping Cart */}
          {showCart && (
            <div className="col-span-full">
              <h2 className="text-2xl font-bold mb-6 text-foreground">Alış-veriş Səbəti</h2>
              {cart.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    {cart.map(item => (
                      <div
                        key={item.id}
                        className="bg-card border border-border rounded-lg p-4 mb-4 flex items-center gap-4"
                      >
                        <div className="text-4xl">{item.image}</div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-card-foreground">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">{item.category}</p>
                          <p className="text-primary font-bold mt-1">
                            ${item.discount
                              ? (item.price * (1 - item.discount / 100)).toFixed(2)
                              : item.price.toFixed(2)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-lg bg-muted hover:bg-accent text-muted-foreground hover:text-accent-foreground transition flex items-center justify-center"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-lg bg-muted hover:bg-accent text-muted-foreground hover:text-accent-foreground transition flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="px-4 py-2 bg-destructive bg-opacity-10 text-destructive hover:bg-opacity-20 rounded-lg transition"
                        >
                          Sil
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Cart Summary */}
                  <div className="bg-card border border-border rounded-lg p-6 h-fit">
                    <h3 className="text-lg font-bold mb-4 text-card-foreground">Xülasə</h3>
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-muted-foreground">
                        <span>Ürün Sayı:</span>
                        <span>{totalItems}</span>
                      </div>
                      <div className="border-t border-border pt-3 flex justify-between text-lg font-bold text-primary">
                        <span>Cəmi:</span>
                        <span>${totalPrice.toFixed(2)}</span>
                      </div>
                    </div>
                    <Button
                      onClick={() => alert('Ödəniş prosesi başlayacaq')}
                      className="w-full bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground text-base py-6"
                    >
                      Ödə
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground text-lg">Səbət boşdur.</p>
                  <Button
                    onClick={() => setShowCart(false)}
                    className="mt-4 bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground"
                  >
                    Alış-veriş etməyə davam et
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground mt-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">ARAZ Market</h3>
              <p className="text-sm opacity-80">Azərbaycanın ən geniş seçimli online supermarketidir.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Katagoriyalar</h4>
              <ul className="space-y-2 text-sm opacity-80">
                {CATEGORIES.slice(1, 4).map(cat => (
                  <li key={cat}>{cat}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Bizimlə Əlaqə</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>📞 +994 50 000 00 00</li>
                <li>📧 info@araz.az</li>
                <li>📍 Bakı, Azərbaycən</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-secondary mt-8 pt-8 text-sm text-center opacity-60">
            <p>&copy; 2024 ARAZ Market. Bütün hüquqlar qorunur.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
