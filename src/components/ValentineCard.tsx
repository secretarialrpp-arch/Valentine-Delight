import { useState } from 'react';
import ShyNoButton from './ShyNoButton';
import Confetti from './Confetti';

const ValentineCard = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handleYesClick = () => {
    setIsExiting(true);
    setTimeout(() => {
      setShowSuccess(true);
    }, 400);
  };

  if (showSuccess) {
    return (
      <>
        <Confetti />
        <div className="fixed inset-0 flex items-center justify-center z-30 p-4">
          <div className="text-center scale-in">
            <div className="text-6xl md:text-8xl mb-6 animate-bounce">
              💖
            </div>
            <h1 className="success-text text-4xl md:text-6xl mb-4">
              Yay!
            </h1>
            <p className="romantic-heading text-2xl md:text-3xl text-foreground/80 mb-2">
              I knew you'd say yes!
            </p>
            <p className="text-lg text-muted-foreground font-clean">
              You've made me the happiest person ever 💕
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-10 p-4">
        <div 
          className={`glass-card rounded-3xl p-8 md:p-12 max-w-md w-full text-center ${
            isExiting ? 'fade-out' : 'fade-in'
          }`}
        >
          {/* Decorative hearts */}
          <div className="text-4xl mb-4">💝</div>
          
          {/* Main question */}
          <h1 className="romantic-heading text-3xl md:text-4xl text-foreground mb-3">
            Be My Valentine?
          </h1>
          
          <p className="text-muted-foreground font-clean mb-8 text-base md:text-lg">
            I promise to make every moment special ✨
          </p>
          {/* Buttons container - side by side */}
          <div className="flex justify-center items-center gap-4">
            <button 
              onClick={handleYesClick}
              className="btn-yes pulse-gentle"
            >
              Yes ❤️
            </button>
            {/* Placeholder for No button alignment - actual No button floats */}
            <div className="w-[120px]" />
          </div>
          
          <p className="text-sm text-muted-foreground/60 mt-6 font-clean italic">
            (The other button is a bit shy...)
          </p>
        </div>
      </div>

      {/* Shy No button that moves around */}
      {!isExiting && <ShyNoButton />}
    </>
  );
};

export default ValentineCard;
