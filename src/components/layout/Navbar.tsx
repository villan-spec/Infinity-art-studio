import { Link } from "react-router-dom"
import { ShoppingBag, User, Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "motion/react"

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/category/all" },
    { name: "Track Order", path: "/track" },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b-4 border-[#1E1E1E] bg-[#FFFDF7]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-3">
            <img src="https://i.ibb.co/hxfDdcJC/transparent-Photoroom-10.png" alt="Infinity Art Logo" className="h-10 w-10 object-contain" />
            <span className="text-2xl font-black tracking-tight text-[#1E1E1E]">
              Infinity Art
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-base font-bold text-[#1E1E1E] transition-transform hover:-translate-y-0.5 hover:text-[#FF6B6B]"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link to="/account" className="hidden sm:block">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>
          </Link>
          <Link to="/cart">
            <Button variant="outline" size="icon" className="relative bg-white">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#FF6B6B] border-2 border-[#1E1E1E] text-xs font-black text-white">
                2
              </span>
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t-4 border-[#1E1E1E] bg-[#FFE66D] md:hidden"
          >
            <div className="flex flex-col space-y-4 px-4 py-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-bold text-[#1E1E1E] hover:text-[#FF6B6B]"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/account"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 text-lg font-bold text-[#1E1E1E] hover:text-[#FF6B6B]"
              >
                <User className="h-5 w-5" />
                Account
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
