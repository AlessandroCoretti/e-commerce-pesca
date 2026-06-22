import { useState, useRef } from 'react';

// Sostituisci gli youtubeId con gli ID reali dei vostri video YouTube
// Es: se il link è youtube.com/watch?v=dQw4w9WgXcQ → youtubeId: 'dQw4w9WgXcQ'
import imgNature from '../assets/img-nature.jpg';
import imgHero   from '../assets/img-hero.jpg';
const T1 = imgNature;
const T2 = imgHero;

const videos = [
  { id: 1, youtubeId: 'INSERISCI_ID_1', title: 'Giornata di pesca sul lago', thumb: T1 },
  { id: 2, youtubeId: 'INSERISCI_ID_2', title: 'Luccio da record!',          thumb: T2 },
  { id: 3, youtubeId: 'INSERISCI_ID_3', title: 'Tecnica spinning sul fiume', thumb: T1 },
  { id: 4, youtubeId: 'INSERISCI_ID_4', title: 'Pesca alla carpa notturna',  thumb: T2 },
  { id: 5, youtubeId: 'INSERISCI_ID_5', title: 'Uscita in kayak al tramonto',thumb: T1 },
  { id: 6, youtubeId: 'INSERISCI_ID_6', title: 'Montaggio esca perfetto',    thumb: T2 },
];

function PlayIcon() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <circle cx="26" cy="26" r="26" fill="rgba(0,0,0,0.55)" />
      <polygon points="21,16 40,26 21,36" fill="#ffffff" />
    </svg>
  );
}

function VideoModal({ video, onClose }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.88)',
        zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: 20, right: 24, color: '#fff', fontSize: 32,
          background: 'none', border: 'none', cursor: 'pointer', lineHeight: 1,
        }}
        aria-label="Chiudi"
      >
        &times;
      </button>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ width: 'min(90vw, 390px)', aspectRatio: '9/16', borderRadius: 12, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.6)' }}
      >
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ border: 'none', display: 'block' }}
        />
      </div>
    </div>
  );
}

export default function VideoCarousel() {
  const [active, setActive] = useState(null);
  const trackRef = useRef(null);

  const scroll = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: dir * 280, behavior: 'smooth' });
  };

  return (
    <section className="section section--dark-bg">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title" style={{ color: '#fff' }}>I Nostri Video</h2>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="vid-arrow" onClick={() => scroll(-1)} aria-label="Precedente">&larr;</button>
            <button className="vid-arrow" onClick={() => scroll(1)}  aria-label="Successivo">&rarr;</button>
          </div>
        </div>

        <div className="vid-track" ref={trackRef}>
          {videos.map((v) => (
            <div key={v.id} className="vid-card" onClick={() => setActive(v)}>
              <img src={v.thumb} alt={v.title} className="vid-card__thumb" loading="lazy" />
              <div className="vid-card__overlay">
                <PlayIcon />
                <p className="vid-card__title">{v.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {active && <VideoModal video={active} onClose={() => setActive(null)} />}
    </section>
  );
}
