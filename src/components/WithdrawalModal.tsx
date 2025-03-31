import React, { useState } from 'react';
import { X } from 'lucide-react';
import PixQRCode from './PixQRCode';

interface WithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWithdraw: (pixKey: string, amount: number) => void;
  maxAmount: number;
}

const WithdrawalModal: React.FC<WithdrawalModalProps> = ({ 
  isOpen, 
  onClose, 
  onWithdraw,
  maxAmount
}) => {
  const [pixKey, setPixKey] = useState('');
  const [amount, setAmount] = useState(maxAmount);
  const [error, setError] = useState('');
  const [step, setStep] = useState<'form' | 'qrcode'>('form');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!pixKey.trim()) {
      setError('Por favor, informe uma chave PIX válida');
      return;
    }
    
    if (amount <= 0 || amount > maxAmount) {
      setError(`O valor deve ser entre R$ 1,00 e R$ ${maxAmount.toFixed(2)}`);
      return;
    }
    
    // In a real app, this would call the PushinPay API to generate a QR code
    // For this demo, we'll just show the QR code component
    setStep('qrcode');
    
    // After 3 seconds, simulate a successful withdrawal
    setTimeout(() => {
      onWithdraw(pixKey, amount);
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        
        {step === 'form' ? (
          <>
            <h2 className="text-2xl font-bold mb-6">Saque via PIX</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Valor (R$)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  max={maxAmount}
                  min={1}
                  step="0.01"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Saldo disponível: R$ {maxAmount.toFixed(2)}
                </p>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Chave PIX</label>
                <input
                  type="text"
                  value={pixKey}
                  onChange={(e) => setPixKey(e.target.value)}
                  placeholder="CPF, e-mail, telefone ou chave aleatória"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              
              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                  {error}
                </div>
              )}
              
              <button 
                type="submit"
                className="w-full py-3 bg-[#FF5722] text-white font-bold rounded-lg hover:bg-[#E64A19] transition-colors"
              >
                CONFIRMAR SAQUE
              </button>
            </form>
          </>
        ) : (
          <PixQRCode pixKey={pixKey} amount={amount} />
        )}
      </div>
    </div>
  );
};

export default WithdrawalModal;
