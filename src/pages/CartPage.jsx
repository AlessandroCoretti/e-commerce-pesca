import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function QtyControl({ id, qty }) {
  const { updateQty } = useCart();
  return (
    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: 3, overflow: 'hidden', width: 'fit-content' }}>
      <button
        onClick={() => updateQty(id, qty - 1)}
        style={{ width: 32, height: 36, fontSize: 18, background: '#f4f4f4', border: 'none', cursor: 'pointer', color: '#333' }}
        aria-label="Riduci quantita"
      >
        -
      </button>
      <span style={{ width: 44, textAlign: 'center', fontSize: 14, fontWeight: 700 }}>{qty}</span>
      <button
        onClick={() => updateQty(id, qty + 1)}
        style={{ width: 32, height: 36, fontSize: 18, background: '#f4f4f4', border: 'none', cursor: 'pointer', color: '#333' }}
        aria-label="Aumenta quantita"
      >
        +
      </button>
    </div>
  );
}

function CartItem({ item }) {
  const { removeItem } = useCart();
  const lineTotal = (item.price * item.qty).toFixed(2);

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '90px 1fr auto',
      gap: 20,
      padding: '20px 0',
      borderBottom: '1px solid #e8e8e8',
      alignItems: 'start',
    }}>
      {/* Image */}
      <Link to={`/product/${item.slug}`}>
        <img
          src={item.img}
          alt={item.name}
          style={{ width: 90, height: 90, objectFit: 'cover', borderRadius: 4, border: '1px solid #eee' }}
        />
      </Link>

      {/* Info */}
      <div>
        <div style={{ fontSize: 11, color: '#888', textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 4 }}>
          {item.brand}
        </div>
        <Link to={`/product/${item.slug}`} style={{ fontWeight: 700, fontSize: 15, color: '#1a1a1a', lineHeight: 1.3, display: 'block', marginBottom: 8 }}>
          {item.name}
        </Link>

        {/* Price row */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 14 }}>
          <span style={{ fontSize: 17, fontWeight: 700, color: '#bc282d' }}>{item.price.toFixed(2)} &euro;</span>
          {item.originalPrice && (
            <span style={{ fontSize: 12, color: '#999', textDecoration: 'line-through' }}>
              {item.originalPrice.toFixed(2)} &euro;
            </span>
          )}
        </div>

        {/* Qty + Remove */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <QtyControl id={item.id} qty={item.qty} />
          <button
            onClick={() => removeItem(item.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              color: '#bc282d',
              fontSize: 12,
              fontWeight: 700,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: 0.3,
              padding: '4px 0',
            }}
            aria-label={`Rimuovi ${item.name}`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14H6L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4h6v2" />
            </svg>
            Elimina
          </button>
        </div>
      </div>

      {/* Line total */}
      <div style={{ textAlign: 'right', minWidth: 80 }}>
        <span style={{ fontSize: 17, fontWeight: 800, color: '#1a1a1a' }}>{lineTotal} &euro;</span>
      </div>
    </div>
  );
}

function OrderSummary({ subtotal, onCheckout }) {
  const shipping = subtotal >= 50 ? 0 : 5.99;
  const total = (subtotal + shipping).toFixed(2);

  return (
    <div style={{
      background: '#fff',
      border: '1px solid #e0e0e0',
      borderRadius: 6,
      padding: 24,
      position: 'sticky',
      top: 100,
    }}>
      <h3 style={{ fontSize: 16, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 20, paddingBottom: 14, borderBottom: '1px solid #e8e8e8' }}>
        Riepilogo Ordine
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#444' }}>
          <span>Subtotale</span>
          <span style={{ fontWeight: 600 }}>{subtotal.toFixed(2)} &euro;</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#444' }}>
          <span>Spedizione</span>
          <span style={{ fontWeight: 600, color: shipping === 0 ? '#2d8a2d' : '#1a1a1a' }}>
            {shipping === 0 ? 'GRATIS' : `${shipping.toFixed(2)} €`}
          </span>
        </div>
        {shipping > 0 && (
          <div style={{ background: '#fff4ee', border: '1px solid #e8651a', borderRadius: 4, padding: '8px 12px', fontSize: 12, color: '#666' }}>
            Aggiungi <strong style={{ color: '#bc282d' }}>{(50 - subtotal).toFixed(2)} &euro;</strong> per la spedizione gratuita
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 19, fontWeight: 800, borderTop: '2px solid #e8e8e8', paddingTop: 16, marginBottom: 20 }}>
        <span>Totale</span>
        <span style={{ color: '#bc282d' }}>{total} &euro;</span>
      </div>

      <button
        onClick={onCheckout}
        style={{
          width: '100%',
          background: '#2d4424',
          color: '#fff',
          border: 'none',
          padding: '16px',
          fontSize: 15,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
          cursor: 'pointer',
          borderRadius: 4,
          marginBottom: 10,
          transition: 'background 0.2s',
        }}
        onMouseEnter={(e) => e.target.style.background = '#406034'}
        onMouseLeave={(e) => e.target.style.background = '#2d4424'}
      >
        Procedi all'Acquisto
      </button>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 16 }}>
        {[
          { icon: '✓', text: 'Pagamento sicuro SSL' },
          { icon: '✓', text: 'Reso gratuito entro 30 giorni' },
          { icon: '✓', text: 'Consegna in 2-4 giorni lavorativi' },
        ].map((b) => (
          <div key={b.text} style={{ display: 'flex', gap: 8, fontSize: 12, color: '#666' }}>
            <span style={{ color: '#2d8a2d', fontWeight: 700 }}>{b.icon}</span>
            {b.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CartPage() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', textAlign: 'center' }}>
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" style={{ marginBottom: 24 }}>
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
        </svg>
        <h2 style={{ fontSize: 26, fontWeight: 800, color: '#1a1a1a', marginBottom: 10 }}>Il tuo carrello e vuoto</h2>
        <p style={{ color: '#888', fontSize: 15, marginBottom: 28 }}>
          Sfoglia il catalogo e aggiungi i tuoi articoli preferiti
        </p>
        <Link
          to="/"
          style={{
            display: 'inline-block',
            background: '#2d4424',
            color: '#fff',
            padding: '14px 32px',
            fontWeight: 700,
            fontSize: 14,
            textTransform: 'uppercase',
            letterSpacing: 0.5,
            borderRadius: 4,
          }}
        >
          Continua a fare shopping
        </Link>
      </div>
    );
  }

  return (
    <div style={{ background: '#f8f8f8', minHeight: '70vh' }}>
      {/* Breadcrumb */}
      <div style={{ background: '#f4f4f4', padding: '10px 0', fontSize: 12, borderBottom: '1px solid #e0e0e0' }}>
        <div className="container" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Link to="/" style={{ color: '#2d4424', fontWeight: 600 }}>Home</Link>
          <span style={{ color: '#bbb' }}>&rsaquo;</span>
          <span style={{ color: '#666' }}>Carrello</span>
        </div>
      </div>

      <div className="container" style={{ padding: '28px 20px' }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, textTransform: 'uppercase', marginBottom: 24, letterSpacing: 0.5 }}>
          Il Mio Carrello ({items.reduce((s, i) => s + i.qty, 0)} articoli)
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 28, alignItems: 'start' }}>
          {/* Items list */}
          <div style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: 6, padding: '0 24px' }}>
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}

            {/* Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0' }}>
              <Link
                to="/"
                style={{ color: '#2d4424', fontWeight: 700, fontSize: 13, textDecoration: 'underline', textTransform: 'uppercase' }}
              >
                &larr; Continua lo Shopping
              </Link>
              <button
                onClick={clearCart}
                style={{ color: '#999', fontSize: 12, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', textTransform: 'uppercase' }}
              >
                Svuota Carrello
              </button>
            </div>
          </div>

          {/* Summary */}
          <OrderSummary subtotal={subtotal} onCheckout={() => navigate('/checkout')} />
        </div>
      </div>
    </div>
  );
}
