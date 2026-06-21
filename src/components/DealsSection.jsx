import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { dealProducts } from '../data/products';

function DealCard({ d }) {
  const { addItem } = useCart();
  return (
    <div className="deal-card" onClick={() => {}}>
      <Link to={`/product/${d.slug}`}>
        <img className="deal-card__img" src={d.img} alt={d.name} loading="lazy" />
      </Link>
      <div className="deal-card__save">RISPARMIA {d.discount}%</div>
      <Link to={`/product/${d.slug}`} className="deal-card__name-link">
        <div className="deal-card__name">{d.name}</div>
      </Link>
      <div className="deal-card__prices">
        <span className="deal-price">{d.price.toFixed(2)} &euro;</span>
        <span className="deal-orig">{d.originalPrice.toFixed(2)} &euro;</span>
        <span className="deal-pct">Risparmi {(d.originalPrice - d.price).toFixed(2)} &euro;</span>
      </div>
      <button
        className="deal-card__atc"
        onClick={() => addItem(d)}
      >
        + Carrello
      </button>
    </div>
  );
}

export default function DealsSection() {
  return (
    <section className="section section--gray">
      <div className="container">
        <div className="deals-box">
          <div className="deals-header">
            <h2>Offerte del Giorno: Risparmio a Tempo Limitato</h2>
            <Link to="/saldi">Vedi tutte le offerte</Link>
          </div>
          <div className="deals-body">
            <div className="deal-grid">
              {dealProducts.map((d) => (
                <DealCard key={d.id} d={d} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
