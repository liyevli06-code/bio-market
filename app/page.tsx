export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Header Hissəsi */}
      <header className="max-w-6xl mx-auto flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-green-600">ARAZ Market</h1>
        <div className="flex gap-4">
          <input 
            type="text" 
            placeholder="Ürün ara..." 
            className="border p-2 rounded-lg w-64 outline-none focus:ring-2 focus:ring-green-500"
          />
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg">Səbət</button>
        </div>
      </header>

      {/* Kateqoriyalar */}
      <section className="max-w-6xl mx-auto mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Kateqoriyalar</h2>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {["Hamısı", "Meyvə", "Tərəvəz", "Ət", "Süd", "Şirniyyat"].map((cat) => (
            <button key={cat} className="whitespace-nowrap px-6 py-2 bg-white border rounded-full hover:bg-green-500 hover:text-white transition shadow-sm">
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Məhsullar Şəbəkəsi (Grid) */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Nümunə Məhsul Kartı */}
        <div className="bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition">
          <div className="relative h-40 bg-gray-100 rounded-xl mb-4 flex items-center justify-center text-4xl">
            🍎 <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">-10%</span>
          </div>
          <h3 className="font-bold text-lg">Alma (Fuji)</h3>
          <p className="text-gray-500 text-sm mb-2">Meyvə</p>
          <div className="flex justify-between items-center mt-4">
            <div>
              <span className="text-green-600 font-bold text-xl">$2.25</span>
              <span className="text-gray-400 line-through text-sm ml-2">$2.50</span>
            </div>
            <button className="bg-green-100 text-green-700 px-3 py-2 rounded-lg font-medium hover:bg-green-200">
              Səbətə At
            </button>
          </div>
        </div>
        
        {/* Digər məhsulları da bura əlavə edə bilərsən */}
      </section>
    </main>
  );
}
