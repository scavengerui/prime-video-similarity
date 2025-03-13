
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ContentCard from './ContentCard';
import { cn } from '@/lib/utils';

interface ContentItem {
  id: number;
  title: string;
  image: string;
  rating?: number;
  isPrime?: boolean;
  isNew?: boolean;
}

interface ContentRowProps {
  title: string;
  items: ContentItem[];
  isPrimeBranded?: boolean;
}

const ContentRow = ({ title, items, isPrimeBranded = false }: ContentRowProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  
  const scrollAmount = 800;
  
  const handleScroll = () => {
    if (!sliderRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };
  
  const scrollLeft = () => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  };
  
  const scrollRight = () => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };
  
  return (
    <div className="relative py-6 animate-fade-in opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
      <div className="prime-container">
        <div className="flex items-center mb-4">
          <h2 className={cn(
            "text-xl md:text-2xl font-medium",
            isPrimeBranded ? "text-prime-blue" : "text-prime-light"
          )}>
            {title}
          </h2>
          {isPrimeBranded && (
            <span className="ml-2 px-2 py-1 bg-prime-blue/20 text-prime-blue text-xs rounded-full">
              Prime
            </span>
          )}
        </div>
        
        <div className="relative group">
          {/* Left Arrow */}
          <button 
            className={cn(
              "absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-prime-dark/80 text-white transition-all duration-300 backdrop-blur-sm border border-white/10",
              showLeftArrow ? "opacity-100 -left-4" : "opacity-0 -left-6 pointer-events-none"
            )}
            onClick={scrollLeft}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          {/* Content Slider */}
          <div 
            ref={sliderRef}
            className="content-slider gap-4 -mx-4 px-4"
            onScroll={handleScroll}
          >
            {items.map((item, index) => (
              <ContentCard
                key={item.id}
                title={item.title}
                image={item.image}
                rating={item.rating}
                isPrime={item.isPrime}
                isNew={item.isNew}
                index={index}
              />
            ))}
          </div>
          
          {/* Right Arrow */}
          <button 
            className={cn(
              "absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-prime-dark/80 text-white transition-all duration-300 backdrop-blur-sm border border-white/10",
              showRightArrow ? "opacity-100 -right-4" : "opacity-0 -right-6 pointer-events-none"
            )}
            onClick={scrollRight}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentRow;
