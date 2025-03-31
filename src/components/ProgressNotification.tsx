import React, { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';

interface ProgressNotificationProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const ProgressNotification: React.FC<ProgressNotificationProps> = ({ 
  message, 
  isVisible, 
  onClose 
}) => {
  const [isShowing, setIsShowing] = useState(false);
  
  useEffect(() => {
    if (isVisible) {
      setIsShowing(true);
      const timer = setTimeout(() => {
        setIsShowing(false);
        setTimeout(onClose, 300); // Allow animation to complete
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);
  
  if (!isVisible) return null;
  
  return (
    <div 
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-[#4CAF50] text-white px-6 py-3 rounded-full shadow-lg flex items-center space-x-2 transition-opacity duration-300 ${isShowing ? 'opacity-100' : 'opacity-0'}`}
    >
      <CheckCircle size={20} />
      <span>{message}</span>
    </div>
  );
};

export default ProgressNotification;
