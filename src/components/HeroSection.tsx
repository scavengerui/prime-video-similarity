
import { useState, useEffect } from 'react';
import { Play, Plus, Info } from 'lucide-react';
import { handleImageLoad } from '@/utils/animations';

interface HeroSectionProps {
  title: string;
  description: string;
  image: string;
  rating?: string;
  year?: string;
  duration?: string;
  onPlay?: () => void;
  onAddToWatchlist?: () => void;
}

const HeroSection = ({ 
  title, 
  description, 
  image, 
  rating = "16+", 
  year = "2023", 
  duration = "2h 15m",
  onPlay,
  onAddToWatchlist
}: HeroSectionProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Fallback image if the main one fails to load
  const fallbackImage = "https://images.unsplash.com/photo-1506466010722-395aa2bef877?w=1600&auto=format";
  
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, []);

  const handlePlayClick = () => {
    setIsVideoPlaying(true);
    
    // Open a sample video in a new tab
    window.open("https://jsoncompare.org/LearningContainer/SampleFiles/Video/MP4/sample-mp4-file.mp4", "_blank");
    
    if (onPlay) onPlay();
    
    // Reset after 3 seconds
    setTimeout(() => {
      setIsVideoPlaying(false);
    }, 3000);
  };

  return (
    <section className="relative w-full h-[75vh] md:h-[85vh] overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0 w-full h-full">
        {isVideoPlaying ? (
          <div className="absolute inset-0 bg-black flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-prime-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-white text-lg">Playing {title}...</p>
            </div>
          </div>
        ) : (
          <>
            <div className="w-full h-full bg-prime-accent/30">
              <img 
                src={imageError ? fallbackImage : image} 
                alt={title}
                className={`w-full h-full object-cover object-center transition-transform duration-10000 ease-out transform ${isLoaded ? 'opacity-100 scale-105' : 'opacity-0 scale-110'}`}
                style={{ transition: 'opacity 0.5s, transform 10s' }}
                onLoad={() => setIsLoaded(true)}
                onError={() => {
                  console.log(`Hero image failed to load: ${image}, using fallback`);
                  setImageError(true);
                  setIsLoaded(true);
                }}
              />
            </div>
            <div className="absolute inset-0 hero-gradient"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-prime-dark/80 via-prime-dark/40 to-transparent"></div>
          </>
        )}
      </div>
      
      {/* Content */}
      <div className="relative z-10 prime-container h-full flex flex-col justify-end pb-16 md:pb-24">
        <div className="max-w-2xl mb-8 animate-fade-in opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          <span className="inline-flex items-center rounded-full bg-prime-blue/20 px-3 py-1 text-sm font-medium text-prime-blue mb-4">
            Prime Original
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-prime-light text-shadow mb-4">
            {title}
          </h1>
          
          <div className="flex items-center space-x-4 text-prime-gray text-sm md:text-base mb-4">
            <span>{rating}</span>
            <span className="w-1 h-1 rounded-full bg-prime-gray"></span>
            <span>{year}</span>
            <span className="w-1 h-1 rounded-full bg-prime-gray"></span>
            <span>{duration}</span>
          </div>
          
          <p className="text-base md:text-lg text-prime-gray max-w-xl leading-relaxed mb-6">
            {description}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button 
              className="flex items-center justify-center bg-prime-blue hover:bg-prime-blue/90 text-white font-medium px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
              onClick={handlePlayClick}
            >
              <Play className="w-5 h-5 mr-2" />
              Play
            </button>
            <button 
              className="flex items-center justify-center bg-prime-gray/30 hover:bg-prime-gray/40 text-white font-medium px-6 py-3 rounded-full transition-all duration-300 backdrop-blur-sm"
              onClick={onAddToWatchlist}
            >
              <Plus className="w-5 h-5 mr-2" />
              Watchlist
            </button>
            <button className="flex items-center justify-center bg-prime-gray/30 hover:bg-prime-gray/40 text-white font-medium px-6 py-3 rounded-full transition-all duration-300 backdrop-blur-sm">
              <Info className="w-5 h-5 mr-2" />
              Details
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
