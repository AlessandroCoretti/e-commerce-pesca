import { useState } from 'react';
import { Link } from 'react-router-dom';
import logoSito from '../assets/logo-sito.jpg';
import { useCart } from '../context/CartContext';

function IconStoreFinder() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function IconUser() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function IconHeart() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  );
}

function IconCart() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
    </svg>
  );
}

export default function Header({ onOpenMenu }) {
  const [query, setQuery] = useState('');
  const { totalItems } = useCart();

  return (
    <header className="main-header">
      <div className="main-header__inner">
        <Link to="/" className="header-logo">
          <img src={logoSito} alt="Miky Pesca" style={{ height: 64, width: 64, objectFit: 'cover', borderRadius: 4 }} />
        </Link>

        <div className="header-actions">
          <Link to="/stores" className="header-action">
            <IconStoreFinder />
            <span>Negozi</span>
          </Link>
          <Link to="/account" className="header-action">
            <IconUser />
            <span>Accedi</span>
          </Link>
          <Link to="/wishlist" className="header-action">
            <IconHeart />
            <span>Lista</span>
          </Link>
          <Link to="/cart" className="header-action cart-wrap">
            <IconCart />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            <span>Carrello</span>
          </Link>
        </div>

        {/* Hamburger - visible only on mobile via CSS */}
        <button
          className={`hamburger${false ? ' hamburger--open' : ''}`}
          onClick={onOpenMenu}
          aria-label="Apri menu"
        >
          <span className="hamburger__line" />
          <span className="hamburger__line" />
          <span className="hamburger__line" />
        </button>

        <form className="header-search" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Cerca canne, mulinelli, esche..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Cerca prodotti"
          />
          <button type="submit">Cerca</button>
        </form>
      </div>
    </header>
  );
}
