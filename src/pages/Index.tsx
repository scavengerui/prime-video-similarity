import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ContentRow from '@/components/ContentRow';
import Footer from '@/components/Footer';
import { useAuthGuard } from '@/hooks/use-auth-guard';
import { useUser } from '@clerk/clerk-react';
import { toast } from '@/components/ui/use-toast';

// Updated content with more appropriate images
const featuredContent = {
  title: "The Lord of the Rings: The Rings of Power",
  description: "Beginning in a time of relative peace, the series follows an ensemble cast of characters as they confront the re-emergence of evil in Middle-earth. From the darkest depths of the Misty Mountains, to the majestic forests of the elf-capital of Lindon, to the island kingdom of Númenor, these kingdoms and characters will carve out legacies that live on long after they are gone.",
  image: "https://m.media-amazon.com/images/S/pv-target-images/3c57458cadc9c4cf8e41d7f5708eade74df8b966d4902c09e5b72596a6ec2665.jpg",
  rating: "16+",
  year: "2022",
  duration: "1 Season"
};

const trendingMovies = [
  { id: 1, title: "The Tomorrow War", image: "https://m.media-amazon.com/images/S/pv-target-images/b473ffe2d43ae3784e86be73f937c280bdd9666d8e69ed52ef68b32b54cf58a7.jpg", rating: 7.2, isPrime: true },
  { id: 2, title: "Without Remorse", image: "https://m.media-amazon.com/images/S/pv-target-images/7398fbed0cb3524810c3cbf689fa135699e0fb2d775e5d4ece27b57889066d49.jpg", rating: 6.8, isPrime: true },
  { id: 3, title: "Sound of Metal", image: "https://m.media-amazon.com/images/S/pv-target-images/58897bdac581d2bf8f003724434ad31ba1f6aed93e7a3c78ac910eda83609da9.jpg", rating: 8.1, isPrime: true },
  { id: 4, title: "Coming 2 America", image: "https://m.media-amazon.com/images/S/pv-target-images/7c63e722a5ca4c3d5ecaafbd0275ee8e24f18592365715d0cb27434e0cbd5621.jpg", rating: 6.2, isPrime: true, isNew: true },
  { id: 5, title: "Borat Subsequent Moviefilm", image: "https://m.media-amazon.com/images/S/pv-target-images/6e99810e1621c621865fb3f7897ad2d3e4dcf4fbf6e51365dc3c87463042723c.jpg", rating: 7.4, isPrime: true },
  { id: 6, title: "The Map of Tiny Perfect Things", image: "https://m.media-amazon.com/images/S/pv-target-images/29c77d0cce5243fd88ea170a9743cc7b2e0f2192ae0113070e43e307189c57f4.jpg", rating: 6.9, isPrime: true },
  { id: 7, title: "The Vast of Night", image: "https://m.media-amazon.com/images/S/pv-target-images/f72fea5e7eda0d9e0c55c30f0657afd0bef76e9753c4f766c5cadbe9325fcb35.jpg", rating: 7.5, isPrime: true },
  { id: 8, title: "Birds of Paradise", image: "https://m.media-amazon.com/images/S/pv-target-images/c3dd00c91c01ae120bea5bdfc54f5c34bc7a0bf73bd2d0ca6b7af0f2dce97e7e.jpg", rating: 6.4, isPrime: true, isNew: true },
];

const originals = [
  { id: 9, title: "The Wheel of Time", image: "https://m.media-amazon.com/images/S/pv-target-images/157754b642c79f952f14452581e5c48150dd1388058803f19819f88996c44a98.jpg", rating: 7.7, isPrime: true },
  { id: 10, title: "The Boys", image: "https://m.media-amazon.com/images/S/pv-target-images/493efc5471998c099f999f895e4588a99c959b19d91980809954047102459941.jpg", rating: 8.8, isPrime: true },
  { id: 11, title: "Invincible", image: "https://m.media-amazon.com/images/S/pv-target-images/1999779555911549556140754111111111111111111111111111111111111111.jpg", rating: 8.7, isPrime: true },
  { id: 12, title: "The Expanse", image: "https://m.media-amazon.com/images/S/pv-target-images/1111111111111111111111111111111111111111111111111111111111111111.jpg", rating: 8.5, isPrime: true },
  { id: 13, title: "Good Omens", image: "https://m.media-amazon.com/images/S/pv-target-images/2222222222222222222222222222222222222222222222222222222222222222.jpg", rating: 8.1, isPrime: true, isNew: true },
  { id: 14, title: "The Underground Railroad", image: "https://m.media-amazon.com/images/S/pv-target-images/3333333333333333333333333333333333333333333333333333333333333333.jpg", rating: 7.8, isPrime: true },
  { id: 15, title: "Hanna", image: "https://m.media-amazon.com/images/S/pv-target-images/4444444444444444444444444444444444444444444444444444444444444444.jpg", rating: 7.5, isPrime: true },
  { id: 16, title: "Fleabag", image: "https://m.media-amazon.com/images/S/pv-target-images/5555555555555555555555555555555555555555555555555555555555555555.jpg", rating: 8.7, isPrime: true },
];

const watchlist = [
  { id: 17, title: "The Man in the High Castle", image: "https://m.media-amazon.com/images/S/pv-target-images/6666666666666666666666666666666666666666666666666666666666666666.jpg", rating: 8.0, isPrime: true },
  { id: 18, title: "Upload", image: "https://m.media-amazon.com/images/S/pv-target-images/7777777777777777777777777777777777777777777777777777777777777777.jpg", rating: 7.9, isPrime: true },
  { id: 19, title: "A League of Their Own", image: "https://m.media-amazon.com/images/S/pv-target-images/8888888888888888888888888888888888888888888888888888888888888888.jpg", rating: 7.2, isPrime: true, isNew: true },
  { id: 20, title: "Carnival Row", image: "https://m.media-amazon.com/images/S/pv-target-images/9999999999999999999999999999999999999999999999999999999999999999.jpg", rating: 7.8, isPrime: true },
  { id: 21, title: "Catastrophe", image: "https://m.media-amazon.com/images/S/pv-target-images/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.jpg", rating: 8.2, isPrime: true },
  { id: 22, title: "The Marvelous Mrs. Maisel", image: "https://m.media-amazon.com/images/S/pv-target-images/bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.jpg", rating: 8.7, isPrime: true },
  { id: 23, title: "Tom Clancy's Jack Ryan", image: "https://m.media-amazon.com/images/S/pv-target-images/cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc.jpg", rating: 8.1, isPrime: true },
  { id: 24, title: "Tales from the Loop", image: "https://m.media-amazon.com/images/S/pv-target-images/dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd.jpg", rating: 7.4, isPrime: true },
];

const trending = [
  { id: 25, title: "The Report", image: "https://m.media-amazon.com/images/S/pv-target-images/eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.jpg", rating: 7.3, isPrime: true },
  { id: 26, title: "Late Night", image: "https://m.media-amazon.com/images/S/pv-target-images/ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff.jpg", rating: 6.8, isPrime: true },
  { id: 27, title: "Honey Boy", image: "https://m.media-amazon.com/images/S/pv-target-images/gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg.jpg", rating: 7.3, isPrime: true, isNew: true },
  { id: 28, title: "Manchester by the Sea", image: "https://m.media-amazon.com/images/S/pv-target-images/hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh.jpg", rating: 7.8, isPrime: true },
  { id: 29, title: "Cold War", image: "https://m.media-amazon.com/images/S/pv-target-images/iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii.jpg", rating: 7.6, isPrime: true },
  { id: 30, title: "Suspiria", image: "https://m.media-amazon.com/images/S/pv-target-images/jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj.jpg", rating: 6.8, isPrime: true },
  { id: 31, title: "Brittany Runs a Marathon", image: "https://m.media-amazon.com/images/S/pv-target-images/kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk.jpg", rating: 6.9, isPrime: true },
  { id: 32, title: "Beautiful Boy", image: "https://m.media-amazon.com/images/S/pv-target-images/llllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll.jpg", rating: 7.3, isPrime: true },
];

const Index = () => {
  const { isSignedIn, user } = useUser();
  const [hasWelcomed, setHasWelcomed] = useState(false);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Welcome the user if signed in
    if (isSignedIn && user && !hasWelcomed) {
      toast({
        title: `Welcome ${user.firstName || 'back'}!`,
        description: "Discover your next favorite movie or show.",
        duration: 3000
      });
      setHasWelcomed(true);
    }
  }, [isSignedIn, user, hasWelcomed]);

  const handlePlayClick = () => {
    toast({
      title: "Starting playback",
      description: `Now playing: ${featuredContent.title}`,
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
      description: `${featuredContent.title} has been added to your watchlist`,
    });
  };

  return (
    <div className="min-h-screen bg-prime-dark text-prime-light overflow-x-hidden">
      <Navbar />
      
      <main>
        <HeroSection 
          title={featuredContent.title}
          description={featuredContent.description}
          image={featuredContent.image}
          rating={featuredContent.rating}
          year={featuredContent.year}
          duration={featuredContent.duration}
          onPlay={handlePlayClick}
          onAddToWatchlist={handleAddToWatchlist}
        />
        
        <div className="py-4">
          <ContentRow 
            title="Prime Originals" 
            items={originals} 
            isPrimeBranded={true}
          />
          
          <ContentRow 
            title="Trending Movies" 
            items={trendingMovies}
          />
          
          {isSignedIn && (
            <ContentRow 
              title="Your Watchlist" 
              items={watchlist}
            />
          )}
          
          <ContentRow 
            title="Trending Now" 
            items={trending}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
