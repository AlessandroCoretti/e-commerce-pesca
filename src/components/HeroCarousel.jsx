import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { heroSlides } from '../data/products';

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + heroSlides.length) % heroSlides.length);
  const next = () => setCurrent((c) => (c + 1) % heroSlides.length);

  return (
    <div className="hero">
      {heroSlides.map((slide, i) => (
        <div
          key={slide.id}
          className={`hero__slide${i === current ? ' hero__slide--active' : ''}`}
        >
          <img
            src={slide.img}
            alt={slide.title}
            className="hero__img"
          />
          <div className="hero__overlay" />
          <div className="hero__content">
            <div className="hero__tag">{slide.tag}</div>
            <h1 className="hero__title">{slide.title}</h1>
            <p className="hero__sub">{slide.subtitle}</p>
            <Link to={slide.ctaPath} className="hero__cta">
              {slide.cta}
            </Link>
          </div>
        </div>
      ))}

      <button className="hero__arrow hero__arrow--prev" onClick={prev} aria-label="Previous slide">
        &#8249;
      </button>
      <button className="hero__arrow hero__arrow--next" onClick={next} aria-label="Next slide">
        &#8250;
      </button>

      <div className="hero__dots">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            className={`hero__dot${i === current ? ' hero__dot--active' : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
