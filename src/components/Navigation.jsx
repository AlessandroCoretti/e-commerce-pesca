import { useState } from 'react';
import { Link } from 'react-router-dom';
import { mainNavItems } from '../data/navigation';

/* Desktop mega menu */
function MegaMenu({ mega, path }) {
  if (!mega) return null;
  return (
    <div className="mega-menu">
      <div className="mega-menu__cols">
        {mega.columns.map((col) => (
          <div className="mega-col" key={col.title}>
            <h4>{col.title}</h4>
            <ul>
              {col.items.map((item) => (
                <li key={item}>
                  <Link to={`${path}/${item.toLowerCase().replace(/\s+/g, '-')}`}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mega-featured">
        <img src={mega.featuredImg} alt={mega.featuredLabel} loading="lazy" />
        <Link to={path} className="mega-featured__btn">{mega.featuredLabel}</Link>
      </div>
    </div>
  );
}

/* Mobile drawer */
function MobileNav({ open, onClose }) {
  const [expanded, setExpanded] = useState(null);

  const toggle = (label) =>
    setExpanded((prev) => (prev === label ? null : label));

  return (
    <div
      className={`mobile-nav${open ? ' mobile-nav--open' : ''}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="mobile-nav__drawer">
        <div className="mobile-nav__close">
          <span>Menu</span>
          <button onClick={onClose} aria-label="Chiudi menu">&#215;</button>
        </div>

        {mainNavItems.map((item) => (
          <div className="mobile-nav__item" key={item.label}>
            {item.mega ? (
              <>
                <button
                  className={`mobile-nav__link${expanded === item.label ? ' mobile-nav__link--active' : ''}`}
                  onClick={() => toggle(item.label)}
                >
                  <span>{item.label}</span>
                  <span className="mobile-nav__chevron">
                    {expanded === item.label ? '▲' : '▼'}
                  </span>
                </button>
                <div className={`mobile-nav__sub${expanded === item.label ? ' mobile-nav__sub--open' : ''}`}>
                  <Link to={item.path} onClick={onClose} style={{ display: 'block', padding: '10px 30px', color: 'var(--bps-yellow)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase' }}>
                    {item.mega.featuredLabel}
                  </Link>
                  {item.mega.columns.flatMap((col) =>
                    col.items.map((sub) => (
                      <Link
                        key={sub}
                        to={`${item.path}/${sub.toLowerCase().replace(/\s+/g, '-')}`}
                        onClick={onClose}
                      >
                        {sub}
                      </Link>
                    ))
                  )}
                </div>
              </>
            ) : (
              <Link
                to={item.path}
                className={`mobile-nav__link${item.highlight ? ' mobile-nav__link--highlight' : ''}`}
                onClick={onClose}
              >
                <span>{item.label}</span>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* Desktop navigation bar */
export default function Navigation({ onOpenMenu }) {
  return (
    <>
      <nav className="navigation">
        <div className="navigation__inner">
          {mainNavItems.map((item) => (
            <div className="nav-item" key={item.label}>
              <Link
                to={item.path}
                className={`nav-link${item.highlight ? ' nav-link--bargain' : ''}`}
              >
                {item.label}
              </Link>
              {item.mega && <MegaMenu mega={item.mega} path={item.path} />}
            </div>
          ))}
        </div>
      </nav>
    </>
  );
}

export { MobileNav };
