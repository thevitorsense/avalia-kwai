export interface Video {
  id: string;
  url: string;
  title: string;
  likes: string;
  comments: string;
  category: string;
}

export interface User {
  balance: number;
  level: 'Iniciante' | 'Intermediário' | 'Expert';
  evaluationsCount: number;
  evaluationHistory: {
    videoId: string;
    action: 'approved' | 'rejected';
    reward: number;
    date: string;
  }[];
  withdrawalHistory: {
    amount: number;
    pixKey: string;
    date: string;
    status: 'pending' | 'completed';
  }[];
}
