import { Link } from 'react-router-dom';
import { featuredProducts } from '../data/products';
import ProductCard from './ProductCard';

export default function FeaturedProducts({ title = 'Prodotti in Evidenza' }) {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">{title}</h2>
          <Link to="/saldi" className="view-all">Vedi tutti i prodotti</Link>
        </div>
        <div className="product-grid">
          {featuredProducts.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
