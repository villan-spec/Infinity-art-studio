import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Star, Truck, Shield, RefreshCcw } from "lucide-react"

export function Product() {
  const { productId } = useParams()
  const [selectedImage, setSelectedImage] = useState(0)

  // Mock product data
  const product = {
    id: productId,
    name: "Minimalist Couple Mug Set",
    price: "₹999",
    rating: 4.9,
    reviews: 128,
    description: "Start your morning right with our personalized couple mug set. Made from high-quality ceramic, these mugs are microwave and dishwasher safe. Customize with your names, a special date, or a custom illustration.",
    images: [
      "https://picsum.photos/seed/mugset1/800/800",
      "https://picsum.photos/seed/mugset2/800/800",
      "https://picsum.photos/seed/mugset3/800/800",
      "https://picsum.photos/seed/mugset4/800/800",
    ],
    features: [
      "Premium ceramic material",
      "11 oz capacity",
      "Microwave & dishwasher safe",
      "High-quality sublimation printing",
    ]
  }

  return (
    <div className="bg-[#FFFDF7] min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-12">
          {/* Image gallery */}
          <div className="flex flex-col-reverse">
            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative flex h-24 cursor-pointer items-center justify-center rounded-xl overflow-hidden border-4 border-[#1E1E1E] transition-all ${
                      selectedImage === index ? 'shadow-[4px_4px_0px_0px_#FF6B6B] translate-y-[-2px]' : 'shadow-[4px_4px_0px_0px_#1E1E1E] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#1E1E1E]'
                    }`}
                  >
                    <span className="sr-only">Image {index + 1}</span>
                    <span className="absolute inset-0 overflow-hidden">
                      <img src={image} alt="" className="h-full w-full object-cover object-center" referrerPolicy="no-referrer" />
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="aspect-square w-full rounded-2xl overflow-hidden border-4 border-[#1E1E1E] shadow-[8px_8px_0px_0px_#1E1E1E] bg-white">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="h-full w-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Product info */}
          <div className="mt-10 px-4 sm:px-0 lg:mt-0">
            <h1 className="text-4xl font-black tracking-tight text-[#1E1E1E] drop-shadow-[2px_2px_0px_#4ECDC4]">{product.name}</h1>

            <div className="mt-4">
              <h2 className="sr-only">Product information</h2>
              <p className="text-4xl font-black tracking-tight text-[#1E1E1E]">{product.price}</p>
            </div>

            {/* Reviews */}
            <div className="mt-4">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center text-[#FF6B6B]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-6 w-6 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
                  ))}
                </div>
                <p className="sr-only">{product.rating} out of 5 stars</p>
                <span className="ml-3 text-base font-bold text-[#1E1E1E] underline decoration-2 underline-offset-4 decoration-[#4ECDC4]">
                  {product.reviews} reviews
                </span>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="sr-only">Description</h3>
              <div className="space-y-6 text-lg font-medium text-[#1E1E1E]/80">
                <p>{product.description}</p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold text-[#1E1E1E]">Features</h3>
              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-5 text-lg font-medium text-[#1E1E1E]/80 marker:text-[#FF6B6B]">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-4">
              <Link to={`/editor/${product.id}`} className="w-full">
                <Button variant="accent" size="lg" className="w-full text-xl h-16 rounded-2xl">
                  Customize & Add to Cart
                </Button>
              </Link>
            </div>

            <div className="mt-10 border-t-4 border-[#1E1E1E] pt-8">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#FFE66D] border-2 border-[#1E1E1E] rounded-xl shadow-[2px_2px_0px_0px_#1E1E1E]">
                    <Truck className="h-6 w-6 text-[#1E1E1E]" />
                  </div>
                  <span className="text-base font-bold text-[#1E1E1E]">Free shipping over ₹1500</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#4ECDC4] border-2 border-[#1E1E1E] rounded-xl shadow-[2px_2px_0px_0px_#1E1E1E]">
                    <Shield className="h-6 w-6 text-[#1E1E1E]" />
                  </div>
                  <span className="text-base font-bold text-[#1E1E1E]">Secure payments</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#FF6B6B] border-2 border-[#1E1E1E] rounded-xl shadow-[2px_2px_0px_0px_#1E1E1E]">
                    <RefreshCcw className="h-6 w-6 text-[#1E1E1E]" />
                  </div>
                  <span className="text-base font-bold text-[#1E1E1E]">Easy returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
