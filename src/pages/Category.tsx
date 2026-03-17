import { useState, useMemo } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Star, Filter, ChevronDown, ArrowLeft } from "lucide-react"

  const products = [
  { id: 1, name: "Minimalist Couple Mug Set", price: 999, rating: 4.9, image: "https://picsum.photos/seed/mugset/400/400", category: "photo-frames" },
  { id: 2, name: "Custom Star Map Frame", price: 1499, rating: 4.8, image: "https://picsum.photos/seed/starmap/400/400", category: "photo-frames" },
  { id: 3, name: "Matching Anniversary Hoodies", price: 2499, rating: 5.0, image: "https://picsum.photos/seed/hoodieset/400/400", category: "tshirts" },
  { id: 4, name: "Personalized Spotify Plaque", price: 899, rating: 4.7, image: "https://picsum.photos/seed/spotify/400/400", category: "resin-art" },
  { id: 5, name: "Photo Collage Frame", price: 1299, rating: 4.6, image: "https://picsum.photos/seed/collage/400/400", category: "photo-frames" },
  { id: 6, name: "Custom Name T-Shirt", price: 699, rating: 4.5, image: "https://picsum.photos/seed/tshirtname/400/400", category: "tshirts" },
  { id: 7, name: "Magic Color Changing Mug", price: 499, rating: 4.8, image: "https://picsum.photos/seed/magicmug/400/400", category: "texture-painting" },
  { id: 8, name: "Couple Initial Hoodies", price: 2199, rating: 4.9, image: "https://picsum.photos/seed/initialhoodie/400/400", category: "tshirts" },
]

export function Category() {
  const { categoryId } = useParams()
  const navigate = useNavigate()
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [sortOption, setSortOption] = useState("featured")
  const [isSortOpen, setIsSortOpen] = useState(false)
  const [priceFilters, setPriceFilters] = useState<string[]>([])

  const handlePriceFilterChange = (value: string) => {
    setPriceFilters(prev => 
      prev.includes(value) ? prev.filter(f => f !== value) : [...prev, value]
    )
  }

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products]
    
    if (categoryId && categoryId !== 'all') {
      if (categoryId === 'trending') {
        result = result.filter(p => p.rating >= 4.8)
      } else {
        result = result.filter(p => p.category === categoryId)
      }
    }

    if (priceFilters.length > 0) {
      result = result.filter(p => {
        return priceFilters.some(filter => {
          if (filter === "0-500") return p.price < 500
          if (filter === "500-1000") return p.price >= 500 && p.price <= 1000
          if (filter === "1000+") return p.price > 1000
          return false
        })
      })
    }

    switch (sortOption) {
      case "price-low":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        result.sort((a, b) => b.price - a.price)
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      default:
        // featured - keep original order
        break
    }

    return result
  }, [categoryId, sortOption, priceFilters])

  return (
    <div className="bg-[#FFFDF7] min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between border-b-4 border-[#1E1E1E] pb-4 mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2 pl-0 hover:bg-transparent hover:underline text-[#1E1E1E] font-bold">
              <ArrowLeft className="h-5 w-5" />
              Back
            </Button>
            <h1 className="text-3xl font-black tracking-tight text-[#1E1E1E] capitalize drop-shadow-[2px_2px_0px_#FF6B6B] whitespace-nowrap">
              {categoryId === 'all' ? 'All Products' : categoryId === 'trending' ? 'Trending Now' : categoryId?.replace('-', ' ')}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative inline-block text-left">
              <Button 
                variant="ghost" 
                className="group inline-flex justify-center text-sm font-bold text-[#1E1E1E] hover:text-[#FF6B6B]"
                onClick={() => setIsSortOpen(!isSortOpen)}
              >
                Sort: {sortOption === 'featured' ? 'Featured' : sortOption === 'price-low' ? 'Price: Low to High' : sortOption === 'price-high' ? 'Price: High to Low' : 'Top Rated'}
                <ChevronDown className="-mr-1 ml-1 h-5 w-5 flex-shrink-0" />
              </Button>
              
              {isSortOpen && (
                <div className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-xl bg-white shadow-[4px_4px_0px_0px_#1E1E1E] border-2 border-[#1E1E1E] ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <button onClick={() => { setSortOption('featured'); setIsSortOpen(false); }} className={`block w-full text-left px-4 py-2 text-sm font-bold ${sortOption === 'featured' ? 'text-[#FF6B6B]' : 'text-[#1E1E1E] hover:bg-gray-100'}`}>Featured</button>
                    <button onClick={() => { setSortOption('price-low'); setIsSortOpen(false); }} className={`block w-full text-left px-4 py-2 text-sm font-bold ${sortOption === 'price-low' ? 'text-[#FF6B6B]' : 'text-[#1E1E1E] hover:bg-gray-100'}`}>Price: Low to High</button>
                    <button onClick={() => { setSortOption('price-high'); setIsSortOpen(false); }} className={`block w-full text-left px-4 py-2 text-sm font-bold ${sortOption === 'price-high' ? 'text-[#FF6B6B]' : 'text-[#1E1E1E] hover:bg-gray-100'}`}>Price: High to Low</button>
                    <button onClick={() => { setSortOption('rating'); setIsSortOpen(false); }} className={`block w-full text-left px-4 py-2 text-sm font-bold ${sortOption === 'rating' ? 'text-[#FF6B6B]' : 'text-[#1E1E1E] hover:bg-gray-100'}`}>Top Rated</button>
                  </div>
                </div>
              )}
            </div>

            <Button
              variant="ghost"
              className="p-2 text-[#1E1E1E] hover:text-[#FF6B6B] lg:hidden"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <span className="sr-only">Filters</span>
              <Filter className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>
        </div>

        <section aria-labelledby="products-heading" className="pb-16 pt-4">
          <h2 id="products-heading" className="sr-only">Products</h2>

          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            {/* Filters */}
            <form className={`lg:block ${isFilterOpen ? 'block' : 'hidden'}`}>
              <h3 className="sr-only">Categories</h3>
              <ul role="list" className="space-y-4 border-b-2 border-[#1E1E1E] pb-6 text-sm font-bold text-[#1E1E1E] whitespace-nowrap">
                <li><Link to="/category/all" className={categoryId === 'all' ? 'text-[#FF6B6B]' : 'hover:text-[#FF6B6B]'}>All Products</Link></li>
                <li><Link to="/category/photo-frames" className={categoryId === 'photo-frames' ? 'text-[#FF6B6B]' : 'hover:text-[#FF6B6B]'}>Photo Frames</Link></li>
                <li><Link to="/category/tshirts" className={categoryId === 'tshirts' ? 'text-[#FF6B6B]' : 'hover:text-[#FF6B6B]'}>Printed ur T-shirt</Link></li>
                <li><Link to="/category/resin-art" className={categoryId === 'resin-art' ? 'text-[#FF6B6B]' : 'hover:text-[#FF6B6B]'}>Resin Art</Link></li>
                <li><Link to="/category/texture-painting" className={categoryId === 'texture-painting' ? 'text-[#FF6B6B]' : 'hover:text-[#FF6B6B]'}>Texture Painting</Link></li>
              </ul>

              <div className="border-b-2 border-[#1E1E1E] py-6">
                <h3 className="-my-3 flow-root">
                  <span className="font-black text-[#1E1E1E]">Price</span>
                </h3>
                <div className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input id="filter-price-0" name="price[]" value="0-500" type="checkbox" checked={priceFilters.includes("0-500")} onChange={() => handlePriceFilterChange("0-500")} className="h-5 w-5 rounded border-2 border-[#1E1E1E] text-[#FF6B6B] focus:ring-[#FF6B6B]" />
                      <label htmlFor="filter-price-0" className="ml-3 text-sm font-bold text-[#1E1E1E]">Under ₹500</label>
                    </div>
                    <div className="flex items-center">
                      <input id="filter-price-1" name="price[]" value="500-1000" type="checkbox" checked={priceFilters.includes("500-1000")} onChange={() => handlePriceFilterChange("500-1000")} className="h-5 w-5 rounded border-2 border-[#1E1E1E] text-[#FF6B6B] focus:ring-[#FF6B6B]" />
                      <label htmlFor="filter-price-1" className="ml-3 text-sm font-bold text-[#1E1E1E]">₹500 - ₹1000</label>
                    </div>
                    <div className="flex items-center">
                      <input id="filter-price-2" name="price[]" value="1000+" type="checkbox" checked={priceFilters.includes("1000+")} onChange={() => handlePriceFilterChange("1000+")} className="h-5 w-5 rounded border-2 border-[#1E1E1E] text-[#FF6B6B] focus:ring-[#FF6B6B]" />
                      <label htmlFor="filter-price-2" className="ml-3 text-sm font-bold text-[#1E1E1E]">Over ₹1000</label>
                    </div>
                  </div>
                </div>
              </div>
            </form>

            {/* Product grid */}
            <div className="lg:col-span-3">
              {filteredAndSortedProducts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-xl font-bold text-[#1E1E1E]">No products found matching your criteria.</p>
                  <Button variant="outline" className="mt-4" onClick={() => { setPriceFilters([]); setSortOption('featured'); }}>Clear Filters</Button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:gap-x-8">
                  {filteredAndSortedProducts.map((product) => (
                    <div key={product.id} className="group relative flex flex-col bg-white border-4 border-[#1E1E1E] shadow-[6px_6px_0px_0px_#1E1E1E] rounded-2xl p-3 sm:p-4 hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_#1E1E1E] transition-all duration-300">
                      <div className="aspect-[4/5] w-full overflow-hidden rounded-xl border-2 border-[#1E1E1E] relative mb-4 bg-[#FFFDF7]">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-[#1E1E1E]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 backdrop-blur-[2px]">
                          <Link to={`/product/${product.id}`}>
                            <Button variant="accent" size="sm" className="rounded-xl font-bold shadow-[4px_4px_0px_0px_#1E1E1E]">Quick View</Button>
                          </Link>
                        </div>
                      </div>
                      <div className="flex flex-col flex-1">
                        <div className="flex items-center gap-1.5 mb-2">
                          <Star className="h-5 w-5 text-[#FF6B6B] fill-[#FF6B6B]" />
                          <span className="font-black text-[#1E1E1E] text-base">{product.rating}</span>
                        </div>
                        <h3 className="text-base sm:text-lg font-black text-[#1E1E1E] line-clamp-2 mb-3 flex-1 leading-tight group-hover:text-[#FF6B6B] transition-colors">
                          <Link to={`/product/${product.id}`}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {product.name}
                          </Link>
                        </h3>
                        <p className="text-xl sm:text-2xl font-black text-[#1E1E1E] mt-auto">₹{product.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
