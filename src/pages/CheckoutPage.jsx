import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const steps = ['Spedizione', 'Pagamento', 'Conferma'];

function StepBar({ current }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, marginBottom: 36 }}>
      {steps.map((s, i) => (
        <div key={s} style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: i <= current ? '#2d4424' : '#e0e0e0',
              color: i <= current ? '#fff' : '#999',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, fontSize: 13,
            }}>
              {i < current ? '✓' : i + 1}
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: i <= current ? '#2d4424' : '#999', letterSpacing: 0.5 }}>
              {s}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div style={{ width: 80, height: 2, background: i < current ? '#2d4424' : '#e0e0e0', margin: '0 8px', marginBottom: 22 }} />
          )}
        </div>
      ))}
    </div>
  );
}

function Field({ label, id, type = 'text', required, placeholder, half, value, onChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, flex: half ? '1 1 calc(50% - 8px)' : '1 1 100%' }}>
      <label htmlFor={id} style={{ fontSize: 12, fontWeight: 700, color: '#444', textTransform: 'uppercase', letterSpacing: 0.3 }}>
        {label}{required && <span style={{ color: '#bc282d' }}> *</span>}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        style={{
          padding: '11px 14px',
          border: '1px solid #ccc',
          borderRadius: 4,
          fontSize: 14,
          outline: 'none',
          transition: 'border-color 0.2s',
          width: '100%',
        }}
        onFocus={(e) => e.target.style.borderColor = '#2d4424'}
        onBlur={(e) => e.target.style.borderColor = '#ccc'}
      />
    </div>
  );
}

const PAYMENT_METHODS = [
  { id: 'card',   label: 'Carta di Credito / Debito', icon: '💳' },
  { id: 'paypal', label: 'PayPal',                    icon: '🅿' },
  { id: 'bank',   label: 'Bonifico Bancario',         icon: '🏦' },
];

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [payMethod, setPayMethod] = useState('card');
  const [form, setForm] = useState({ nome: '', cognome: '', email: '', telefono: '', indirizzo: '', citta: '', cap: '', provincia: '' });
  const [cardForm, setCardForm] = useState({ numero: '', intestatario: '', scadenza: '', cvv: '' });

  const shipping  = subtotal >= 50 ? 0 : 5.99;
  const total     = (subtotal + shipping).toFixed(2);
  const totalItems = items.reduce((s, i) => s + i.qty, 0);

  const updateForm = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  const updateCard = (field) => (e) => setCardForm((f) => ({ ...f, [field]: e.target.value }));

  const handleShippingNext = (e) => {
    e.preventDefault();
    setStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePayNext = (e) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConfirm = () => {
    clearCart();
    navigate('/ordine-completato');
  };

  if (items.length === 0 && step < 2) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px' }}>
        <p style={{ fontSize: 18, marginBottom: 20 }}>Il carrello e vuoto.</p>
        <Link to="/" style={{ color: '#2d4424', fontWeight: 700, textDecoration: 'underline' }}>Torna alla Home</Link>
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
          <Link to="/cart" style={{ color: '#2d4424', fontWeight: 600 }}>Carrello</Link>
          <span style={{ color: '#bbb' }}>&rsaquo;</span>
          <span style={{ color: '#666' }}>Checkout</span>
        </div>
      </div>

      <div className="container" style={{ padding: '36px 20px' }}>
        <StepBar current={step} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 28, alignItems: 'start' }}>

          {/* Left: step content */}
          <div style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: 6, padding: 28 }}>

            {/* STEP 0: Spedizione */}
            {step === 0 && (
              <form onSubmit={handleShippingNext}>
                <h2 style={{ fontSize: 18, fontWeight: 800, textTransform: 'uppercase', marginBottom: 22, letterSpacing: 0.5 }}>
                  Indirizzo di Spedizione
                </h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                  <Field label="Nome" id="nome" required half placeholder="Mario" value={form.nome} onChange={updateForm('nome')} />
                  <Field label="Cognome" id="cognome" required half placeholder="Rossi" value={form.cognome} onChange={updateForm('cognome')} />
                  <Field label="Email" id="email" type="email" required placeholder="mario@esempio.it" value={form.email} onChange={updateForm('email')} />
                  <Field label="Telefono" id="telefono" type="tel" placeholder="+39 333 000 0000" value={form.telefono} onChange={updateForm('telefono')} />
                  <Field label="Indirizzo" id="indirizzo" required placeholder="Via Roma 1" value={form.indirizzo} onChange={updateForm('indirizzo')} />
                  <Field label="Citta" id="citta" required half placeholder="Milano" value={form.citta} onChange={updateForm('citta')} />
                  <Field label="CAP" id="cap" required half placeholder="20100" value={form.cap} onChange={updateForm('cap')} />
                  <Field label="Provincia" id="provincia" required half placeholder="MI" value={form.provincia} onChange={updateForm('provincia')} />
                </div>

                <div style={{ marginTop: 24, padding: '16px', background: '#f8f8f8', borderRadius: 6, border: '1px solid #e0e0e0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, fontWeight: 700, marginBottom: 4 }}>
                    <span>Spedizione Standard (2-4 giorni)</span>
                    <span style={{ color: shipping === 0 ? '#2d8a2d' : '#1a1a1a' }}>{shipping === 0 ? 'GRATIS' : `${shipping.toFixed(2)} €`}</span>
                  </div>
                  <p style={{ fontSize: 12, color: '#888' }}>Consegna garantita entro 4 giorni lavorativi</p>
                </div>

                <button
                  type="submit"
                  style={{
                    marginTop: 24,
                    width: '100%',
                    background: '#2d4424',
                    color: '#fff',
                    border: 'none',
                    padding: '15px',
                    fontSize: 14,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                    cursor: 'pointer',
                    borderRadius: 4,
                  }}
                >
                  Continua al Pagamento &rarr;
                </button>
              </form>
            )}

            {/* STEP 1: Pagamento */}
            {step === 1 && (
              <form onSubmit={handlePayNext}>
                <h2 style={{ fontSize: 18, fontWeight: 800, textTransform: 'uppercase', marginBottom: 22, letterSpacing: 0.5 }}>
                  Metodo di Pagamento
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                  {PAYMENT_METHODS.map((m) => (
                    <label
                      key={m.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 14,
                        padding: '14px 16px',
                        border: `2px solid ${payMethod === m.id ? '#2d4424' : '#e0e0e0'}`,
                        borderRadius: 6,
                        cursor: 'pointer',
                        transition: 'border-color 0.2s',
                        background: payMethod === m.id ? '#f0f5ee' : '#fff',
                      }}
                    >
                      <input type="radio" name="pay" value={m.id} checked={payMethod === m.id} onChange={() => setPayMethod(m.id)} style={{ accentColor: '#2d4424', width: 16, height: 16 }} />
                      <span style={{ fontSize: 18 }}>{m.icon}</span>
                      <span style={{ fontWeight: 600, fontSize: 14 }}>{m.label}</span>
                    </label>
                  ))}
                </div>

                {payMethod === 'card' && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, padding: '20px', background: '#f8f8f8', borderRadius: 6, border: '1px solid #e0e0e0', marginBottom: 20 }}>
                    <div style={{ flex: '1 1 100%' }}>
                      <Field label="Numero Carta" id="card-num" placeholder="1234 5678 9012 3456" value={cardForm.numero} onChange={updateCard('numero')} />
                    </div>
                    <div style={{ flex: '1 1 100%' }}>
                      <Field label="Intestatario" id="card-name" placeholder="Mario Rossi" value={cardForm.intestatario} onChange={updateCard('intestatario')} />
                    </div>
                    <div style={{ flex: '1 1 calc(50% - 8px)' }}>
                      <Field label="Scadenza" id="card-exp" placeholder="MM/AA" value={cardForm.scadenza} onChange={updateCard('scadenza')} />
                    </div>
                    <div style={{ flex: '1 1 calc(50% - 8px)' }}>
                      <Field label="CVV" id="card-cvv" placeholder="123" value={cardForm.cvv} onChange={updateCard('cvv')} />
                    </div>
                  </div>
                )}

                {payMethod === 'paypal' && (
                  <div style={{ padding: '20px', background: '#f0f5fb', border: '1px solid #c8d8ec', borderRadius: 6, textAlign: 'center', marginBottom: 20 }}>
                    <p style={{ fontSize: 14, color: '#444' }}>Verrai reindirizzato a PayPal per completare il pagamento in sicurezza.</p>
                  </div>
                )}

                {payMethod === 'bank' && (
                  <div style={{ padding: '20px', background: '#f8f8f8', border: '1px solid #e0e0e0', borderRadius: 6, marginBottom: 20 }}>
                    <p style={{ fontSize: 13, color: '#444', marginBottom: 8, fontWeight: 700 }}>Dati Bancari:</p>
                    <p style={{ fontSize: 13, color: '#666' }}>IBAN: IT60 X054 2811 1010 0000 0123 456</p>
                    <p style={{ fontSize: 13, color: '#666' }}>Intestato a: Bass Pro Shops Italia S.r.l.</p>
                    <p style={{ fontSize: 12, color: '#999', marginTop: 8 }}>L'ordine sara processato alla ricezione del bonifico (2-3 giorni bancari).</p>
                  </div>
                )}

                <div style={{ display: 'flex', gap: 12 }}>
                  <button
                    type="button"
                    onClick={() => setStep(0)}
                    style={{ flex: 1, background: '#fff', color: '#2d4424', border: '2px solid #2d4424', padding: '14px', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', cursor: 'pointer', borderRadius: 4 }}
                  >
                    &larr; Indietro
                  </button>
                  <button
                    type="submit"
                    style={{ flex: 2, background: '#2d4424', color: '#fff', border: 'none', padding: '14px', fontSize: 14, fontWeight: 700, textTransform: 'uppercase', cursor: 'pointer', borderRadius: 4 }}
                  >
                    Rivedi Ordine &rarr;
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: Conferma */}
            {step === 2 && (
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 800, textTransform: 'uppercase', marginBottom: 22, letterSpacing: 0.5 }}>
                  Rivedi e Conferma
                </h2>

                {/* Delivery info */}
                <div style={{ background: '#f8f8f8', borderRadius: 6, padding: '16px 20px', marginBottom: 16, border: '1px solid #e0e0e0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: '#888' }}>Spedizione a</span>
                    <button onClick={() => setStep(0)} style={{ fontSize: 11, color: '#2d4424', fontWeight: 700, textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}>Modifica</button>
                  </div>
                  <p style={{ fontSize: 14, color: '#333' }}>
                    {form.nome} {form.cognome} &mdash; {form.indirizzo}, {form.cap} {form.citta} ({form.provincia})
                  </p>
                  <p style={{ fontSize: 13, color: '#888' }}>{form.email} {form.telefono && `· ${form.telefono}`}</p>
                </div>

                {/* Payment info */}
                <div style={{ background: '#f8f8f8', borderRadius: 6, padding: '16px 20px', marginBottom: 20, border: '1px solid #e0e0e0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: '#888' }}>Pagamento</span>
                    <button onClick={() => setStep(1)} style={{ fontSize: 11, color: '#2d4424', fontWeight: 700, textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}>Modifica</button>
                  </div>
                  <p style={{ fontSize: 14, color: '#333' }}>
                    {PAYMENT_METHODS.find((m) => m.id === payMethod)?.label}
                    {payMethod === 'card' && cardForm.numero && ` · terminante in ${cardForm.numero.slice(-4)}`}
                  </p>
                </div>

                {/* Products in order */}
                <div style={{ borderTop: '1px solid #e8e8e8', paddingTop: 16, marginBottom: 20 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: '#888', marginBottom: 12 }}>Prodotti ({totalItems})</p>
                  {items.map((item) => (
                    <div key={item.id} style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'center' }}>
                      <img src={item.img} alt={item.name} style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 3 }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#333' }}>{item.name}</div>
                        <div style={{ fontSize: 12, color: '#888' }}>Qty: {item.qty}</div>
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#1a1a1a' }}>{(item.price * item.qty).toFixed(2)} &euro;</div>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: 12 }}>
                  <button
                    onClick={() => setStep(1)}
                    style={{ flex: 1, background: '#fff', color: '#2d4424', border: '2px solid #2d4424', padding: '14px', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', cursor: 'pointer', borderRadius: 4 }}
                  >
                    &larr; Indietro
                  </button>
                  <button
                    onClick={handleConfirm}
                    style={{ flex: 2, background: '#bc282d', color: '#fff', border: 'none', padding: '14px', fontSize: 14, fontWeight: 700, textTransform: 'uppercase', cursor: 'pointer', borderRadius: 4 }}
                  >
                    Conferma Ordine - {total} &euro;
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order summary sidebar */}
          <div style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: 6, padding: 22, position: 'sticky', top: 100 }}>
            <h3 style={{ fontSize: 14, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid #e8e8e8' }}>
              Riepilogo
            </h3>
            {items.map((item) => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#555', marginBottom: 8 }}>
                <span style={{ flex: 1, paddingRight: 8 }}>{item.name.substring(0, 35)}{item.name.length > 35 ? '...' : ''} <span style={{ color: '#888' }}>x{item.qty}</span></span>
                <span style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>{(item.price * item.qty).toFixed(2)} &euro;</span>
              </div>
            ))}
            <div style={{ borderTop: '1px solid #e8e8e8', marginTop: 12, paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#555' }}>
                <span>Subtotale</span>
                <span>{subtotal.toFixed(2)} &euro;</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#555' }}>
                <span>Spedizione</span>
                <span style={{ color: shipping === 0 ? '#2d8a2d' : '#1a1a1a', fontWeight: 600 }}>{shipping === 0 ? 'GRATIS' : `${shipping.toFixed(2)} €`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, fontWeight: 800, borderTop: '1px solid #e8e8e8', paddingTop: 10, marginTop: 4 }}>
                <span>Totale</span>
                <span style={{ color: '#bc282d' }}>{total} &euro;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
