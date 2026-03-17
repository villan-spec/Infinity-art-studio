import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Heart, Upload, Truck, Mail, Send } from "lucide-react";

const categories = [
  {
    name: "Photo Frames",
    image: "https://picsum.photos/seed/photoframes/400/500",
    link: "/category/photo-frames",
  },
  {
    name: "Printed ur T-shirt",
    image: "https://picsum.photos/seed/tshirt/400/500",
    link: "/category/tshirts",
  },
  {
    name: "Resin Art",
    image: "https://picsum.photos/seed/resinart/400/500",
    link: "/category/resin-art",
  },
  {
    name: "Texture Painting",
    image: "https://picsum.photos/seed/texturepainting/400/500",
    link: "/category/texture-painting",
  },
];

const trendingProducts = [
  {
    id: 1,
    name: "Minimalist Couple Mug Set",
    price: "₹999",
    rating: 4.9,
    image: "https://picsum.photos/seed/mugset/400/500",
  },
  {
    id: 2,
    name: "Custom Star Map Frame",
    price: "₹1499",
    rating: 4.8,
    image: "https://picsum.photos/seed/starmap/400/500",
  },
  {
    id: 3,
    name: "Matching Anniversary Hoodies",
    price: "₹2499",
    rating: 5.0,
    image: "https://picsum.photos/seed/hoodieset/400/500",
  },
  {
    id: 4,
    name: "Personalized Spotify Plaque",
    price: "₹899",
    rating: 4.7,
    image: "https://picsum.photos/seed/spotify/400/500",
  },
];

const instaImages = [
  "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1484406593171-8140cb927302?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1531366936337-7785a649c71d?w=400&h=400&fit=crop"
];

export function Home() {
  const [instaIndex, setInstaIndex] = useState(0);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#FFFDF7] border-b-4 border-[#1E1E1E] py-16 sm:py-20 lg:pb-28">
        {/* Subtle gradient glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#4ECDC4]/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FF6B6B]/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-[#FFE66D]/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
              className="text-6xl font-black tracking-tight text-[#1E1E1E] sm:text-8xl uppercase leading-[0.9] drop-shadow-sm"
            >
              Create Gifts <br />
              <span className="text-[#FF6B6B] drop-shadow-[4px_4px_0px_#1E1E1E] relative inline-block group">
                That Last
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-4 bg-[#FFE66D] -z-10"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  style={{ originX: 0 }}
                />
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 text-2xl font-bold leading-8 text-[#1E1E1E] max-w-2xl mx-auto drop-shadow-sm"
            >
              Personalized with Love 💙. Design unique, high-quality gifts for
              your loved ones in just a few clicks.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <Link to="/category/all" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto px-10 py-8 text-2xl bg-[#FF6B6B] hover:bg-[#ff5252] text-white border-4 border-[#1E1E1E] shadow-[8px_8px_0px_0px_#1E1E1E] hover:shadow-[4px_4px_0px_0px_#1E1E1E] hover:translate-y-1 hover:translate-x-1 transition-all rounded-2xl"
                >
                  Customize Now
                </Button>
              </Link>
              <Link
                to="/category/all"
                className="group text-2xl font-black text-[#1E1E1E] flex items-center gap-2 hover:text-[#FF6B6B] transition-colors bg-white px-8 py-6 border-4 border-[#1E1E1E] shadow-[8px_8px_0px_0px_#1E1E1E] rounded-2xl hover:shadow-[4px_4px_0px_0px_#1E1E1E] hover:translate-y-1 hover:translate-x-1 w-full sm:w-auto justify-center"
              >
                Browse Gifts
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ArrowRight className="h-8 w-8" />
                </motion.span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Category Section */}
      <section className="py-16 bg-[#FFFDF7] border-b-4 border-[#1E1E1E]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black tracking-tight text-[#1E1E1E] mb-12 text-center">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={category.link}
                className="card-illustrative group relative overflow-hidden aspect-[4/5] block !p-0"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="object-cover w-full h-full border-b-4 border-[#1E1E1E] transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-white p-6 border-t-4 border-[#1E1E1E]">
                  <h3 className="text-xl font-bold text-[#1E1E1E] mb-1 whitespace-nowrap truncate">
                    {category.name}
                  </h3>
                  <span className="text-sm font-bold text-[#FF6B6B] flex items-center gap-1">
                    Shop Now <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-16 bg-[#4ECDC4] border-b-4 border-[#1E1E1E] overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end mb-16 gap-6">
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-5xl sm:text-6xl font-black tracking-tight text-[#1E1E1E] uppercase"
            >
              Trending{" "}
              <span className="text-white drop-shadow-[4px_4px_0px_#1E1E1E]">
                Now
              </span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Link
                to="/category/trending"
                className="group text-xl font-black text-[#1E1E1E] flex items-center gap-2 bg-white px-6 py-3 border-4 border-[#1E1E1E] shadow-[4px_4px_0px_0px_#1E1E1E] hover:shadow-[2px_2px_0px_0px_#1E1E1E] hover:translate-y-[2px] hover:translate-x-[2px] transition-all rounded-xl"
              >
                View all{" "}
                <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative flex flex-col bg-white border-4 border-[#1E1E1E] shadow-[6px_6px_0px_0px_#1E1E1E] rounded-2xl p-3 sm:p-4 hover:shadow-[8px_8px_0px_0px_#1E1E1E] transition-all duration-300"
              >
                <div className="aspect-[4/5] w-full overflow-hidden rounded-xl border-2 border-[#1E1E1E] relative mb-4 bg-[#FFFDF7]">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3 bg-[#FFE66D] border-2 border-[#1E1E1E] rounded-full p-2 shadow-[2px_2px_0px_0px_#1E1E1E] z-10">
                    <Heart className="h-5 w-5 text-[#1E1E1E] hover:fill-[#FF6B6B] hover:text-[#FF6B6B] transition-colors cursor-pointer" />
                  </div>
                  <div className="absolute inset-0 bg-[#1E1E1E]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 backdrop-blur-[2px]">
                    <Link to={`/product/${product.id}`}>
                      <Button className="bg-[#FF6B6B] hover:bg-[#ff5252] text-white border-2 border-[#1E1E1E] shadow-[4px_4px_0px_0px_#1E1E1E] rounded-xl text-lg font-bold px-6 py-6">
                        Quick View
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Star className="h-5 w-5 text-[#FF6B6B] fill-[#FF6B6B]" />
                    <span className="font-black text-[#1E1E1E] text-base">
                      {product.rating}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-[#1E1E1E] line-clamp-2 flex-1 leading-tight group-hover:text-[#4ECDC4] transition-colors mb-3">
                    <Link to={`/product/${product.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </Link>
                  </h3>
                  <div className="flex items-center justify-between mt-auto">
                    <p className="text-2xl sm:text-3xl font-black text-[#1E1E1E]">
                      {product.price}
                    </p>
                    <button className="bg-[#4ECDC4] p-2 sm:p-3 rounded-xl border-2 border-[#1E1E1E] shadow-[2px_2px_0px_0px_#1E1E1E] hover:bg-[#3dbdb4] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none transition-all relative z-10">
                      <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 text-[#1E1E1E]" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-[#FFFDF7] border-b-4 border-[#1E1E1E]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black tracking-tight text-[#1E1E1E]">
              How It Works
            </h2>
            <p className="mt-4 text-lg font-medium text-[#1E1E1E]">
              Create your perfect gift in three simple steps.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <div className="h-24 w-24 rounded-full bg-[#FFE66D] border-4 border-[#1E1E1E] shadow-[6px_6px_0px_0px_#1E1E1E] flex items-center justify-center mb-6 text-[#1E1E1E]">
                <Upload className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold text-[#1E1E1E] mb-2">
                1. Upload Photo
              </h3>
              <p className="text-base font-medium text-[#1E1E1E]">
                Choose your favorite memory to print.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <div className="h-24 w-24 rounded-full bg-[#FF6B6B] border-4 border-[#1E1E1E] shadow-[6px_6px_0px_0px_#1E1E1E] flex items-center justify-center mb-6 text-white">
                <Heart className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold text-[#1E1E1E] mb-2">
                2. Customize Design
              </h3>
              <p className="text-base font-medium text-[#1E1E1E]">
                Add text, filters, and choose your style.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col items-center"
            >
              <div className="h-24 w-24 rounded-full bg-[#4ECDC4] border-4 border-[#1E1E1E] shadow-[6px_6px_0px_0px_#1E1E1E] flex items-center justify-center mb-6 text-[#1E1E1E]">
                <Truck className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold text-[#1E1E1E] mb-2">
                3. We Print & Deliver
              </h3>
              <p className="text-base font-medium text-[#1E1E1E]">
                Fast, secure shipping right to your door.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-[#FF6B6B] border-b-4 border-[#1E1E1E] overflow-hidden relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-8"
          >
            <h2 className="text-5xl sm:text-7xl font-black tracking-tight text-white drop-shadow-[4px_4px_0px_#1E1E1E] uppercase rotate-[-2deg]">
              Loved by <br /> 5000+ Customers
            </h2>
          </motion.div>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <div className="flex items-center gap-1 bg-white px-4 py-2 rounded-full border-4 border-[#1E1E1E] shadow-[4px_4px_0px_0px_#1E1E1E]">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-6 w-6 text-[#FFE66D] fill-[#FFE66D] drop-shadow-[1px_1px_0px_#1E1E1E]"
                />
              ))}
            </div>
            <span className="text-2xl font-black text-[#1E1E1E] bg-[#FFE66D] px-6 py-2 rounded-full border-4 border-[#1E1E1E] shadow-[4px_4px_0px_0px_#1E1E1E] rotate-2">
              4.9/5 Average Rating
            </span>
          </div>

          <div className="relative w-full overflow-hidden py-4">
            <motion.div
              className="flex gap-8 w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
            >
              {[1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map((i, index) => (
                <div
                  key={index}
                  className="bg-white border-4 border-[#1E1E1E] shadow-[8px_8px_0px_0px_#1E1E1E] rounded-2xl w-[350px] p-8 text-left flex-shrink-0 hover:-translate-y-2 transition-transform cursor-grab active:cursor-grabbing"
                >
                  <div className="flex items-center gap-1 text-[#FF6B6B] mb-6">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-6 w-6 fill-current" />
                    ))}
                  </div>
                  <p className="text-[#1E1E1E] font-bold mb-8 text-xl leading-relaxed">
                    "Absolutely beautiful! The print quality is amazing and it
                    arrived so fast. My boyfriend loved his anniversary gift."
                  </p>
                  <div className="flex items-center gap-4 border-t-4 border-[#1E1E1E] pt-6">
                    <div className="h-16 w-16 rounded-full border-4 border-[#1E1E1E] overflow-hidden bg-[#4ECDC4]">
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}`}
                        alt="User"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-black text-2xl text-[#1E1E1E]">
                        Priya S.
                      </p>
                      <p className="text-sm font-bold text-[#4ECDC4] uppercase tracking-wider">
                        Verified Buyer
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Decorative background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-10 left-10 text-9xl">✨</div>
          <div className="absolute bottom-10 right-20 text-9xl">💖</div>
          <div className="absolute top-40 right-40 text-8xl">🎁</div>
        </div>
      </section>

      {/* Instagram Feed */}
      <section className="py-16 bg-[#FFFDF7] border-b-4 border-[#1E1E1E] overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-5xl sm:text-6xl font-black tracking-tight text-[#1E1E1E] uppercase mb-4">
                Follow Us on <br className="hidden md:block" />
                <span className="text-[#FF6B6B] drop-shadow-[3px_3px_0px_#1E1E1E]">
                  Instagram
                </span>
              </h2>
              <p className="text-2xl font-bold text-[#1E1E1E] bg-[#FFE66D] inline-block px-4 py-2 border-4 border-[#1E1E1E] shadow-[4px_4px_0px_0px_#1E1E1E] rounded-xl transform -rotate-2">
                @InfinityArtStudio
              </p>
            </div>
            <motion.a
              href="#"
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#1E1E1E] text-white text-xl font-black px-8 py-4 rounded-2xl border-4 border-[#1E1E1E] shadow-[6px_6px_0px_0px_#4ECDC4] hover:shadow-[2px_2px_0px_0px_#4ECDC4] hover:translate-y-1 hover:translate-x-1 transition-all flex items-center gap-3"
            >
              Follow Now <ArrowRight className="h-6 w-6" />
            </motion.a>
          </div>

          <div className="relative w-full max-w-sm mx-auto h-[400px] sm:h-[450px] flex items-center justify-center cursor-pointer" onClick={() => setInstaIndex((prev) => (prev + 1) % instaImages.length)}>
            {instaImages.map((src, i) => {
              const diff = (i - instaIndex + instaImages.length) % instaImages.length;
              const isVisible = diff <= 2;
              
              return (
                <motion.div
                  key={src}
                  animate={{
                    opacity: isVisible ? (diff === 0 ? 1 : diff === 1 ? 0.8 : 0.5) : 0,
                    scale: isVisible ? (diff === 0 ? 1 : diff === 1 ? 0.9 : 0.8) : 0.8,
                    y: isVisible ? (diff === 0 ? 0 : diff === 1 ? 30 : 60) : 50,
                    zIndex: 30 - diff,
                    filter: isVisible ? (diff === 0 ? "blur(0px)" : diff === 1 ? "blur(2px)" : "blur(4px)") : "blur(4px)",
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute top-0 w-full aspect-square rounded-3xl border-4 border-[#1E1E1E] shadow-[8px_8px_0px_0px_#1E1E1E] bg-white overflow-hidden"
                  style={{ pointerEvents: diff === 0 ? "auto" : "none" }}
                >
                  <img src={src} alt={`Instagram post ${i + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
