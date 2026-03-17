import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Package, Truck, CheckCircle2, Paintbrush, ArrowLeft } from "lucide-react";

export function TrackOrder() {
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState("");
  const [tracking, setTracking] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId) {
      setTracking(true);
    }
  };

  return (
    <div className="bg-[#FFFDF7] min-h-[calc(100vh-80px)] py-8">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2 pl-0 hover:bg-transparent hover:underline text-[#1E1E1E] font-bold">
            <ArrowLeft className="h-5 w-5" />
            Back
          </Button>
        </div>
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#1E1E1E] drop-shadow-[2px_2px_0px_#4ECDC4]">
            Track Your Order
          </h1>
          <p className="mt-4 text-xl font-medium text-[#1E1E1E]/70">
            Enter your order ID or phone number to see the current status.
          </p>
        </div>

        <div className="card-illustrative p-6 sm:p-10">
          <form
            onSubmit={handleTrack}
            className="flex flex-col sm:flex-row gap-4"
          >
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-[#1E1E1E]/50" />
              <input
                type="text"
                placeholder="Order ID (e.g. ORD-12345)"
                className="w-full pl-12 pr-4 py-4 rounded-xl border-4 border-[#1E1E1E] bg-white text-lg font-bold text-[#1E1E1E] placeholder:text-[#1E1E1E]/40 focus:ring-0 focus:outline-none focus:border-[#4ECDC4] transition-colors shadow-[4px_4px_0px_0px_#1E1E1E]"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="sm:w-auto w-full text-lg"
            >
              Track Order
            </Button>
          </form>

          {tracking && (
            <div className="mt-12 pt-12 border-t-4 border-[#1E1E1E] border-dashed">
              <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-black text-[#1E1E1E]">
                    Order #{orderId}
                  </h3>
                  <p className="text-lg font-bold text-[#4ECDC4]">
                    Estimated Delivery: Oct 24, 2023
                  </p>
                </div>
                <div className="bg-[#FFE66D] border-4 border-[#1E1E1E] rounded-full px-4 py-2 font-bold text-[#1E1E1E] shadow-[4px_4px_0px_0px_#1E1E1E] inline-flex items-center gap-2 self-start sm:self-auto">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6B6B] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FF6B6B]"></span>
                  </span>
                  In Progress
                </div>
              </div>

              <div className="relative ml-4 sm:ml-8">
                {/* Vertical Line */}
                <div className="absolute left-[31px] top-8 bottom-8 w-1.5 bg-[#1E1E1E] rounded-full" />

                <div className="space-y-12">
                  {/* Step 1 */}
                  <div className="relative flex items-start gap-6 sm:gap-8">
                    <div className="h-16 w-16 shrink-0 rounded-2xl bg-[#4ECDC4] border-4 border-[#1E1E1E] shadow-[4px_4px_0px_0px_#1E1E1E] flex items-center justify-center z-10">
                      <CheckCircle2
                        className="h-8 w-8 text-[#1E1E1E]"
                        strokeWidth={3}
                      />
                    </div>
                    <div className="pt-2">
                      <h4 className="text-xl font-black text-[#1E1E1E]">
                        Order Confirmed
                      </h4>
                      <p className="text-lg font-medium text-[#1E1E1E]/70">
                        Oct 20, 10:00 AM
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="relative flex items-start gap-6 sm:gap-8">
                    <div className="h-16 w-16 shrink-0 rounded-2xl bg-[#FFE66D] border-4 border-[#1E1E1E] shadow-[4px_4px_0px_0px_#1E1E1E] flex items-center justify-center z-10">
                      <Paintbrush
                        className="h-8 w-8 text-[#1E1E1E]"
                        strokeWidth={3}
                      />
                    </div>
                    <div className="pt-2">
                      <h4 className="text-xl font-black text-[#1E1E1E]">
                        Processing & Printing
                      </h4>
                      <p className="text-lg font-medium text-[#1E1E1E]/70">
                        Your custom design is being prepared.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="relative flex items-start gap-6 sm:gap-8 opacity-50 grayscale">
                    <div className="h-16 w-16 shrink-0 rounded-2xl bg-white border-4 border-[#1E1E1E] shadow-[4px_4px_0px_0px_#1E1E1E] flex items-center justify-center z-10">
                      <Truck
                        className="h-8 w-8 text-[#1E1E1E]"
                        strokeWidth={3}
                      />
                    </div>
                    <div className="pt-2">
                      <h4 className="text-xl font-black text-[#1E1E1E]">
                        Shipped
                      </h4>
                      <p className="text-lg font-medium text-[#1E1E1E]/70">
                        Pending
                      </p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="relative flex items-start gap-6 sm:gap-8 opacity-50 grayscale">
                    <div className="h-16 w-16 shrink-0 rounded-2xl bg-white border-4 border-[#1E1E1E] shadow-[4px_4px_0px_0px_#1E1E1E] flex items-center justify-center z-10">
                      <Package
                        className="h-8 w-8 text-[#1E1E1E]"
                        strokeWidth={3}
                      />
                    </div>
                    <div className="pt-2">
                      <h4 className="text-xl font-black text-[#1E1E1E]">
                        Delivered
                      </h4>
                      <p className="text-lg font-medium text-[#1E1E1E]/70">
                        Pending
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
