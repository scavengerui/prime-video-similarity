
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
}

const HeroSection = ({ 
  title, 
  description, 
  image, 
  rating = "16+", 
  year = "2023", 
  duration = "2h 15m" 
}: HeroSectionProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <section className="relative w-full h-[75vh] md:h-[85vh] overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={image} 
          alt={title}
          className={`lazy-load ${isLoaded ? 'loaded' : ''} w-full h-full object-cover object-center transition-transform duration-10000 ease-out transform scale-105`}
          style={{ transform: `scale(${isLoaded ? 1.05 : 1.1})` }}
          onLoad={handleImageLoad}
        />
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-prime-dark/80 via-prime-dark/40 to-transparent"></div>
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
            <button className="flex items-center justify-center bg-prime-blue hover:bg-prime-blue/90 text-white font-medium px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105">
              <Play className="w-5 h-5 mr-2" />
              Play
            </button>
            <button className="flex items-center justify-center bg-prime-gray/30 hover:bg-prime-gray/40 text-white font-medium px-6 py-3 rounded-full transition-all duration-300 backdrop-blur-sm">
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
