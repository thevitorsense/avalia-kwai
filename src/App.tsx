import React, { useState, useEffect, useCallback } from 'react';
import { videos } from './data/videos';
import { getUser, addEvaluation, addWithdrawal, getRewardMultiplier } from './utils/localStorage';
import { getRandomVideo } from './utils/videoUtils';
import { User, Video } from './types';

// Components
import Header from './components/Header';
import VideoPlayer from './components/VideoPlayer';
import EvaluationCard from './components/EvaluationCard';
import WithdrawalModal from './components/WithdrawalModal';
import ProgressNotification from './components/ProgressNotification';
import RewardAnimation from './components/RewardAnimation';
import WelcomeModal from './components/WelcomeModal';

// Add animation styles
import './styles/animations.css';

function App() {
  // State
  const [user, setUser] = useState<User>(getUser());
  const [currentVideo, setCurrentVideo] = useState<Video>(getRandomVideo(videos));
  const [showEvaluationCard, setShowEvaluationCard] = useState(false);
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  const [showRewardAnimation, setShowRewardAnimation] = useState(false);
  const [notification, setNotification] = useState({ message: '', show: false });
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Base reward amount
  const baseReward = 25;
  
  // Calculate actual reward with level multiplier
  const actualReward = Math.round(baseReward * getRewardMultiplier());

  // Load user data on mount
  useEffect(() => {
    setUser(getUser());
    
    // Check if it's the first visit
    const isFirstVisit = !localStorage.getItem('kwai_user_data');
    setShowWelcomeModal(isFirstVisit);
  }, []);

  // Show evaluation card after 5 seconds of video playing
  useEffect(() => {
    if (videoLoaded) {
      const timer = setTimeout(() => {
        setShowEvaluationCard(true);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [videoLoaded]);

  // Handle video loaded event
  const handleVideoLoaded = useCallback(() => {
    setVideoLoaded(true);
  }, []);

  // Load next video
  const loadNextVideo = useCallback(() => {
    setVideoLoaded(false);
    setShowEvaluationCard(false);
    const nextVideo = getRandomVideo(videos, currentVideo.id);
    setCurrentVideo(nextVideo);
  }, [currentVideo.id]);

  // Handle approve action
  const handleApprove = useCallback(() => {
    setShowEvaluationCard(false);
    setShowRewardAnimation(true);
    
    // Add evaluation to history and update user data
    const updatedUser = addEvaluation(currentVideo.id, 'approved', actualReward);
    setUser(updatedUser);
    
    // Show progress notifications
    if (updatedUser.evaluationsCount % 5 === 0) {
      setNotification({
        message: 'Continue avaliando para aumentar seu saldo!',
        show: true
      });
    }
    
    // Show withdrawal option
    if (updatedUser.evaluationsCount % 10 === 0 && updatedUser.balance >= 100) {
      setTimeout(() => {
        setShowWithdrawalModal(true);
      }, 2500);
    }
  }, [currentVideo.id, actualReward]);

  // Handle reject action
  const handleReject = useCallback(() => {
    // Add evaluation to history without reward
    const updatedUser = addEvaluation(currentVideo.id, 'rejected', 0);
    setUser(updatedUser);
    
    // Load next video immediately
    loadNextVideo();
  }, [currentVideo.id, loadNextVideo]);

  // Handle withdrawal
  const handleWithdraw = useCallback((pixKey: string, amount: number) => {
    const updatedUser = addWithdrawal(amount, pixKey);
    setUser(updatedUser);
    
    setNotification({
      message: `Saque de R$ ${amount.toFixed(2)} realizado com sucesso!`,
      show: true
    });
  }, []);

  // Close notification
  const closeNotification = useCallback(() => {
    setNotification(prev => ({ ...prev, show: false }));
  }, []);

  // Complete reward animation
  const completeRewardAnimation = useCallback(() => {
    setShowRewardAnimation(false);
    loadNextVideo();
  }, [loadNextVideo]);

  return (
    <div className="flex flex-col h-screen bg-black">
      {/* Header */}
      <Header user={user} />
      
      {/* Main Content */}
      <main className="flex-1 pt-12 relative">
        {/* Video Player */}
        <div className="h-full">
          <VideoPlayer 
            video={currentVideo} 
            onVideoLoaded={handleVideoLoaded}
          />
        </div>
        
        {/* Evaluation Card */}
        <EvaluationCard 
          reward={actualReward}
          onApprove={handleApprove}
          onReject={handleReject}
          isVisible={showEvaluationCard}
        />
        
        {/* Reward Animation */}
        <RewardAnimation 
          isVisible={showRewardAnimation}
          onComplete={completeRewardAnimation}
        />
        
        {/* Withdrawal Modal */}
        <WithdrawalModal 
          isOpen={showWithdrawalModal}
          onClose={() => setShowWithdrawalModal(false)}
          onWithdraw={handleWithdraw}
          maxAmount={user.balance}
        />
        
        {/* Progress Notification */}
        <ProgressNotification 
          message={notification.message}
          isVisible={notification.show}
          onClose={closeNotification}
        />
        
        {/* Welcome Modal */}
        <WelcomeModal 
          isOpen={showWelcomeModal}
          onClose={() => setShowWelcomeModal(false)}
        />
      </main>
      
      {/* Withdrawal Button */}
      {user.balance >= 100 && (
        <div className="fixed bottom-4 right-4 z-20">
          <button 
            onClick={() => setShowWithdrawalModal(true)}
            className="bg-[#FF5722] text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-[#E64A19] transition-colors flex items-center"
          >
            Sacar via PIX
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
