/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Navbar } from "./components/layout/Navbar"
import { Footer } from "./components/layout/Footer"
import { Home } from "./pages/Home"
import { Category } from "./pages/Category"
import { Product } from "./pages/Product"
import { Editor } from "./pages/Editor"
import { Cart } from "./pages/Cart"
import { Checkout } from "./pages/Checkout"
import { TrackOrder } from "./pages/TrackOrder"

export default function App() {
  return (
    <Router>
      <div className="flex min-h-screen flex-col font-sans">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:categoryId" element={<Category />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/editor/:productId" element={<Editor />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/track" element={<TrackOrder />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}
