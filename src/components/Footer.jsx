import { Link } from 'react-router-dom';
import logoSito from '../assets/logo-sito.jpg';

const cols = [
  {
    title: 'Servizio Clienti',
    links: [
      { label: 'Traccia il mio Ordine', path: '/track-order' },
      { label: 'Resi e Cambi',          path: '/returns' },
      { label: 'Contattaci',            path: '/contact' },
      { label: 'FAQ',                   path: '/faq' },
      { label: 'Buoni Regalo',          path: '/gift-cards' },
      { label: 'Finanziamento',         path: '/financing' },
    ],
  },
  {
    title: 'Chi Siamo',
    links: [
      { label: 'La Nostra Storia', path: '/about' },
      { label: 'Negozi',           path: '/stores' },
      { label: 'Lavora con Noi',   path: '/careers' },
      { label: 'Blog di Pesca',    path: '/tips' },
      { label: 'Sostenibilita',    path: '/sustainability' },
    ],
  },
  {
    title: 'Esplora',
    links: [
      { label: 'Volantino Offerte',   path: '/weekly-ad' },
      { label: 'Saldi',               path: '/saldi' },
      { label: 'Trova Negozio',       path: '/stores' },
      { label: 'Lista dei Desideri',  path: '/wishlist' },
    ],
  },
  {
    title: 'Seguici',
    social: true,
  },
];

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="container">
          <div className="footer__logo-row">
            <Link to="/">
              <img src={logoSito} alt="Miky Pesca" style={{ height: 72, width: 72, objectFit: 'cover', borderRadius: 4 }} />
            </Link>
            <p className="footer__tagline">"La vita e breve. Pesca di piu."</p>
          </div>

          <div className="footer__cols">
            {cols.map((col) => (
              <div className="footer__col" key={col.title}>
                <h4>{col.title}</h4>
                {col.social ? (
                  <div className="footer__social">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-btn social-btn--fb" aria-label="Facebook">
                      <FacebookIcon />
                      <span>Facebook</span>
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-btn social-btn--ig" aria-label="Instagram">
                      <InstagramIcon />
                      <span>Instagram</span>
                    </a>
                  </div>
                ) : (
                  <ul>
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <Link to={link.path}>{link.label}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container">
        <div className="footer__bottom">
          <p className="footer__copy">
            &copy; {new Date().getFullYear()} Miky Pesca. Tutti i diritti riservati.
          </p>
          <div className="footer__legal">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Termini e Condizioni</Link>
            <Link to="/sitemap">Mappa del Sito</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
