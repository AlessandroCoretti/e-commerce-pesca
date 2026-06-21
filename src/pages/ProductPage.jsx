import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { featuredProducts } from '../data/products';
import Stars from '../components/Stars';
import FeaturedProducts from '../components/FeaturedProducts';
import { useCart } from '../context/CartContext';

const mockReviews = [
  {
    id: 1,
    author: 'FishingFanatic88',
    rating: 5,
    date: 'March 12, 2025',
    title: 'Best purchase I made this year',
    body: "Absolutely love this product. I've been using it for 3 months now and it has performed flawlessly. Highly recommend to anyone looking for quality outdoor gear.",
    helpful: 42,
    verified: true,
  },
  {
    id: 2,
    author: 'OutdoorDave',
    rating: 4,
    date: 'February 28, 2025',
    title: 'Great quality, minor issues',
    body: "Overall very satisfied. The build quality is excellent and it works exactly as advertised. Took one star off because the packaging could be better, but the product itself is fantastic.",
    helpful: 18,
    verified: true,
  },
  {
    id: 3,
    author: 'LakeLifer',
    rating: 5,
    date: 'February 14, 2025',
    title: 'Exceeded my expectations',
    body: "I was skeptical at first but this blew me away. My whole family has been enjoying it. Will definitely buy again and recommend to friends.",
    helpful: 31,
    verified: false,
  },
  {
    id: 4,
    author: 'CampingPro99',
    rating: 3,
    date: 'January 30, 2025',
    title: 'Good but not perfect',
    body: "Decent product for the price. Does what it says but I've seen better. The materials could be more durable. For casual use it's fine.",
    helpful: 9,
    verified: true,
  },
];

const ratingBreakdown = [
  { stars: 5, pct: 68 },
  { stars: 4, pct: 18 },
  { stars: 3, pct: 8 },
  { stars: 2, pct: 4 },
  { stars: 1, pct: 2 },
];

function RatingBar({ stars, pct }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
      <span style={{ fontSize: 12, color: '#555', minWidth: 40 }}>{stars} star</span>
      <div style={{ flex: 1, height: 10, background: '#e8e8e8', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: '#e8651a', borderRadius: 4 }} />
      </div>
      <span style={{ fontSize: 12, color: '#555', minWidth: 30 }}>{pct}%</span>
    </div>
  );
}

function ReviewCard({ review }) {
  return (
    <div style={{ borderBottom: '1px solid #e8e8e8', paddingBottom: 24, marginBottom: 24 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
        <div>
          <div style={{ display: 'flex', gap: 2, marginBottom: 4 }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} style={{ color: i < review.rating ? '#e8651a' : '#ccc', fontSize: 15 }}>&#9733;</span>
            ))}
          </div>
          <div style={{ fontWeight: 700, fontSize: 15, color: '#222', marginBottom: 2 }}>{review.title}</div>
          <div style={{ fontSize: 12, color: '#888' }}>
            {review.author}
            {review.verified && (
              <span style={{ marginLeft: 8, color: '#2d8a2d', fontWeight: 600 }}>Verified Purchase</span>
            )}
            <span style={{ marginLeft: 8 }}>{review.date}</span>
          </div>
        </div>
      </div>
      <p style={{ fontSize: 14, color: '#444', lineHeight: 1.6, marginBottom: 10 }}>{review.body}</p>
      <div style={{ fontSize: 12, color: '#888' }}>
        Was this review helpful?&nbsp;
        <button style={{ color: '#2d4424', fontWeight: 700, fontSize: 12, textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}>
          Yes ({review.helpful})
        </button>
        &nbsp;|&nbsp;
        <button style={{ color: '#2d4424', fontWeight: 700, fontSize: 12, textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}>
          No
        </button>
      </div>
    </div>
  );
}

export default function ProductPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const product = featuredProducts.find((p) => p.slug === slug) || featuredProducts[0];

  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  const handleAddToCart = () => {
    addItem(product, qty);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  const handleBuyNow = () => {
    addItem(product, qty);
    navigate('/cart');
  };

  return (
    <div style={{ background: '#fff', minHeight: '70vh' }}>

      {/* Breadcrumb */}
      <div style={{ background: '#f4f4f4', padding: '10px 0', fontSize: 12, borderBottom: '1px solid #e0e0e0' }}>
        <div className="container" style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
          <Link to="/" style={{ color: '#2d4424' }}>Home</Link>
          <span style={{ color: '#bbb' }}>&gt;</span>
          <Link to={`/${product.category}`} style={{ color: '#2d4424', textTransform: 'capitalize' }}>
            {product.category}
          </Link>
          <span style={{ color: '#bbb' }}>&gt;</span>
          <span style={{ color: '#666' }}>{product.name}</span>
        </div>
      </div>

      {/* Main product section */}
      <div className="container" style={{ padding: '32px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>

          {/* LEFT: Image Gallery */}
          <div>
            {/* Main image */}
            <div style={{
              width: '100%',
              aspectRatio: '1',
              border: '1px solid #e0e0e0',
              borderRadius: 6,
              overflow: 'hidden',
              marginBottom: 12,
              background: '#f8f8f8',
            }}>
              <img
                src={product.images ? product.images[activeImg] : product.img}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            {/* Thumbnails */}
            {product.images && (
              <div style={{ display: 'flex', gap: 8 }}>
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    style={{
                      width: 80,
                      height: 80,
                      border: i === activeImg ? '2px solid #2d4424' : '1px solid #ddd',
                      borderRadius: 4,
                      overflow: 'hidden',
                      padding: 0,
                      cursor: 'pointer',
                      background: '#f8f8f8',
                      transition: 'border-color 0.2s',
                    }}
                  >
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Product Info */}
          <div>
            {/* Brand */}
            <div style={{ fontSize: 13, color: '#888', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>
              {product.brand}
            </div>

            {/* Name */}
            <h1 style={{ fontSize: 24, fontWeight: 800, color: '#1a1a1a', lineHeight: 1.3, marginBottom: 12 }}>
              {product.name}
            </h1>

            {/* Rating row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ display: 'flex', gap: 1 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} style={{ color: i < Math.round(product.rating) ? '#e8651a' : '#ccc', fontSize: 17 }}>&#9733;</span>
                ))}
              </div>
              <span style={{ fontSize: 14, color: '#555' }}>
                {product.rating} ({product.reviews.toLocaleString()} Reviews)
              </span>
              <span style={{ color: '#bbb' }}>|</span>
              <span style={{ fontSize: 12, color: '#888' }}>SKU: {product.sku}</span>
            </div>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 32, fontWeight: 800, color: '#bc282d' }}>${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <>
                  <span style={{ fontSize: 18, color: '#999', textDecoration: 'line-through' }}>
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <span style={{
                    background: '#bc282d',
                    color: '#fff',
                    padding: '3px 10px',
                    fontSize: 13,
                    fontWeight: 700,
                    borderRadius: 2,
                  }}>
                    SAVE {product.discount}%
                  </span>
                </>
              )}
            </div>

            {/* Availability */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <span style={{
                display: 'inline-block',
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: product.inStock ? '#2d8a2d' : '#bc282d',
              }} />
              <span style={{ fontSize: 14, fontWeight: 600, color: product.inStock ? '#2d8a2d' : '#bc282d' }}>
                {product.inStock ? 'In Stock - Ready to Ship' : 'Out of Stock'}
              </span>
            </div>

            {/* Short description */}
            <p style={{ fontSize: 14, color: '#555', lineHeight: 1.7, marginBottom: 24, borderBottom: '1px solid #e8e8e8', paddingBottom: 20 }}>
              {product.description}
            </p>

            {/* Quantity selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
              <label style={{ fontSize: 13, fontWeight: 700, color: '#333', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Quantity
              </label>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: 3 }}>
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  style={{ width: 34, height: 38, fontSize: 18, color: '#333', background: '#f4f4f4', border: 'none', cursor: 'pointer', borderRight: '1px solid #ccc' }}
                >
                  -
                </button>
                <span style={{ width: 44, textAlign: 'center', fontSize: 15, fontWeight: 700 }}>{qty}</span>
                <button
                  onClick={() => setQty(q => q + 1)}
                  style={{ width: 34, height: 38, fontSize: 18, color: '#333', background: '#f4f4f4', border: 'none', cursor: 'pointer', borderLeft: '1px solid #ccc' }}
                >
                  +
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
              <button
                onClick={handleAddToCart}
                style={{
                  background: addedToCart ? '#2d8a2d' : '#2d4424',
                  color: '#fff',
                  border: 'none',
                  padding: '16px 24px',
                  fontSize: 15,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  cursor: 'pointer',
                  borderRadius: 3,
                  transition: 'background 0.2s',
                }}
              >
                {addedToCart ? 'Aggiunto al Carrello!' : 'Aggiungi al Carrello'}
              </button>
              <button
                onClick={handleBuyNow}
                style={{
                  background: '#bc282d',
                  color: '#fff',
                  border: 'none',
                  padding: '14px 24px',
                  fontSize: 15,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  cursor: 'pointer',
                  borderRadius: 3,
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => { e.target.style.background = '#9e1e22'; }}
                onMouseLeave={e => { e.target.style.background = '#bc282d'; }}
              >
                Acquista Subito
              </button>
            </div>

            {/* Store pickup / shipping badges */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
              {[
                { icon: '&#9646;', text: 'Free Shipping over $50' },
                { icon: '&#9646;', text: 'Free Store Pickup' },
                { icon: '&#9646;', text: 'Easy Returns' },
              ].map((b) => (
                <div key={b.text} style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#f4f4f4', padding: '8px 12px', borderRadius: 3, fontSize: 12, color: '#444' }}>
                  <span style={{ color: '#2d4424', fontWeight: 700, fontSize: 16 }}>&#10003;</span>
                  {b.text}
                </div>
              ))}
            </div>

            {/* Share */}
            <div style={{ fontSize: 12, color: '#888', display: 'flex', alignItems: 'center', gap: 10 }}>
              <span>Share:</span>
              {['Facebook', 'Twitter', 'Pinterest', 'Email'].map((s) => (
                <a key={s} href="#" style={{ color: '#2d4424', fontWeight: 600, fontSize: 12 }}>{s}</a>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs: Description / Specs / Reviews */}
        <div style={{ marginTop: 52 }}>
          <div style={{ display: 'flex', borderBottom: '2px solid #e0e0e0', marginBottom: 0 }}>
            {[
              { id: 'description', label: 'Description' },
              { id: 'specs', label: 'Specifications' },
              { id: 'reviews', label: `Reviews (${mockReviews.length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '14px 28px',
                  fontSize: 14,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: 0.4,
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === tab.id ? '3px solid #2d4424' : '3px solid transparent',
                  color: activeTab === tab.id ? '#2d4424' : '#888',
                  cursor: 'pointer',
                  marginBottom: -2,
                  transition: 'color 0.2s',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div style={{ padding: '28px 0' }}>

            {activeTab === 'description' && (
              <div style={{ maxWidth: 760 }}>
                <p style={{ fontSize: 15, color: '#444', lineHeight: 1.8, marginBottom: 20 }}>
                  {product.description}
                </p>
                <p style={{ fontSize: 15, color: '#444', lineHeight: 1.8, marginBottom: 20 }}>
                  Whether you're a seasoned pro or just getting started, this product is designed to give you the edge in the outdoors. Built to withstand the demands of real-world use, it delivers performance and reliability session after session.
                </p>
                <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <li style={{ fontSize: 14, color: '#444', listStyle: 'disc' }}>Premium-grade materials for lasting durability</li>
                  <li style={{ fontSize: 14, color: '#444', listStyle: 'disc' }}>Engineered for performance in all conditions</li>
                  <li style={{ fontSize: 14, color: '#444', listStyle: 'disc' }}>Backed by Bass Pro Shops satisfaction guarantee</li>
                  <li style={{ fontSize: 14, color: '#444', listStyle: 'disc' }}>Easy setup and maintenance</li>
                </ul>
              </div>
            )}

            {activeTab === 'specs' && product.specs && (
              <table style={{ borderCollapse: 'collapse', minWidth: 500 }}>
                <tbody>
                  {product.specs.map((spec) => (
                    <tr key={spec.label} style={{ borderBottom: '1px solid #e8e8e8' }}>
                      <td style={{ padding: '12px 20px 12px 0', fontSize: 14, fontWeight: 700, color: '#333', width: 200, verticalAlign: 'top' }}>
                        {spec.label}
                      </td>
                      <td style={{ padding: '12px 0', fontSize: 14, color: '#555' }}>
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'reviews' && (
              <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 48, alignItems: 'start' }}>
                {/* Rating summary */}
                <div style={{ background: '#f8f8f8', padding: 24, borderRadius: 6, border: '1px solid #e8e8e8' }}>
                  <div style={{ textAlign: 'center', marginBottom: 20 }}>
                    <div style={{ fontSize: 52, fontWeight: 900, color: '#1a1a1a', lineHeight: 1 }}>{product.rating}</div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 2, margin: '8px 0' }}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} style={{ color: i < Math.round(product.rating) ? '#e8651a' : '#ccc', fontSize: 18 }}>&#9733;</span>
                      ))}
                    </div>
                    <div style={{ fontSize: 12, color: '#888' }}>{product.reviews.toLocaleString()} Reviews</div>
                  </div>
                  {ratingBreakdown.map((r) => (
                    <RatingBar key={r.stars} {...r} />
                  ))}
                  <button style={{
                    width: '100%',
                    marginTop: 20,
                    background: '#2d4424',
                    color: '#fff',
                    padding: '12px',
                    fontWeight: 700,
                    fontSize: 13,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                    border: 'none',
                    borderRadius: 3,
                    cursor: 'pointer',
                  }}>
                    Write a Review
                  </button>
                </div>

                {/* Reviews list */}
                <div>
                  {mockReviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related products */}
      <div style={{ background: '#f4f4f4', paddingBottom: 20 }}>
        <FeaturedProducts title="You May Also Like" />
      </div>
    </div>
  );
}
