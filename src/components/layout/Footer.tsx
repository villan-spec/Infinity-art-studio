import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, Instagram, Facebook, Twitter, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t-4 border-[#1E1E1E] bg-[#4ECDC4] text-[#1E1E1E] relative overflow-hidden">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 w-full h-4 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iIzRFQ0RDNCIvPgo8Y2lyY2xlIGN4PSIxMCIgY3k9IjEwIiByPSI1IiBmaWxsPSIjMUUxRTFFIi8+Cjwvc3ZnPg==')] opacity-20"></div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="space-y-6 text-center md:text-left">
            <motion.div
              whileHover={{ rotate: -2, scale: 1.05 }}
              className="inline-block bg-white px-4 py-2 border-4 border-[#1E1E1E] shadow-[4px_4px_0px_0px_#1E1E1E] rounded-xl transform -rotate-2"
            >
              <h3 className="text-2xl font-black tracking-tight uppercase">
                Infinity Art
              </h3>
            </motion.div>
            <p className="text-lg font-bold bg-[#FFE66D] p-4 border-4 border-[#1E1E1E] shadow-[4px_4px_0px_0px_#1E1E1E] rounded-xl transform rotate-1">
              Create Gifts That Last Forever. Personalized with Love 💙
            </p>
          </div>

          <div className="bg-white p-6 border-4 border-[#1E1E1E] shadow-[6px_6px_0px_0px_#1E1E1E] rounded-2xl transform md:rotate-1 hover:rotate-0 transition-transform">
            <h4 className="mb-6 text-xl font-black uppercase flex items-center gap-2">
              <span className="bg-[#FF6B6B] w-3 h-3 rounded-full border-2 border-[#1E1E1E]"></span>{" "}
              Shop
            </h4>
            <ul className="space-y-4 text-base font-bold">
              {[
                { name: "Couple Collection", link: "/category/couples" },
                { name: "Wall Art", link: "/category/wall-art" },
                { name: "Hoodies", link: "/category/hoodies" },
                { name: "Custom Mugs", link: "/category/mugs" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.link}
                    className="group flex items-center gap-2 hover:text-[#FF6B6B] transition-colors"
                  >
                    <ArrowRight className="h-4 w-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    <span className="group-hover:translate-x-1 transition-transform">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 border-4 border-[#1E1E1E] shadow-[6px_6px_0px_0px_#1E1E1E] rounded-2xl transform md:-rotate-1 hover:rotate-0 transition-transform">
            <h4 className="mb-6 text-xl font-black uppercase flex items-center gap-2">
              <span className="bg-[#FFE66D] w-3 h-3 rounded-full border-2 border-[#1E1E1E]"></span>{" "}
              Support
            </h4>
            <ul className="space-y-4 text-base font-bold">
              {[
                { name: "Track Order", link: "/track" },
                { name: "FAQ", link: "/faq" },
                { name: "Contact Us", link: "/contact" },
                { name: "Shipping Policy", link: "/shipping" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.link}
                    className="group flex items-center gap-2 hover:text-[#4ECDC4] transition-colors"
                  >
                    <ArrowRight className="h-4 w-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    <span className="group-hover:translate-x-1 transition-transform">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center md:text-left flex flex-col items-center md:items-start">
            <h4 className="mb-6 text-xl font-black uppercase bg-white px-4 py-2 border-4 border-[#1E1E1E] shadow-[4px_4px_0px_0px_#1E1E1E] rounded-xl inline-block transform rotate-2">
              Connect
            </h4>
            <div className="flex gap-4 mt-4">
              {[
                { icon: Instagram, color: "hover:bg-[#FF6B6B]" },
                { icon: Facebook, color: "hover:bg-[#4ECDC4]" },
                { icon: Twitter, color: "hover:bg-[#FFE66D]" },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -5, rotate: i % 2 === 0 ? 10 : -10 }}
                  className={`bg-white p-4 border-4 border-[#1E1E1E] shadow-[4px_4px_0px_0px_#1E1E1E] rounded-full transition-colors ${social.color}`}
                >
                  <social.icon className="h-6 w-6 text-[#1E1E1E]" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 text-center border-t-4 border-[#1E1E1E] border-dashed">
          <p className="text-lg font-black flex items-center justify-center gap-2 flex-wrap">
            &copy; {new Date().getFullYear()} Infinity Art Studio. Made with
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              <Heart className="h-5 w-5 text-[#FF6B6B] fill-[#FF6B6B]" />
            </motion.span>
          </p>
        </div>
      </div>
    </footer>
  );
}
