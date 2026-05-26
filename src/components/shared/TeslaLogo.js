export default function TeslaLogo({ height = 20, fill = "white" }) {
  return (
    <svg
      height={height}
      viewBox="0 0 400 62"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
    >
      {/* T */}
      <polygon points="0,0 0,8 27,8 27,62 35,62 35,8 62,8 62,0" />
      {/* E */}
      <polygon points="80,0 80,62 140,62 140,54 88,54 88,35 134,35 134,27 88,27 88,8 140,8 140,0" />
      {/* S */}
      <path d="M158,0 L218,0 L218,8 L166,8 L166,27 L218,27 L218,62 L158,62 L158,54 L210,54 L210,35 L158,35 Z" />
      {/* L */}
      <polygon points="236,0 236,62 296,62 296,54 244,54 244,0" />
      {/* A */}
      <path d="M318,0 L358,0 L400,62 L391,62 L354,8 L322,8 L285,62 L276,62 Z M310,38 L390,38 L390,46 L310,46 Z" />
    </svg>
  );
}
