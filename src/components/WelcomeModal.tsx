import React from 'react';
import { X } from 'lucide-react';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        
        <h2 className="text-2xl font-bold mb-4">Bem-vindo ao Sistema de Avaliação</h2>
        
        <div className="space-y-4">
          <p>
            Ganhe dinheiro avaliando anúncios! É simples e rápido:
          </p>
          
          <ol className="list-decimal pl-5 space-y-2">
            <li>Assista ao anúncio por pelo menos 5 segundos</li>
            <li>Avalie o anúncio (aprovar ou rejeitar)</li>
            <li>Ganhe R$25 por cada anúncio aprovado</li>
            <li>Quando atingir R$100, você poderá sacar via PIX</li>
          </ol>
          
          <p>
            Quanto mais anúncios você avaliar, maior será seu nível e suas recompensas:
          </p>
          
          <ul className="pl-5 space-y-1">
            <li><strong>Iniciante (1-30 avaliações):</strong> Recompensa base</li>
            <li><strong>Intermediário (31-100 avaliações):</strong> +5% de recompensa</li>
            <li><strong>Expert (101+ avaliações):</strong> +10% de recompensa</li>
          </ul>
        </div>
        
        <button 
          onClick={onClose}
          className="w-full mt-6 py-3 bg-[#FF5722] text-white font-bold rounded-lg hover:bg-[#E64A19] transition-colors"
        >
          COMEÇAR AGORA
        </button>
      </div>
    </div>
  );
};

export default WelcomeModal;
