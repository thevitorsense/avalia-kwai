import { User } from '../types';

const USER_KEY = 'kwai_user_data';

const defaultUser: User = {
  balance: 0,
  level: 'Iniciante',
  evaluationsCount: 0,
  evaluationHistory: [],
  withdrawalHistory: []
};

export const getUser = (): User => {
  const userData = localStorage.getItem(USER_KEY);
  if (!userData) {
    return defaultUser;
  }
  
  try {
    return JSON.parse(userData);
  } catch (error) {
    console.error('Error parsing user data:', error);
    return defaultUser;
  }
};

export const saveUser = (user: User): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const updateBalance = (amount: number): User => {
  const user = getUser();
  user.balance += amount;
  saveUser(user);
  return user;
};

export const addEvaluation = (videoId: string, action: 'approved' | 'rejected', reward: number): User => {
  const user = getUser();
  user.evaluationsCount += 1;
  
  // Update level based on evaluation count
  if (user.evaluationsCount > 100) {
    user.level = 'Expert';
  } else if (user.evaluationsCount > 30) {
    user.level = 'Intermediário';
  }
  
  if (action === 'approved') {
    user.balance += reward;
  }
  
  user.evaluationHistory.push({
    videoId,
    action,
    reward: action === 'approved' ? reward : 0,
    date: new Date().toISOString()
  });
  
  saveUser(user);
  return user;
};

export const addWithdrawal = (amount: number, pixKey: string): User => {
  const user = getUser();
  user.balance -= amount;
  
  user.withdrawalHistory.push({
    amount,
    pixKey,
    date: new Date().toISOString(),
    status: 'completed' // In a real app, this would be 'pending' until confirmed
  });
  
  saveUser(user);
  return user;
};

export const getRewardMultiplier = (): number => {
  const user = getUser();
  
  switch (user.level) {
    case 'Expert':
      return 1.10; // 10% increase
    case 'Intermediário':
      return 1.05; // 5% increase
    default:
      return 1.00; // Base reward
  }
};
