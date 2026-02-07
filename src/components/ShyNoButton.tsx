import { useState, useRef, useEffect, useCallback } from 'react';

interface ShyNoButtonProps {
  onNoClick?: () => void;
}

const teasingMessages = [
  // Classic Tease
  "Nope 😜", "Almost!", "Too slow 😏", "Nice try!", "Not happening 💃",
  "You wish 😈", "Hehe 😝", "Missed me!", "Try again 😌", "Not today!",
  "LOL nope", "Close… but no 😏", "Still no 😜", "Getting warmer!", "Oops!",
  "Whoosh 💨", "You're determined!", "Admit defeat 😈", "Neverrrrr", "Haha nope!",
  
  // Smug Energy
  "Almost had me 😆", "No chance!", "Too easy 😎", "Denied ❌", "Not even close",
  "Slowpoke 🐢", "Catch me if you can 😏", "Dream on 💭", "You're cute when you try ❤️", "Try harder 😈",
  "I'm fasttt 🏃‍♂️", "No means… nope!", "Still chasing?", "Persistence noted 😌", "This is fun!",
  "You're smiling, aren't you? 😏", "Missed again!", "Haha!", "I could do this all day 😜", "Nope²",
  
  // Tech / Meme Tease
  "No button go brrr", "404: No not found", "Access denied 🔒", "Permission revoked 😌", "Error: Try again",
  "Loading… nope", "System says no 😈", "Request rejected", "Timeout ⏳", "Wrong input 😏",
  "Nice click though", "Unauthorized 😎", "Reboot and retry", "Still nope.exe", "That feature is locked",
  "Invalid attempt", "Nope—but stylish", "Buffering… denied", "Hard no 💀", "Glitch avoided 😜",
  
  // Playfully Mean
  "You won't win 😈", "Are you tired yet?", "That was close 😳", "Nope nope nope", "Keep trying!",
  "You're enjoying this 😏", "Too predictable!", "Nice reflexes!", "No escaping me!", "I'm unstoppable 😎",
  "You almost had me 💀", "Try the other one 😉", "Why so serious? 😌", "Haha got away!", "No is shy 🙈",
  "Can't touch this 🎵", "Mission failed 😜", "Better luck next time!", "Nope x100", "Still here!",
  
  // Fast & Slippery
  "This button has legs 🦵", "Zoom zoom 💨", "Catch meeee!", "Too slow again", "Slipped right past 😏",
  "Almost—psych!", "Missed by that much", "Not quite 😌", "Speed boost activated", "Dodged 😈",
  "Blink and you'll miss me", "That was adorable", "Nope, but close-ish", "Quick fingers, wrong target", "Still nope 😜",
  "Try with confidence", "Juuuust missed", "Smooth fail 😎", "Faster next time", "Nope—stylishly",
  
  // Flirty Tease
  "You love this 😘", "Look at you trying 😏", "Cute effort ❤️", "Almost impressed", "I see what you did",
  "You're bold—I like it 😈", "Tempting… but no", "Flattery won't help 😌", "Keep that energy", "That grin gave you away",
  "You're persistent 😏", "Trying to charm me?", "Not falling for that", "Smooth move… still no", "I admire the effort 😘",
  "Almost convincing", "You thought that'd work", "Not bad—but nope", "I'm immune 😎", "Cute tactic 😉",
  
  // Absolute Chaos
  "Nope nope nope nope", "Lol absolutely not", "Big swing, big miss", "Try again tomorrow 😈", "Still denied",
  "Not even in this universe", "Bold of you to assume", "The audacity 😏", "You tried though", "Wrong door 🚪",
  "Keep guessing", "Swing and a miss", "Almost fooled me", "That was ambitious", "Still chasing dreams 💭",
  "Nope with confidence", "That one hurt a little", "Yikes—nope", "You're relentless", "Respect… but no",
  
  // Endgame Energy
  "Again? 😌", "You never give up", "Still no 😜", "The answer remains no", "Consistency is key",
  "Same result", "Groundhog Day, huh?", "Try a new strategy", "Nope—final answer", "You're committed",
  "That optimism though", "Nope but iconic", "I admire the grind 😏", "That confidence is loud", "Almost charming enough",
  "Still locked 🔒", "The chase continues", "You're unstoppable—but I am too 😎", "Nice persistence", "Not today, champ",
  
  // Bonus Snappy Closers
  "Nope on repeat", "Still denied 😈", "Try once more", "That was cute", "You tried again 😂",
  "Nope—remastered", "Same answer", "Almost funny", "You're committed fr", "Respect the effort",
  "Not this time 😏", "Nope with flair", "Still a no", "I'm entertained", "Keep going 😜",
  "Denial is my cardio", "That enthusiasm though", "Still locked out", "You don't quit", "Nope—but impressive",
  
  // Final Sprinkle
  "Again?? 😌", "Bold move", "You're hopeful", "Still nope", "Not even close 😜",
  "That confidence is wild", "Nope—but nice try", "You're having fun", "Still chasing 😏", "Same result, different try",
  "You're adorable", "Denied again ❌", "Try later", "Almost legendary fail", "Nope—iconic edition",
  "You're consistent", "That effort tho", "Still no ❤️", "Nope forever 😈", "Okay one more try… nope 😜",
];

const ShyNoButton = ({ onNoClick }: ShyNoButtonProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [messageIndex, setMessageIndex] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastMessageChangeRef = useRef<number>(0);
  const lastMoveRef = useRef<number>(0);

  // Initialize button position - centered like Yes button
  useEffect(() => {
    if (buttonRef.current && containerRef.current) {
      const container = containerRef.current.getBoundingClientRect();
      const button = buttonRef.current.getBoundingClientRect();
      
      // Center the button (same as Yes button position)
      setPosition({
        x: container.width / 2 - button.width / 2,
        y: container.height / 2 - button.height / 2 + 60, // Slightly below center to be under Yes
      });
      setIsInitialized(true);
    }
  }, []);

  const moveButton = useCallback((cursorX: number, cursorY: number) => {
    if (!buttonRef.current || !containerRef.current) return;

    const now = Date.now();
    // Throttle movement to every 300ms for smoother, slower feel
    if (now - lastMoveRef.current < 300) return;

    const button = buttonRef.current.getBoundingClientRect();
    const container = containerRef.current.getBoundingClientRect();

    const buttonCenterX = button.left + button.width / 2;
    const buttonCenterY = button.top + button.height / 2;

    const distance = Math.sqrt(
      Math.pow(cursorX - buttonCenterX, 2) + 
      Math.pow(cursorY - buttonCenterY, 2)
    );

    const bufferZone = 100;

    if (distance < bufferZone) {
      lastMoveRef.current = now;
      
      // Calculate direction away from cursor
      const angle = Math.atan2(buttonCenterY - cursorY, buttonCenterX - cursorX);
      
      // Move 80-100px in that direction (slower than before)
      const moveDistance = 80 + Math.random() * 20;
      
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
      
      // Only change message every 800ms for smoother reading
      if (now - lastMessageChangeRef.current > 800) {
        setMessageIndex((prev) => (prev + 1) % teasingMessages.length);
        lastMessageChangeRef.current = now;
      }
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
          transition: 'left 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), top 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s ease',
        }}
      >
        {teasingMessages[messageIndex]}
      </button>
    </div>
  );
};

export default ShyNoButton;
