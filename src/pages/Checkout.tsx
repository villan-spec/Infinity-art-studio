import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ShieldCheck, CreditCard, Banknote, ArrowLeft } from "lucide-react"
import { useState } from "react"

export function Checkout() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)

  const cartItems = [
    {
      id: 1,
      name: "Minimalist Couple Mug Set",
      price: 999,
      quantity: 1,
      image: "https://picsum.photos/seed/mugset/100/100",
    },
    {
      id: 2,
      name: "Custom Star Map Frame",
      price: 1499,
      quantity: 1,
      image: "https://picsum.photos/seed/starmap/100/100",
    },
  ]

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <div className="bg-[#FFFDF7] min-h-screen">
      <div className="mx-auto max-w-7xl px-4 pt-8 pb-24 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2 pl-0 hover:bg-transparent hover:underline text-[#1E1E1E] font-bold">
            <ArrowLeft className="h-5 w-5" />
            Back
          </Button>
        </div>
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
          <div className="lg:col-span-7">
            <h1 className="text-5xl font-black tracking-tight text-[#1E1E1E] drop-shadow-[2px_2px_0px_#FF6B6B] mb-12">Checkout</h1>

            {/* Steps indicator */}
            <nav aria-label="Progress" className="mb-12">
              <ol role="list" className="flex items-center">
                <li className="relative pr-8 sm:pr-20">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className={`h-1 w-full ${step > 1 ? 'bg-[#4ECDC4]' : 'bg-[#1E1E1E]/20'}`} />
                  </div>
                  <a href="#" className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#4ECDC4] border-2 border-[#1E1E1E] shadow-[2px_2px_0px_0px_#1E1E1E]">
                    <CheckCircle2 className="h-6 w-6 text-[#1E1E1E]" aria-hidden="true" />
                    <span className="sr-only">Step 1</span>
                  </a>
                </li>
                <li className="relative pr-8 sm:pr-20">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className={`h-1 w-full ${step > 2 ? 'bg-[#4ECDC4]' : 'bg-[#1E1E1E]/20'}`} />
                  </div>
                  <a href="#" className={`relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#1E1E1E] ${step >= 2 ? 'bg-[#4ECDC4] shadow-[2px_2px_0px_0px_#1E1E1E]' : 'bg-white'}`}>
                    {step > 2 ? <CheckCircle2 className="h-6 w-6 text-[#1E1E1E]" /> : <span className="text-base font-bold text-[#1E1E1E]">2</span>}
                  </a>
                </li>
                <li className="relative">
                  <a href="#" className={`relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#1E1E1E] ${step >= 3 ? 'bg-[#4ECDC4] shadow-[2px_2px_0px_0px_#1E1E1E]' : 'bg-white'}`}>
                    <span className="text-base font-bold text-[#1E1E1E]">3</span>
                  </a>
                </li>
              </ol>
            </nav>

            {/* Step 1: Shipping */}
            {step === 1 && (
              <div className="card-illustrative p-6 bg-white">
                <h2 className="text-2xl font-black text-[#1E1E1E] mb-6">Shipping Information</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
                    <div>
                      <label htmlFor="first-name" className="block text-sm font-bold text-[#1E1E1E]">First name</label>
                      <div className="mt-2">
                        <input type="text" id="first-name" name="first-name" autoComplete="given-name" className="block w-full rounded-xl border-2 border-[#1E1E1E] shadow-[2px_2px_0px_0px_#1E1E1E] focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] sm:text-base p-3" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="last-name" className="block text-sm font-bold text-[#1E1E1E]">Last name</label>
                      <div className="mt-2">
                        <input type="text" id="last-name" name="last-name" autoComplete="family-name" className="block w-full rounded-xl border-2 border-[#1E1E1E] shadow-[2px_2px_0px_0px_#1E1E1E] focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] sm:text-base p-3" />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="address" className="block text-sm font-bold text-[#1E1E1E]">Address</label>
                      <div className="mt-2">
                        <input type="text" name="address" id="address" autoComplete="street-address" className="block w-full rounded-xl border-2 border-[#1E1E1E] shadow-[2px_2px_0px_0px_#1E1E1E] focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] sm:text-base p-3" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="city" className="block text-sm font-bold text-[#1E1E1E]">City</label>
                      <div className="mt-2">
                        <input type="text" name="city" id="city" autoComplete="address-level2" className="block w-full rounded-xl border-2 border-[#1E1E1E] shadow-[2px_2px_0px_0px_#1E1E1E] focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] sm:text-base p-3" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="postal-code" className="block text-sm font-bold text-[#1E1E1E]">Postal code</label>
                      <div className="mt-2">
                        <input type="text" name="postal-code" id="postal-code" autoComplete="postal-code" className="block w-full rounded-xl border-2 border-[#1E1E1E] shadow-[2px_2px_0px_0px_#1E1E1E] focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] sm:text-base p-3" />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="phone" className="block text-sm font-bold text-[#1E1E1E]">Phone</label>
                      <div className="mt-2">
                        <input type="tel" name="phone" id="phone" autoComplete="tel" className="block w-full rounded-xl border-2 border-[#1E1E1E] shadow-[2px_2px_0px_0px_#1E1E1E] focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] sm:text-base p-3" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 flex justify-end pt-6 border-t-4 border-[#1E1E1E]">
                    <Button type="button" variant="accent" onClick={() => setStep(2)} className="rounded-xl px-8 text-lg h-14">
                      Continue to Payment
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div className="card-illustrative p-6 bg-white">
                <h2 className="text-2xl font-black text-[#1E1E1E] mb-6">Payment Method</h2>
                
                <div className="space-y-4">
                  <label className="relative flex cursor-pointer rounded-xl border-4 bg-[#FFE66D] p-4 shadow-[4px_4px_0px_0px_#1E1E1E] focus:outline-none border-[#1E1E1E]">
                    <input type="radio" name="payment-method" value="upi" className="sr-only" defaultChecked />
                    <span className="flex flex-1">
                      <span className="flex flex-col">
                        <span className="block text-lg font-black text-[#1E1E1E] flex items-center gap-2"><CreditCard className="h-6 w-6 text-[#1E1E1E]" /> UPI / QR Code</span>
                        <span className="mt-1 flex items-center text-sm font-bold text-[#1E1E1E]/80">Google Pay, PhonePe, Paytm</span>
                      </span>
                    </span>
                    <CheckCircle2 className="h-6 w-6 text-[#1E1E1E]" aria-hidden="true" />
                  </label>

                  <label className="relative flex cursor-pointer rounded-xl border-2 bg-white p-4 shadow-[2px_2px_0px_0px_#1E1E1E] focus:outline-none border-[#1E1E1E]">
                    <input type="radio" name="payment-method" value="card" className="sr-only" />
                    <span className="flex flex-1">
                      <span className="flex flex-col">
                        <span className="block text-lg font-bold text-[#1E1E1E] flex items-center gap-2"><CreditCard className="h-6 w-6 text-[#1E1E1E]" /> Credit / Debit Card</span>
                        <span className="mt-1 flex items-center text-sm font-medium text-[#1E1E1E]/80">Visa, Mastercard, RuPay</span>
                      </span>
                    </span>
                  </label>

                  <label className="relative flex cursor-pointer rounded-xl border-2 bg-white p-4 shadow-[2px_2px_0px_0px_#1E1E1E] focus:outline-none border-[#1E1E1E]">
                    <input type="radio" name="payment-method" value="cod" className="sr-only" />
                    <span className="flex flex-1">
                      <span className="flex flex-col">
                        <span className="block text-lg font-bold text-[#1E1E1E] flex items-center gap-2"><Banknote className="h-6 w-6 text-[#1E1E1E]" /> Cash on Delivery</span>
                        <span className="mt-1 flex items-center text-sm font-medium text-[#1E1E1E]/80">Pay when you receive</span>
                      </span>
                    </span>
                  </label>
                </div>

                <div className="mt-10 flex justify-between pt-6 border-t-4 border-[#1E1E1E]">
                  <Button variant="outline" onClick={() => setStep(1)} className="rounded-xl h-14 px-8 text-lg">Back</Button>
                  <Button type="button" variant="accent" onClick={() => setStep(3)} className="rounded-xl px-8 h-14 text-lg">
                    Review Order
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <div className="card-illustrative p-8 bg-[#4ECDC4] text-center py-16">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white border-4 border-[#1E1E1E] shadow-[4px_4px_0px_0px_#1E1E1E] mb-8">
                  <CheckCircle2 className="h-12 w-12 text-[#FF6B6B]" aria-hidden="true" />
                </div>
                <h2 className="text-4xl font-black tracking-tight text-[#1E1E1E] mb-4 drop-shadow-[2px_2px_0px_white]">Order Placed Successfully!</h2>
                <p className="text-xl font-bold text-[#1E1E1E] mb-10">Your order #ORD-12345 has been confirmed and is being processed.</p>
                <Link to="/track">
                  <Button variant="accent" className="rounded-2xl px-10 h-16 text-xl">Track Order</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Order summary */}
          {step < 3 && (
            <div className="mt-10 lg:col-span-5 lg:mt-0">
              <div className="card-illustrative bg-[#FFE66D] p-6 sticky top-24">
                <h2 className="text-2xl font-black text-[#1E1E1E] mb-6">Order Summary</h2>
                
                <ul role="list" className="divide-y-4 divide-[#1E1E1E] mb-6 border-b-4 border-t-4 border-[#1E1E1E]">
                  {cartItems.map((item) => (
                    <li key={item.id} className="flex py-6">
                      <img src={item.image} alt={item.name} className="h-20 w-20 rounded-xl border-4 border-[#1E1E1E] shadow-[2px_2px_0px_0px_#1E1E1E] object-cover" referrerPolicy="no-referrer" />
                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-bold text-[#1E1E1E]">
                            <h3 className="line-clamp-2">{item.name}</h3>
                            <p className="ml-4 font-black">₹{item.price}</p>
                          </div>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <p className="text-[#1E1E1E]/80 font-bold">Qty {item.quantity}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <dl className="space-y-4 text-base font-medium text-[#1E1E1E] pt-2">
                  <div className="flex items-center justify-between">
                    <dt>Subtotal</dt>
                    <dd className="font-bold">₹{total}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt>Shipping</dt>
                    <dd className="font-bold">Free</dd>
                  </div>
                  <div className="flex items-center justify-between border-t-4 border-[#1E1E1E] pt-4">
                    <dt className="text-xl font-black text-[#1E1E1E]">Total</dt>
                    <dd className="text-xl font-black text-[#1E1E1E]">₹{total}</dd>
                  </div>
                </dl>

                <div className="mt-8 flex items-center gap-2 text-sm font-bold text-[#1E1E1E] justify-center bg-white py-3 rounded-xl border-2 border-[#1E1E1E]">
                  <ShieldCheck className="h-5 w-5 text-[#4ECDC4]" />
                  Secure 256-bit SSL Encryption
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
