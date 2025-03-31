import React from 'react';

interface EvaluationCardProps {
  reward: number;
  onApprove: () => void;
  onReject: () => void;
  isVisible: boolean;
}

const EvaluationCard: React.FC<EvaluationCardProps> = ({ 
  reward, 
  onApprove, 
  onReject, 
  isVisible 
}) => {
  if (!isVisible) return null;

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 w-80 z-20">
      <h2 className="text-xl font-bold text-center mb-2">Avalie e Ganhe</h2>
      <p className="text-center text-gray-600 mb-4">Avalie os anúncios e ganhe por anúncio.</p>
      
      <div className="text-center mb-6">
        <span className="text-3xl font-bold">
          R$ <span className="text-[#FF5722]">{reward}</span>
        </span>
      </div>
      
      <div className="space-y-3">
        <button 
          onClick={onApprove}
          className="w-full py-3 bg-[#FF5722] text-white font-bold rounded-lg hover:bg-[#E64A19] transition-colors"
        >
          APROVAR ANÚNCIO
        </button>
        
        <button 
          onClick={onReject}
          className="w-full py-3 bg-[#E0E0E0] text-gray-700 font-bold rounded-lg hover:bg-[#BDBDBD] transition-colors"
        >
          REJEITAR ANÚNCIO
        </button>
      </div>
    </div>
  );
};

export default EvaluationCard;
