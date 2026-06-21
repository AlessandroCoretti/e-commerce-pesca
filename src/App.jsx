import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import { CartProvider } from './context/CartContext';
import TopBar from './components/TopBar';
import Header from './components/Header';
import Navigation, { MobileNav } from './components/Navigation';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';

function AppShell() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <TopBar />
      <Header onOpenMenu={() => setMobileMenuOpen(true)} />
      <Navigation />
      <MobileNav open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/canne" element={<CategoryPage />} />
          <Route path="/mulinelli" element={<CategoryPage />} />
          <Route path="/esche" element={<CategoryPage />} />
          <Route path="/terminal" element={<CategoryPage />} />
          <Route path="/elettronica" element={<CategoryPage />} />
          <Route path="/barche" element={<CategoryPage />} />
          <Route path="/abbigliamento" element={<CategoryPage />} />
          <Route path="/ice-fishing" element={<CategoryPage />} />
          <Route path="/saldi" element={<CategoryPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/ordine-completato" element={<OrderSuccessPage />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/:category" element={<CategoryPage />} />
          <Route
            path="*"
            element={
              <div style={{ textAlign: 'center', padding: '80px 20px' }}>
                <h2 style={{ fontSize: 28, marginBottom: 12 }}>Pagina non trovata</h2>
                <a href="/" style={{ color: '#bc282d', textDecoration: 'underline' }}>
                  Torna alla Homepage
                </a>
              </div>
            }
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AppShell />
      </CartProvider>
    </BrowserRouter>
  );
}
