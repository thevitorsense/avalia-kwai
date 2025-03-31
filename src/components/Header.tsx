import React, { useState } from 'react';
import { History } from 'lucide-react';
import { User } from '../types';
import HistoryModal from './HistoryModal';
import LevelBadge from './LevelBadge';

interface HeaderProps {
  user: User;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  
  return (
    <>
      <header className="bg-[#1A1A1A] text-white py-3 px-4 flex justify-between items-center fixed top-0 left-0 right-0 z-10">
        <div className="flex space-x-6">
          <button className="font-medium">Live</button>
          <button className="font-medium">Shop</button>
          <button className="font-medium">Seguindo</button>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex flex-col items-end">
            <span className="font-medium">Saldo Total: R$ {user.balance.toFixed(2)}</span>
            <div className="flex items-center mt-1">
              <span className="text-xs mr-2">Avaliações: {user.evaluationsCount}</span>
              <LevelBadge level={user.level} />
            </div>
          </div>
          <button 
            onClick={() => setShowHistoryModal(true)}
            className="text-white"
          >
            <History size={20} />
          </button>
        </div>
      </header>
      
      <HistoryModal 
        isOpen={showHistoryModal}
        onClose={() => setShowHistoryModal(false)}
        user={user}
      />
    </>
  );
};

export default Header;
