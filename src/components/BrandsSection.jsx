import { Link } from 'react-router-dom';
import { brands } from '../data/products';

export default function BrandsSection() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">Shop Top Brands</h2>
          <Link to="/brands" className="view-all">View All Brands</Link>
        </div>
        <div className="brands-row">
          {brands.map((b) => (
            <Link
              to={`/brands/${b.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="brand-card"
              key={b.name}
              title={b.name}
            >
              {b.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
