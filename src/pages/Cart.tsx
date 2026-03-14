import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Trash2, Plus, Minus, ArrowRight, Gift } from "lucide-react"

export function Cart() {
  const cartItems = [
    {
      id: 1,
      name: "Minimalist Couple Mug Set",
      price: 999,
      quantity: 1,
      image: "https://picsum.photos/seed/mugset/200/200",
      customization: "Names: John & Jane",
    },
    {
      id: 2,
      name: "Custom Star Map Frame",
      price: 1499,
      quantity: 1,
      image: "https://picsum.photos/seed/starmap/200/200",
      customization: "Date: 14 Feb 2023, Location: Paris",
    },
  ]

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const shipping = subtotal > 1500 ? 0 : 99
  const total = subtotal + shipping

  return (
    <div className="bg-[#FFFDF7] min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-black tracking-tight text-[#1E1E1E] drop-shadow-[2px_2px_0px_#4ECDC4]">Shopping Cart</h1>

        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">Items in your shopping cart</h2>

            <ul role="list" className="divide-y-4 divide-[#1E1E1E] border-b-4 border-t-4 border-[#1E1E1E]">
              {cartItems.map((item) => (
                <li key={item.id} className="flex py-6 sm:py-10">
                  <div className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-24 w-24 rounded-2xl border-4 border-[#1E1E1E] shadow-[4px_4px_0px_0px_#1E1E1E] object-cover object-center sm:h-32 sm:w-32"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-lg font-bold">
                            <Link to={`/product/${item.id}`} className="text-[#1E1E1E] hover:underline decoration-2 underline-offset-4 decoration-[#FF6B6B]">
                              {item.name}
                            </Link>
                          </h3>
                        </div>
                        <div className="mt-1 flex text-sm">
                          <p className="text-[#1E1E1E]/80 font-medium">{item.customization}</p>
                        </div>
                        <p className="mt-2 text-xl font-black text-[#1E1E1E]">₹{item.price}</p>
                      </div>

                      <div className="mt-4 sm:mt-0 sm:pr-9">
                        <div className="flex items-center gap-3">
                          <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl">
                            <Minus className="h-5 w-5" />
                          </Button>
                          <span className="text-[#1E1E1E] font-bold text-lg w-4 text-center">{item.quantity}</span>
                          <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl">
                            <Plus className="h-5 w-5" />
                          </Button>
                        </div>

                        <div className="absolute right-0 top-0">
                          <button type="button" className="-m-2 inline-flex p-2 text-[#FF6B6B] hover:text-[#FF6B6B]/80 transition-colors">
                            <span className="sr-only">Remove</span>
                            <Trash2 className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Upsell Section */}
            <div className="mt-10 card-illustrative p-6 bg-[#FFE66D]">
              <div className="flex items-center gap-3 mb-4">
                <Gift className="h-6 w-6 text-[#1E1E1E]" />
                <h3 className="text-xl font-black text-[#1E1E1E]">Add a matching gift?</h3>
              </div>
              <div className="flex items-center justify-between bg-white p-4 rounded-2xl border-4 border-[#1E1E1E] shadow-[4px_4px_0px_0px_#1E1E1E]">
                <div className="flex items-center gap-4">
                  <img src="https://picsum.photos/seed/giftwrap/100/100" alt="Gift Wrap" className="h-16 w-16 rounded-xl border-2 border-[#1E1E1E] object-cover" referrerPolicy="no-referrer" />
                  <div>
                    <h4 className="text-base font-bold text-[#1E1E1E]">Premium Gift Wrapping</h4>
                    <p className="text-sm font-medium text-[#1E1E1E]/80">Includes a handwritten note</p>
                    <p className="text-base font-black text-[#1E1E1E] mt-1">₹149</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="rounded-xl">Add</Button>
              </div>
            </div>
          </section>

          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="mt-16 card-illustrative px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 bg-[#4ECDC4]"
          >
            <h2 id="summary-heading" className="text-2xl font-black text-[#1E1E1E]">
              Order summary
            </h2>

            <dl className="mt-6 space-y-4 text-base font-medium text-[#1E1E1E]">
              <div className="flex items-center justify-between">
                <dt>Subtotal</dt>
                <dd className="font-bold">₹{subtotal}</dd>
              </div>
              <div className="flex items-center justify-between border-t-4 border-[#1E1E1E] pt-4">
                <dt className="flex items-center">
                  <span>Shipping estimate</span>
                </dt>
                <dd className="font-bold">{shipping === 0 ? 'Free' : `₹${shipping}`}</dd>
              </div>
              <div className="flex items-center justify-between border-t-4 border-[#1E1E1E] pt-4">
                <dt className="text-xl font-black text-[#1E1E1E]">Order total</dt>
                <dd className="text-xl font-black text-[#1E1E1E]">₹{total}</dd>
              </div>
            </dl>

            <div className="mt-8">
              <Link to="/checkout">
                <Button variant="accent" className="w-full text-xl h-16 rounded-2xl flex items-center justify-center gap-2">
                  Proceed to Checkout <ArrowRight className="h-6 w-6" />
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
