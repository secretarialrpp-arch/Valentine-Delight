import { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  left: number;
  color: string;
  delay: number;
  duration: number;
  size: number;
}

const colors = [
  '#ff6b8a', // rose
  '#ff8fab', // pink
  '#ffc2d1', // light pink
  '#ffb4a2', // coral
  '#e5989b', // dusty rose
  '#f7cad0', // blush
];

const Confetti = () => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    const confettiPieces: ConfettiPiece[] = [];
    for (let i = 0; i < 100; i++) {
      confettiPieces.push({
        id: i,
        left: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 2,
        duration: Math.random() * 2 + 3,
        size: Math.random() * 8 + 6,
      });
    }
    setPieces(confettiPieces);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-50">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.left}%`,
            top: '-10px',
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            animation: `confetti-fall ${piece.duration}s ease-out ${piece.delay}s forwards`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;
