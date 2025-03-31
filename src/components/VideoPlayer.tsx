import React, { useEffect, useRef } from 'react';
import { Heart, MessageCircle, Share, Bookmark, MoreVertical } from 'lucide-react';
import { Video } from '../types';
import { createIframeUrl } from '../utils/videoUtils';

interface VideoPlayerProps {
  video: Video;
  onVideoLoaded: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, onVideoLoaded }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.onload = onVideoLoaded;
    }

    return () => {
      if (iframe) {
        iframe.onload = null;
      }
    };
  }, [video.id, onVideoLoaded]);

  return (
    <div className="relative w-full h-full bg-black">
      <iframe 
        ref={iframeRef}
        src={createIframeUrl(video.url)}
        className="w-full h-full"
        frameBorder="0" 
        allowFullScreen
        title={video.title}
      />
      
      <div className="absolute bottom-20 right-4 flex flex-col items-center space-y-6 z-10">
        <div className="flex flex-col items-center">
          <Heart size={28} className="text-white mb-1" />
          <span className="text-white text-xs">{video.likes}</span>
        </div>
        
        <div className="flex flex-col items-center">
          <MessageCircle size={28} className="text-white mb-1" />
          <span className="text-white text-xs">{video.comments}</span>
        </div>
        
        <div className="flex flex-col items-center">
          <Share size={28} className="text-white" />
        </div>
        
        <div className="flex flex-col items-center">
          <Bookmark size={28} className="text-white" />
        </div>
        
        <div className="flex flex-col items-center">
          <MoreVertical size={28} className="text-white" />
        </div>
      </div>
      
      <div className="absolute bottom-4 left-4 z-10">
        <div className="text-white">
          <h3 className="font-bold text-lg">{video.title}</h3>
          <p className="text-sm opacity-80">ENGENHARIA</p>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
