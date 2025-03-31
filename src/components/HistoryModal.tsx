import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { User } from '../types';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

const HistoryModal: React.FC<HistoryModalProps> = ({ isOpen, onClose, user }) => {
  const [activeTab, setActiveTab] = useState<'evaluations' | 'withdrawals'>('evaluations');
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        
        <h2 className="text-2xl font-bold mb-6">Histórico</h2>
        
        {/* Tabs */}
        <div className="flex border-b mb-4">
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'evaluations' ? 'text-[#FF5722] border-b-2 border-[#FF5722]' : 'text-gray-500'}`}
            onClick={() => setActiveTab('evaluations')}
          >
            Avaliações
          </button>
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'withdrawals' ? 'text-[#FF5722] border-b-2 border-[#FF5722]' : 'text-gray-500'}`}
            onClick={() => setActiveTab('withdrawals')}
          >
            Saques
          </button>
        </div>
        
        {/* Content */}
        <div className="overflow-y-auto flex-1">
          {activeTab === 'evaluations' ? (
            <div className="space-y-2">
              {user.evaluationHistory.length > 0 ? (
                [...user.evaluationHistory].reverse().map((evaluation, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">
                          Anúncio {evaluation.videoId}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(evaluation.date).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          evaluation.action === 'approved' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {evaluation.action === 'approved' ? 'Aprovado' : 'Rejeitado'}
                        </span>
                        {evaluation.action === 'approved' && (
                          <span className="ml-3 font-medium text-[#FF5722]">
                            +R$ {evaluation.reward.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-8">
                  Nenhuma avaliação realizada ainda.
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              {user.withdrawalHistory.length > 0 ? (
                [...user.withdrawalHistory].reverse().map((withdrawal, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">
                          Saque via PIX
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(withdrawal.date).toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Chave: {withdrawal.pixKey.substring(0, 4)}...
                        </p>
                      </div>
                      <div className="flex items-center">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          withdrawal.status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {withdrawal.status === 'completed' ? 'Concluído' : 'Pendente'}
                        </span>
                        <span className="ml-3 font-medium">
                          R$ {withdrawal.amount.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-8">
                  Nenhum saque realizado ainda.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryModal;
