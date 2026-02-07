import { useState, useRef, useEffect, useCallback } from 'react';

interface ShyNoButtonProps {
  onNoClick?: () => void;
}

const teasingMessages = [
  "No",
  "Are you sure?",
  "Think again…",
  "I'm shy 🙈",
  "Please? 🥺",
  "Hey!",
  "Still no? 😅",
  "Come on~",
  "Pretty please?",
  "Don't be like that 💕",
  "One more chance?",
  "Really? 🥹",
];

const ShyNoButton = ({ onNoClick }: ShyNoButtonProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [messageIndex, setMessageIndex] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize button position
  useEffect(() => {
    if (buttonRef.current && containerRef.current) {
      const container = containerRef.current.getBoundingClientRect();
      const button = buttonRef.current.getBoundingClientRect();
      
      // Start slightly to the right of center
      setPosition({
        x: container.width / 2 - button.width / 2 + 80,
        y: container.height / 2 - button.height / 2,
      });
      setIsInitialized(true);
    }
  }, []);

  const moveButton = useCallback((cursorX: number, cursorY: number) => {
    if (!buttonRef.current || !containerRef.current) return;

    const button = buttonRef.current.getBoundingClientRect();
    const container = containerRef.current.getBoundingClientRect();

    const buttonCenterX = button.left + button.width / 2;
    const buttonCenterY = button.top + button.height / 2;

    const distance = Math.sqrt(
      Math.pow(cursorX - buttonCenterX, 2) + 
      Math.pow(cursorY - buttonCenterY, 2)
    );

    const bufferZone = 120;

    if (distance < bufferZone) {
      // Calculate direction away from cursor
      const angle = Math.atan2(buttonCenterY - cursorY, buttonCenterX - cursorX);
      
      // Move 100-130px in that direction
      const moveDistance = 100 + Math.random() * 30;
      
      let newX = position.x + Math.cos(angle) * moveDistance;
      let newY = position.y + Math.sin(angle) * moveDistance;

      // Clamp to container bounds with padding
      const padding = 20;
      const maxX = container.width - button.width - padding;
      const maxY = container.height - button.height - padding;

      newX = Math.max(padding, Math.min(newX, maxX));
      newY = Math.max(padding, Math.min(newY, maxY));

      // Avoid the center area where Yes button is (roughly)
      const centerX = container.width / 2;
      const centerY = container.height / 2;
      const yesButtonZone = 100;

      if (Math.abs(newX - centerX + button.width / 2) < yesButtonZone && 
          Math.abs(newY - centerY + button.height / 2) < yesButtonZone) {
        // Push further away from center
        if (newX < centerX) {
          newX = Math.max(padding, centerX - yesButtonZone - button.width);
        } else {
          newX = Math.min(maxX, centerX + yesButtonZone);
        }
      }

      setPosition({ x: newX, y: newY });
      setMessageIndex((prev) => (prev + 1) % teasingMessages.length);
    }
  }, [position]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    moveButton(e.clientX, e.clientY);
  }, [moveButton]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      moveButton(touch.clientX, touch.clientY);
    }
  }, [moveButton]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [handleMouseMove, handleTouchMove]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-20"
    >
      <button
        ref={buttonRef}
        onClick={onNoClick}
        className="btn-no pointer-events-auto absolute"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          opacity: isInitialized ? 1 : 0,
          transition: 'left 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), top 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s ease',
        }}
      >
        {teasingMessages[messageIndex]}
      </button>
    </div>
  );
};

export default ShyNoButton;
