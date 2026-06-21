export default function TopBar() {
  return (
    <div className="top-bar">
      <div className="top-bar__inner">
        <span>SPEDIZIONE GRATUITA per ordini sopra 50 euro</span>
        <span className="top-bar__sep">|</span>
        <span>RITIRO IN NEGOZIO gratuito</span>
        <span className="top-bar__sep">|</span>
        <span>RESI FACILI entro 30 giorni</span>
        <span className="top-bar__sep">|</span>
        <a href="/gift-cards">Buoni Regalo</a>
      </div>
    </div>
  );
}
