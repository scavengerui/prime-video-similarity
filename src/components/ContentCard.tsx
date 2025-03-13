
import { useState } from 'react';
import { Play, Plus, Star, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';
import { useUser } from '@clerk/clerk-react';

interface ContentCardProps {
  title: string;
  image: string;
  rating?: number;
  isPrime?: boolean;
  isNew?: boolean;
  index?: number;
}

const ContentCard = ({ 
  title, 
  image, 
  rating = 0, 
  isPrime = false,
  isNew = false,
  index = 0 
}: ContentCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { isSignedIn } = useUser();
  
  // Fallback image if the main one fails to load
  const fallbackImage = "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=500&auto=format";
  
  const handlePlay = () => {
    // Mock video URL - in a real app, this would be a proper video URL
    const videoUrl = "https://jsoncompare.org/LearningContainer/SampleFiles/Video/MP4/sample-mp4-file.mp4";
    
    // Open video in a lightbox or new window
    window.open(videoUrl, '_blank');
    
    toast({
      title: "Starting playback",
      description: `Now playing: ${title}`,
      duration: 3000
    });
  };

  const handleAddToWatchlist = () => {
    if (!isSignedIn) {
      toast({
        title: "Sign in required",
        description: "Please sign in to add items to your watchlist",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Added to watchlist",
      description: `${title} has been added to your watchlist`,
    });
  };
  
  return (
    <div 
      className="snap-start shrink-0 w-[180px] md:w-[220px] transition-all duration-500 ease-out transform content-card"
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={cn(
        "relative rounded-md overflow-hidden transition-all duration-300 transform",
        isHovered ? "scale-105 shadow-xl z-10" : "scale-100"
      )}>
        {/* Image */}
        <div className="relative aspect-[2/3] bg-prime-accent/50">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-prime-accent/50">
              <div className="w-8 h-8 border-2 border-prime-blue border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <img 
            src={imageError ? fallbackImage : image} 
            alt={title} 
            className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              console.log(`Image failed to load: ${image}, using fallback`);
              setImageError(true);
              setImageLoaded(true);
            }}
          />
          
          {/* Info Overlay (visible on hover) */}
          <div className={cn(
            "absolute inset-0 content-gradient transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0"
          )}>
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <div className="flex justify-between items-end mb-2">
                <div>
                  {isPrime && (
                    <span className="inline-block bg-prime-blue/90 text-white text-xs font-medium px-2 py-1 rounded mb-2">
                      Prime
                    </span>
                  )}
                  {isNew && (
                    <span className="inline-block bg-green-500/90 text-white text-xs font-medium px-2 py-1 rounded ml-2 mb-2">
                      New
                    </span>
                  )}
                </div>
                
                {rating > 0 && (
                  <div className="flex items-center text-yellow-400 text-sm">
                    <Star className="w-4 h-4 fill-current mr-1" />
                    <span>{rating.toFixed(1)}</span>
                  </div>
                )}
              </div>
              
              <p className="text-white text-sm font-medium mb-3 line-clamp-1">{title}</p>
              
              <div className="flex space-x-2">
                <button 
                  className="flex items-center justify-center bg-prime-blue text-white p-2 rounded-full transition-all duration-200 hover:bg-prime-blue/90"
                  onClick={handlePlay}
                >
                  <Play className="w-4 h-4" />
                </button>
                <button 
                  className="flex items-center justify-center bg-prime-gray/40 text-white p-2 rounded-full transition-all duration-200 hover:bg-prime-gray/60"
                  onClick={handleAddToWatchlist}
                >
                  <Plus className="w-4 h-4" />
                </button>
                <button className="flex items-center justify-center bg-prime-gray/40 text-white p-2 rounded-full transition-all duration-200 hover:bg-prime-gray/60">
                  <Info className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Title (visible only when not hovered) */}
      <div className={cn(
        "mt-2 transition-opacity duration-300", 
        isHovered ? "opacity-0" : "opacity-100"
      )}>
        <p className="text-sm text-prime-light line-clamp-1">{title}</p>
      </div>
    </div>
  );
};

export default ContentCard;
