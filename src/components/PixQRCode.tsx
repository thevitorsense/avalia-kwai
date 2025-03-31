import React from 'react';

interface PixQRCodeProps {
  pixKey: string;
  amount: number;
}

const PixQRCode: React.FC<PixQRCodeProps> = ({ pixKey, amount }) => {
  // In a real app, this would generate a real QR code using the PushinPay API
  // For this demo, we'll use a placeholder QR code
  
  const pixCopyPaste = `00020126330014BR.GOV.BCB.PIX0111${pixKey}52040000530398654040.005802BR5913PushinPay PIX6008Sao Paulo62070503***6304${Math.floor(Math.random() * 10000)}`;
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-center mb-4">Pagamento PIX</h3>
      
      <div className="flex justify-center mb-4">
        <div className="bg-white p-2 border rounded-lg">
          {/* Placeholder QR code image */}
          <img 
            src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=PushinPayPlaceholderQRCode" 
            alt="QR Code PIX" 
            className="w-48 h-48"
          />
        </div>
      </div>
      
      <div className="text-center mb-4">
        <p className="text-sm text-gray-600 mb-1">Valor a receber</p>
        <p className="text-2xl font-bold">R$ {amount.toFixed(2)}</p>
      </div>
      
      <div className="border rounded-lg p-3 mb-4">
        <p className="text-sm text-gray-600 mb-1">PIX Copia e Cola</p>
        <div className="flex">
          <input 
            type="text" 
            value={pixCopyPaste}
            readOnly
            className="w-full bg-gray-100 p-2 text-sm rounded-l-lg"
          />
          <button 
            onClick={() => {
              navigator.clipboard.writeText(pixCopyPaste);
              alert('Código PIX copiado!');
            }}
            className="bg-[#FF5722] text-white px-3 rounded-r-lg"
          >
            Copiar
          </button>
        </div>
      </div>
      
      <p className="text-xs text-gray-500 text-center">
        Este QR Code é válido por 30 minutos. O valor será creditado em sua conta após a confirmação do pagamento.
      </p>
    </div>
  );
};

export default PixQRCode;
