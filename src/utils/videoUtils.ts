export const createIframeUrl = (videoUrl: string): string => {
  return `https://onelineplayer.com/player.html?autoplay=true&loop=false&autopause=false&muted=false&url=${encodeURIComponent(videoUrl)}&poster=&time=true&progressBar=true&overlay=true&muteButton=true&fullscreenButton=true&style=light&quality=auto&playButton=true`;
};

export const getRandomVideo = (videos: any[], excludeId?: string): any => {
  const filteredVideos = excludeId 
    ? videos.filter(video => video.id !== excludeId) 
    : videos;
  
  const randomIndex = Math.floor(Math.random() * filteredVideos.length);
  return filteredVideos[randomIndex];
};
