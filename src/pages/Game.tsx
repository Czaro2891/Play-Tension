import React from 'react';

const Game: React.FC = () => {
  const src = `${process.env.PUBLIC_URL}/game/index.html`;
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#0e0e10' }}>
      <iframe
        title="Game: Rozbieranie w Ciemno"
        src={src}
        style={{ width: '100%', height: '100%', border: 'none' }}
      />
    </div>
  );
};

export default Game;


