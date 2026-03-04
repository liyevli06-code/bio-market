'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ChevronDown, Filter } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const allProducts = [
  { id: 1, name: 'Ərzaq Pomidvur 500q', price: 4.99, category: 1, image: '🍅', rating: 4.8 },
  { id: 2, name: 'Təzə Sałata', price: 2.49, category: 1, image: '🥬', rating: 4.6 },
  { id: 3, name: 'Yerkökü 1kq', price: 1.99, category: 1, image: '🥕', rating: 4.7 },
  { id: 4, name: 'Təzə Süt 1L', price: 2.49, category: 2, image: '🥛', rating: 4.9 },
  { id: 5, name: 'Yunan Yoğurtu 500q', price: 3.99, category: 2, image: '🥣', rating: 4.8 },
  { id: 6, name: 'Pendir Bloku 200q', price: 5.99, category: 2, image: '🧀', rating: 4.7 },
  { id: 7, name: 'Toyuq Sinəsi 500q', price: 8.99, category: 3, image: '🍗', rating: 4.9 },
  { id: 8, name: 'Söymən Filetası 400q', price: 12.99, category: 3, image: '🐟', rating: 4.8 },
  { id: 9, name: 'Kıymacaq Ət 500q', price: 7.99, category: 3, image: '🥩', rating: 4.6 },
  { id: 10, name: 'Buğda Çöp Çörəyi', price: 3.29, category: 4, image: '🍞', rating: 4.8 },
  { id: 11, name: 'Zeytun Yağı 500ml', price: 8.99, category: 4, image: '🫒', rating: 4.7 },
  { id: 12, name: 'Pirinç 1kq', price: 4.49, category: 4, image: '🍚', rating: 4.9 },
]

const categories = [
  { id: 1, name: 'Bütün Məhsullar' },
  { id: 1, name: 'Təzə Məhsullar' },
  { id: 2, name: 'Süt Məhsulları' },
  { id: 3, name: 'Ət və Balıq' },
  { id: 4, name: 'Pantri' },
]

function ProductsContent() {
  const searchParams = useSearchParams()
  const categoryId = searchParams.get('category')
  const [sortBy, setSortBy] = useState('popular')
  const [cart, setCart] = useState<number[]>([])

  const filteredProducts = categoryId
    ? allProducts.filter(p => p.category === parseInt(categoryId))
    : allProducts

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price
    if (sortBy === 'price-high') return b.price - a.price
    if (sortBy === 'rating') return b.rating - a.rating
    return 0
  })

  const toggleCart = (id: number) => {
    setCart(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Header Section */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-4xl font-bold text-foreground mb-2">Bizim Məhsullar</h1>
          <p className="text-foreground/70">{filteredProducts.length} məhsul göstərilir</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="flex-1">
        <div className="container mx-auto px-4 max-w-6xl py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="w-full lg:w-48 flex-shrink-0">
              <div className="bg-card rounded-lg p-6 sticky top-4">
                <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filtrləri
                </h2>

                {/* Categories */}
                <div className="mb-6">
                  <h3 className="font-semibold text-foreground mb-3">Kateqoriyalar</h3>
                  <div className="space-y-2">
                    <Link href="/products" className={`block py-2 px-3 rounded text-sm ${!categoryId ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-secondary/10'}`}>
                      Bütün Məhsullar
                    </Link>
                    {categories.slice(1).map(cat => (
                      <Link
                        key={cat.id}
                        href={`/products?category=${cat.id}`}
                        className={`block py-2 px-3 rounded text-sm ${categoryId === String(cat.id) ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-secondary/10'}`}
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="font-semibold text-foreground mb-3">Sırala</h3>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground text-sm"
                  >
                    <option value="popular">Ən Məşhur</option>
                    <option value="price-low">Qiymət: Aşağıdan Yuxarıya</option>
                    <option value="price-high">Qiymət: Yuxarıdan Aşağıya</option>
                    <option value="rating">Ən Yüksək Reytinq</option>
                  </select>
                </div>

                {/* Cart Count */}
                <div className="bg-primary/10 rounded-lg p-4 text-center">
                  <p className="text-sm text-foreground/70 mb-1">Səbətdəki Məhsullar</p>
                  <p className="text-3xl font-bold text-primary">{cart.length}</p>
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <main className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map(product => (
                  <div key={product.id} className="bg-card rounded-lg overflow-hidden hover:shadow-lg transition flex flex-col">
                    <div className="bg-secondary/20 h-48 flex items-center justify-center text-7xl">
                      {product.image}
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{product.name}</h3>
                      <div className="flex items-center gap-1 mb-3">
                        <span className="text-sm text-foreground/70">★ {product.rating}</span>
                      </div>
                      <p className="text-2xl font-bold text-primary mb-4">{product.price.toFixed(2)}₼</p>
                      <button
                        onClick={() => toggleCart(product.id)}
                        className={`w-full py-2 rounded-lg font-medium transition ${
                          cart.includes(product.id)
                            ? 'bg-accent text-accent-foreground hover:bg-accent/90'
                            : 'bg-primary text-primary-foreground hover:bg-primary/90'
                        }`}
                      >
                        {cart.includes(product.id) ? '✓ Səbətdə' : 'Səbətə Əlavə Et'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {sortedProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-lg text-foreground/70 mb-4">Məhsul tapılmadı</p>
                  <Link href="/products" className="text-primary font-semibold hover:underline">
                    Bütün məhsulları görün
                  </Link>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background">Yüklənir...</div>}>
      <ProductsContent />
    </Suspense>
  )
}
