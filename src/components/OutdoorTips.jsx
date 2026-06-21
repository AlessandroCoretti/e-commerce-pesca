import { Link } from 'react-router-dom';
import { outdoorTips } from '../data/products';

export default function OutdoorTips() {
  return (
    <section className="section section--gray">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">Outdoor Tips &amp; Advice</h2>
          <Link to="/outdoor-tips" className="view-all">View All Articles</Link>
        </div>
        <div className="tips-grid">
          {outdoorTips.map((tip) => (
            <div className="tip-card" key={tip.id}>
              <div className="tip-card__img">
                <img src={tip.img} alt={tip.title} loading="lazy" />
              </div>
              <div className="tip-card__body">
                <div className="tip-card__cat">{tip.category}</div>
                <div className="tip-card__title">
                  <Link to={tip.path}>{tip.title}</Link>
                </div>
                <div className="tip-card__date">{tip.date}</div>
                <Link to={tip.path} className="tip-read">Read More &rarr;</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
