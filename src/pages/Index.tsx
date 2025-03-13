
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ContentRow from '@/components/ContentRow';
import Footer from '@/components/Footer';
import { useAuthGuard } from '@/hooks/use-auth-guard';
import { useUser } from '@clerk/clerk-react';
import { toast } from '@/components/ui/use-toast';

// Updated content with better images
const featuredContent = {
  title: "The Lord of the Rings: The Rings of Power",
  description: "Beginning in a time of relative peace, the series follows an ensemble cast of characters as they confront the re-emergence of evil in Middle-earth. From the darkest depths of the Misty Mountains, to the majestic forests of the elf-capital of Lindon, to the island kingdom of Númenor, these kingdoms and characters will carve out legacies that live on long after they are gone.",
  image: "https://images.unsplash.com/photo-1515634928627-2a4e0dae3ddf?w=1800&auto=format", // Fantasy-themed image
  rating: "16+",
  year: "2022",
  duration: "1 Season"
};

const trendingMovies = [
  { id: 1, title: "The Tomorrow War", image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&auto=format", rating: 7.2, isPrime: true },
  { id: 2, title: "Without Remorse", image: "https://images.unsplash.com/photo-1568111561564-aa1c5466d6ed?w=500&auto=format", rating: 6.8, isPrime: true },
  { id: 3, title: "Sound of Metal", image: "https://images.unsplash.com/photo-1581905764498-f1b60bae941a?w=500&auto=format", rating: 8.1, isPrime: true },
  { id: 4, title: "Coming 2 America", image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=500&auto=format", rating: 6.2, isPrime: true, isNew: true },
  { id: 5, title: "Borat Subsequent Moviefilm", image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&auto=format", rating: 7.4, isPrime: true },
  { id: 6, title: "The Map of Tiny Perfect Things", image: "https://images.unsplash.com/photo-1512113899577-57a7b2f0b2a2?w=500&auto=format", rating: 6.9, isPrime: true },
  { id: 7, title: "The Vast of Night", image: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=500&auto=format", rating: 7.5, isPrime: true },
  { id: 8, title: "Birds of Paradise", image: "https://images.unsplash.com/photo-1536782376847-5c9d14d97cc0?w=500&auto=format", rating: 6.4, isPrime: true, isNew: true },
];

const originals = [
  { id: 9, title: "The Wheel of Time", image: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=500&auto=format", rating: 7.7, isPrime: true },
  { id: 10, title: "The Boys", image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=500&auto=format", rating: 8.8, isPrime: true },
  { id: 11, title: "Invincible", image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format", rating: 8.7, isPrime: true },
  { id: 12, title: "The Expanse", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format", rating: 8.5, isPrime: true },
  { id: 13, title: "Good Omens", image: "https://images.unsplash.com/photo-1570610155223-66279ba81b41?w=500&auto=format", rating: 8.1, isPrime: true, isNew: true },
  { id: 14, title: "The Underground Railroad", image: "https://images.unsplash.com/photo-1535813147-bb94638db8e4?w=500&auto=format", rating: 7.8, isPrime: true },
  { id: 15, title: "Hanna", image: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=500&auto=format", rating: 7.5, isPrime: true },
  { id: 16, title: "Fleabag", image: "https://images.unsplash.com/photo-1515634928627-2a4e0dae3ddf?w=500&auto=format", rating: 8.7, isPrime: true },
];

const watchlist = [
  { id: 17, title: "The Man in the High Castle", image: "https://images.unsplash.com/photo-1625396768388-347bdee501ce?w=500&auto=format", rating: 8.0, isPrime: true },
  { id: 18, title: "Upload", image: "https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?w=500&auto=format", rating: 7.9, isPrime: true },
  { id: 19, title: "A League of Their Own", image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=500&auto=format", rating: 7.2, isPrime: true, isNew: true },
  { id: 20, title: "Carnival Row", image: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=500&auto=format", rating: 7.8, isPrime: true },
  { id: 21, title: "Catastrophe", image: "https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?w=500&auto=format", rating: 8.2, isPrime: true },
  { id: 22, title: "The Marvelous Mrs. Maisel", image: "https://images.unsplash.com/photo-1611523658822-385aa008324c?w=500&auto=format", rating: 8.7, isPrime: true },
  { id: 23, title: "Tom Clancy's Jack Ryan", image: "https://images.unsplash.com/photo-1514064019862-23e2a332a6a6?w=500&auto=format", rating: 8.1, isPrime: true },
  { id: 24, title: "Tales from the Loop", image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=500&auto=format", rating: 7.4, isPrime: true },
];

const trending = [
  { id: 25, title: "The Report", image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format", rating: 7.3, isPrime: true },
  { id: 26, title: "Late Night", image: "https://images.unsplash.com/photo-1568111561564-aa1c5466d6ed?w=500&auto=format", rating: 6.8, isPrime: true },
  { id: 27, title: "Honey Boy", image: "https://images.unsplash.com/photo-1572188863110-46d457c9234d?w=500&auto=format", rating: 7.3, isPrime: true, isNew: true },
  { id: 28, title: "Manchester by the Sea", image: "https://images.unsplash.com/photo-1559583109-3e7968e11449?w=500&auto=format", rating: 7.8, isPrime: true },
  { id: 29, title: "Cold War", image: "https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=500&auto=format", rating: 7.6, isPrime: true },
  { id: 30, title: "Suspiria", image: "https://images.unsplash.com/photo-1594442933380-7fcecd4f7a4a?w=500&auto=format", rating: 6.8, isPrime: true },
  { id: 31, title: "Brittany Runs a Marathon", image: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=500&auto=format", rating: 6.9, isPrime: true },
  { id: 32, title: "Beautiful Boy", image: "https://images.unsplash.com/photo-1552308995-2baac1ad5490?w=500&auto=format", rating: 7.3, isPrime: true },
];

const Index = () => {
  // Use auth guard to check if user is signed in
  useAuthGuard(false); // Don't require auth for the homepage
  
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
    
    // Show sign-in toast if not signed in
    if (!isSignedIn && !hasWelcomed) {
      setTimeout(() => {
        toast({
          title: "Sign in for the full experience",
          description: "Sign in to track your watchlist and get personalized recommendations",
          duration: 5000,
          action: {
            label: "Sign In",
            onClick: () => window.location.href = '/auth'
          }
        });
        setHasWelcomed(true);
      }, 2000);
    }
  }, [isSignedIn, user, hasWelcomed]);

  const handlePlayClick = () => {
    // Open a sample video in a new tab
    window.open("https://jsoncompare.org/LearningContainer/SampleFiles/Video/MP4/sample-mp4-file.mp4", "_blank");
    
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
        variant: "destructive",
        action: {
          label: "Sign In",
          onClick: () => window.location.href = '/auth'
        }
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
