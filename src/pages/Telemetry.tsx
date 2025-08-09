import React from 'react';

// Strona osadzająca statyczną zakładkę telemetry (rozpakowaną do public/telemetry)
// Używamy PUBLIC_URL, aby działało poprawnie na GitHub Pages i innych hostingach statycznych
const Telemetry: React.FC = () => {
  const src = `${process.env.PUBLIC_URL}/telemetry/index.html`;
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#0b0b0b' }}>
      <iframe
        title="Live Telemetry"
        src={src}
        style={{ width: '100%', height: '100%', border: 'none' }}
        allow="fullscreen; clipboard-read; clipboard-write;"
      />
    </div>
  );
};

export default Telemetry;


