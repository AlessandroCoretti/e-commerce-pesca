export default function BpsLogo({ size = 88 }) {
  return (
    <svg width={size} height={Math.round(size * 0.65)} viewBox="0 0 180 120" xmlns="http://www.w3.org/2000/svg">
      {/* Outer oval */}
      <ellipse cx="90" cy="60" rx="86" ry="56" fill="#e9c637" stroke="#8B6A00" strokeWidth="3" />
      {/* Inner subtle shadow oval */}
      <ellipse cx="90" cy="60" rx="80" ry="50" fill="none" stroke="#c9a400" strokeWidth="1" />

      {/* Fish silhouette (jumping fish shape) */}
      <g transform="translate(112, 18) rotate(35)">
        <ellipse cx="0" cy="0" rx="18" ry="8" fill="#406034" />
        <polygon points="18,0 28,-10 28,10" fill="#406034" />
        <circle cx="-12" cy="-3" r="2.5" fill="#e9c637" />
      </g>

      {/* BASS PRO */}
      <text
        x="90"
        y="52"
        textAnchor="middle"
        fill="#bc282d"
        fontSize="22"
        fontWeight="900"
        fontFamily="Arial Black, Arial, sans-serif"
        letterSpacing="1"
      >
        BASS PRO
      </text>

      {/* SHOPS */}
      <text
        x="90"
        y="74"
        textAnchor="middle"
        fill="#bc282d"
        fontSize="16"
        fontWeight="900"
        fontFamily="Arial Black, Arial, sans-serif"
        letterSpacing="3"
      >
        SHOPS
      </text>

      {/* Decorative line */}
      <line x1="30" y1="80" x2="150" y2="80" stroke="#8B6A00" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}
