import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { featuredProducts } from '../data/products';
import ProductCard from '../components/ProductCard';

const categoryMeta = {
  canne:          { label: 'Canne da Pesca',     desc: 'Canne spinning, casting, mosca e ghiaccio' },
  mulinelli:      { label: 'Mulinelli',           desc: 'Spinning, baitcasting e mulinelli mosca' },
  esche:          { label: 'Esche & Artificiali', desc: 'Crankbait, soft bait, jig e mosche' },
  terminal:       { label: 'Terminal Tackle',     desc: 'Ami, piombi, lenze e galleggianti' },
  elettronica:    { label: 'Elettronica',         desc: 'Ecoscandagli, GPS e motori trolling' },
  barche:         { label: 'Kayak & Barche',      desc: 'Kayak da pesca, canoe e barche' },
  abbigliamento:  { label: 'Abbigliamento',       desc: 'Waders, giacche e accessori tecnici' },
  'ice-fishing':  { label: 'Pesca sul Ghiaccio',  desc: 'Canne ice, accessori e abbigliamento invernale' },
  saldi:          { label: 'Saldi e Offerte',     desc: 'I migliori prezzi su tutta la gamma' },
};

const sortOptions = [
  { value: 'featured', label: 'In Evidenza' },
  { value: 'price-asc', label: 'Prezzo: dal piu basso' },
  { value: 'price-desc', label: 'Prezzo: dal piu alto' },
  { value: 'rating', label: 'Piu votati' },
  { value: 'reviews', label: 'Piu recensiti' },
];

function sortProducts(products, sort) {
  const list = [...products];
  switch (sort) {
    case 'price-asc':  return list.sort((a, b) => a.price - b.price);
    case 'price-desc': return list.sort((a, b) => b.price - a.price);
    case 'rating':     return list.sort((a, b) => b.rating - a.rating);
    case 'reviews':    return list.sort((a, b) => b.reviews - a.reviews);
    default:           return list;
  }
}

export default function CategoryPage() {
  const location = useLocation();
  const category  = location.pathname.replace('/', '').split('/')[0];
  const meta      = categoryMeta[category] || { label: category, desc: '' };

  const [sort, setSort] = useState('featured');

  const base    = featuredProducts.filter((p) => p.category === category);
  const products = sortProducts(base.length > 0 ? base : featuredProducts, sort);

  return (
    <div style={{ minHeight: '60vh' }}>
      {/* Breadcrumb */}
      <div style={{ background: '#f4f4f4', padding: '10px 0', fontSize: 12, borderBottom: '1px solid #e0e0e0' }}>
        <div className="container" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Link to="/" style={{ color: '#2d4424', fontWeight: 600 }}>Home</Link>
          <span style={{ color: '#bbb' }}>&rsaquo;</span>
          <span style={{ color: '#666' }}>{meta.label}</span>
        </div>
      </div>

      {/* Category header */}
      <div style={{ background: '#2d4424', padding: '32px 20px' }}>
        <div className="container">
          <h1 style={{ fontSize: 30, fontWeight: 800, color: '#fff', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>
            {meta.label}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14 }}>{meta.desc}</p>
        </div>
      </div>

      <div className="container" style={{ padding: '28px 20px' }}>
        {/* Toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontSize: 14, color: '#666' }}>
            {products.length} prodotti trovati
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <label style={{ fontSize: 13, color: '#555', fontWeight: 600 }}>Ordina per:</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              style={{ padding: '8px 12px', border: '1px solid #ddd', fontSize: 13, borderRadius: 3, cursor: 'pointer' }}
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="product-grid">
          {products.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </div>
    </div>
  );
}

