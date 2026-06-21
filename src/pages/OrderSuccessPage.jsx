import { Link } from 'react-router-dom';

function CheckCircle() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="40" fill="#e8f5e9" />
      <circle cx="40" cy="40" r="28" fill="#2d4424" />
      <path d="M26 40l10 10 18-18" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function OrderRow({ label, value, highlight }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}>
      <span style={{ fontSize: 13, color: '#888' }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: highlight ? 700 : 600, color: highlight ? '#bc282d' : '#1a1a1a' }}>{value}</span>
    </div>
  );
}

export default function OrderSuccessPage() {
  const orderNumber = '#' + Math.floor(Math.random() * 900000 + 100000);
  const deliveryDate = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <div style={{ background: '#f8f8f8', minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #e0e0e0', padding: '48px 40px', maxWidth: 540, width: '100%', textAlign: 'center' }}>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          <CheckCircle />
        </div>

        <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#2d4424', marginBottom: 8 }}>
          Ordine Confermato
        </div>

        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#1a1a1a', marginBottom: 8, lineHeight: 1.2 }}>
          Grazie per il tuo acquisto!
        </h1>

        <p style={{ color: '#888', fontSize: 15, marginBottom: 32, lineHeight: 1.5 }}>
          Il tuo ordine e stato ricevuto e confermato. Riceverai una email di conferma a breve.
        </p>

        <div style={{ background: '#f8f8f8', border: '1px solid #e8e8e8', borderRadius: 8, padding: '20px 24px', marginBottom: 28, textAlign: 'left' }}>
          <OrderRow label="Numero Ordine" value={orderNumber} highlight />
          <OrderRow label="Data" value={new Date().toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })} />
          <OrderRow label="Consegna Stimata" value={deliveryDate} />
          <OrderRow label="Stato" value="In Elaborazione" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Link
            to="/"
            style={{
              display: 'block',
              background: '#2d4424',
              color: '#fff',
              padding: '15px 24px',
              fontWeight: 700,
              fontSize: 14,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              borderRadius: 5,
              textDecoration: 'none',
            }}
          >
            Continua a fare shopping
          </Link>
          <Link
            to="/"
            style={{
              display: 'block',
              color: '#2d4424',
              padding: '12px 24px',
              fontWeight: 600,
              fontSize: 13,
              borderRadius: 5,
              textDecoration: 'underline',
            }}
          >
            Torna alla Home
          </Link>
        </div>

        <div style={{ marginTop: 28, display: 'flex', justifyContent: 'center', gap: 28 }}>
          {[
            { icon: '📦', text: 'Traccia il Pacco' },
            { icon: '↩️', text: 'Politica di Reso' },
            { icon: '📞', text: 'Assistenza' },
          ].map((i) => (
            <div key={i.text} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, fontSize: 11, color: '#888', cursor: 'pointer' }}>
              <span style={{ fontSize: 20 }}>{i.icon}</span>
              {i.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
