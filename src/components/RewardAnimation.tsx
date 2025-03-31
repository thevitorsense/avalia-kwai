import React, { useEffect, useState } from 'react';

interface RewardAnimationProps {
  isVisible: boolean;
  onComplete: () => void;
}

const RewardAnimation: React.FC<RewardAnimationProps> = ({ isVisible, onComplete }) => {
  const [coins, setCoins] = useState<{ id: number; left: number; delay: number }[]>([]);
  
  useEffect(() => {
    if (isVisible) {
      // Create 20 coins with random positions
      const newCoins = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: Math.random() * 100, // Random horizontal position (0-100%)
        delay: Math.random() * 0.5 // Random delay (0-0.5s)
      }));
      
      setCoins(newCoins);
      
      // Complete animation after 2 seconds
      const timer = setTimeout(() => {
        onComplete();
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none z-30">
      {coins.map((coin) => (
        <div
          key={coin.id}
          className="absolute top-0 text-2xl animate-fall"
          style={{
            left: `${coin.left}%`,
            animationDelay: `${coin.delay}s`,
          }}
        >
          💰
        </div>
      ))}
    </div>
  );
};

export default RewardAnimation;
