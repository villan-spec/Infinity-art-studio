import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Star, Filter, ChevronDown } from "lucide-react"

const products = [
  { id: 1, name: "Minimalist Couple Mug Set", price: "₹999", rating: 4.9, image: "https://picsum.photos/seed/mugset/400/400", category: "mugs" },
  { id: 2, name: "Custom Star Map Frame", price: "₹1499", rating: 4.8, image: "https://picsum.photos/seed/starmap/400/400", category: "wall-art" },
  { id: 3, name: "Matching Anniversary Hoodies", price: "₹2499", rating: 5.0, image: "https://picsum.photos/seed/hoodieset/400/400", category: "hoodies" },
  { id: 4, name: "Personalized Spotify Plaque", price: "₹899", rating: 4.7, image: "https://picsum.photos/seed/spotify/400/400", category: "wall-art" },
  { id: 5, name: "Photo Collage Frame", price: "₹1299", rating: 4.6, image: "https://picsum.photos/seed/collage/400/400", category: "wall-art" },
  { id: 6, name: "Custom Name T-Shirt", price: "₹699", rating: 4.5, image: "https://picsum.photos/seed/tshirtname/400/400", category: "tshirts" },
  { id: 7, name: "Magic Color Changing Mug", price: "₹499", rating: 4.8, image: "https://picsum.photos/seed/magicmug/400/400", category: "mugs" },
  { id: 8, name: "Couple Initial Hoodies", price: "₹2199", rating: 4.9, image: "https://picsum.photos/seed/initialhoodie/400/400", category: "hoodies" },
]

export function Category() {
  const { categoryId } = useParams()
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const filteredProducts = categoryId && categoryId !== 'all' 
    ? products.filter(p => p.category === categoryId)
    : products

  return (
    <div className="bg-[#FFFDF7] min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-baseline justify-between border-b-4 border-[#1E1E1E] pb-6">
          <h1 className="text-5xl font-black tracking-tight text-[#1E1E1E] capitalize drop-shadow-[2px_2px_0px_#FF6B6B]">
            {categoryId === 'all' ? 'All Products' : categoryId?.replace('-', ' ')}
          </h1>

          <div className="flex items-center">
            <div className="relative inline-block text-left">
              <Button variant="ghost" className="group inline-flex justify-center text-sm font-medium text-zinc-700 hover:text-zinc-900">
                Sort
                <ChevronDown className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-zinc-400 group-hover:text-zinc-500" />
              </Button>
            </div>

            <Button
              variant="ghost"
              className="-m-2 ml-4 p-2 text-zinc-400 hover:text-zinc-500 sm:ml-6 lg:hidden"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <span className="sr-only">Filters</span>
              <Filter className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>
        </div>

        <section aria-labelledby="products-heading" className="pb-24 pt-6">
          <h2 id="products-heading" className="sr-only">Products</h2>

          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            {/* Filters */}
            <form className="hidden lg:block">
              <h3 className="sr-only">Categories</h3>
              <ul role="list" className="space-y-4 border-b border-zinc-200 pb-6 text-sm font-medium text-zinc-900">
                <li><Link to="/category/all">All Products</Link></li>
                <li><Link to="/category/mugs">Mugs</Link></li>
                <li><Link to="/category/wall-art">Wall Art</Link></li>
                <li><Link to="/category/hoodies">Hoodies</Link></li>
                <li><Link to="/category/tshirts">T-Shirts</Link></li>
              </ul>

              <div className="border-b border-zinc-200 py-6">
                <h3 className="-my-3 flow-root">
                  <span className="font-medium text-zinc-900">Price</span>
                </h3>
                <div className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input id="filter-price-0" name="price[]" value="0-500" type="checkbox" className="h-4 w-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500" />
                      <label htmlFor="filter-price-0" className="ml-3 text-sm text-zinc-600">Under ₹500</label>
                    </div>
                    <div className="flex items-center">
                      <input id="filter-price-1" name="price[]" value="500-1000" type="checkbox" className="h-4 w-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500" />
                      <label htmlFor="filter-price-1" className="ml-3 text-sm text-zinc-600">₹500 - ₹1000</label>
                    </div>
                    <div className="flex items-center">
                      <input id="filter-price-2" name="price[]" value="1000+" type="checkbox" className="h-4 w-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500" />
                      <label htmlFor="filter-price-2" className="ml-3 text-sm text-zinc-600">Over ₹1000</label>
                    </div>
                  </div>
                </div>
              </div>
            </form>

            {/* Product grid */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:gap-x-8">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="card-illustrative group relative p-4 flex flex-col">
                    <div className="aspect-square overflow-hidden rounded-xl border-4 border-[#1E1E1E] mb-4 relative">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="object-cover w-full h-full"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-[#1E1E1E]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Link to={`/product/${product.id}`}>
                          <Button variant="accent" size="sm" className="rounded-xl">Quick View</Button>
                        </Link>
                      </div>
                    </div>
                    <div className="space-y-2 flex-1 flex flex-col">
                      <div className="flex items-center gap-1 text-[#FF6B6B] text-sm">
                        <Star className="h-5 w-5 fill-current" />
                        <span className="font-bold text-[#1E1E1E]">{product.rating}</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-[#1E1E1E] line-clamp-2 flex-1">
                        <Link to={`/product/${product.id}`}>
                          <span aria-hidden="true" className="absolute inset-0" />
                          {product.name}
                        </Link>
                      </h3>
                      <p className="text-lg font-black text-[#1E1E1E]">{product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
