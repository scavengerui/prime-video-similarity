
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ContentRow from '@/components/ContentRow';
import Footer from '@/components/Footer';

// Mock data for our content
const featuredContent = {
  title: "The Rings of Power",
  description: "Beginning in a time of relative peace, the series follows an ensemble cast of characters as they confront the re-emergence of evil in Middle-earth. From the darkest depths of the Misty Mountains, to the majestic forests of the elf-capital of Lindon, to the island kingdom of Númenor, these kingdoms and characters will carve out legacies that live on long after they are gone.",
  image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=1974&auto=format&fit=crop",
  rating: "16+",
  year: "2022",
  duration: "1 Season"
};

const trendingMovies = [
  { id: 1, title: "The Tomorrow War", image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1170&auto=format&fit=crop", rating: 7.2, isPrime: true },
  { id: 2, title: "Without Remorse", image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1025&auto=format&fit=crop", rating: 6.8, isPrime: true },
  { id: 3, title: "Sound of Metal", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1170&auto=format&fit=crop", rating: 8.1, isPrime: true },
  { id: 4, title: "Coming 2 America", image: "https://images.unsplash.com/photo-1592935688861-d9722b5450fd?q=80&w=1064&auto=format&fit=crop", rating: 6.2, isPrime: true, isNew: true },
  { id: 5, title: "Borat Subsequent Moviefilm", image: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?q=80&w=1935&auto=format&fit=crop", rating: 7.4, isPrime: true },
  { id: 6, title: "The Map of Tiny Perfect Things", image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1170&auto=format&fit=crop", rating: 6.9, isPrime: true },
  { id: 7, title: "The Vast of Night", image: "https://images.unsplash.com/photo-1518387801569-c9372e7f2dd9?q=80&w=1170&auto=format&fit=crop", rating: 7.5, isPrime: true },
  { id: 8, title: "Birds of Paradise", image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=1169&auto=format&fit=crop", rating: 6.4, isPrime: true, isNew: true },
];

const originals = [
  { id: 9, title: "The Wheel of Time", image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=1170&auto=format&fit=crop", rating: 7.7, isPrime: true },
  { id: 10, title: "The Boys", image: "https://images.unsplash.com/photo-1608889175123-8ee362201f81?q=80&w=880&auto=format&fit=crop", rating: 8.8, isPrime: true },
  { id: 11, title: "Invincible", image: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?q=80&w=1974&auto=format&fit=crop", rating: 8.7, isPrime: true },
  { id: 12, title: "The Expanse", image: "https://images.unsplash.com/photo-1501862700950-18382cd41497?q=80&w=1019&auto=format&fit=crop", rating: 8.5, isPrime: true },
  { id: 13, title: "Good Omens", image: "https://images.unsplash.com/photo-1620662736427-b8a198f52a4d?q=80&w=1041&auto=format&fit=crop", rating: 8.1, isPrime: true, isNew: true },
  { id: 14, title: "The Underground Railroad", image: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1974&auto=format&fit=crop", rating: 7.8, isPrime: true },
  { id: 15, title: "Hanna", image: "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?q=80&w=1170&auto=format&fit=crop", rating: 7.5, isPrime: true },
  { id: 16, title: "Fleabag", image: "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?q=80&w=1170&auto=format&fit=crop", rating: 8.7, isPrime: true },
];

const watchlist = [
  { id: 17, title: "The Man in the High Castle", image: "https://images.unsplash.com/photo-1487956382158-bb926046304a?q=80&w=1035&auto=format&fit=crop", rating: 8.0, isPrime: true },
  { id: 18, title: "Upload", image: "https://images.unsplash.com/photo-1504253163759-c23fccaebb55?q=80&w=1170&auto=format&fit=crop", rating: 7.9, isPrime: true },
  { id: 19, title: "A League of Their Own", image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=1065&auto=format&fit=crop", rating: 7.2, isPrime: true, isNew: true },
  { id: 20, title: "Carnival Row", image: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?q=80&w=1974&auto=format&fit=crop", rating: 7.8, isPrime: true },
  { id: 21, title: "Catastrophe", image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1159&auto=format&fit=crop", rating: 8.2, isPrime: true },
  { id: 22, title: "The Marvelous Mrs. Maisel", image: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=1170&auto=format&fit=crop", rating: 8.7, isPrime: true },
  { id: 23, title: "Tom Clancy's Jack Ryan", image: "https://images.unsplash.com/photo-1515215316771-2742baa337f4?q=80&w=1974&auto=format&fit=crop", rating: 8.1, isPrime: true },
  { id: 24, title: "Tales from the Loop", image: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?q=80&w=871&auto=format&fit=crop", rating: 7.4, isPrime: true },
];

const trending = [
  { id: 25, title: "The Report", image: "https://images.unsplash.com/photo-1655726277269-8c2dbc245023?q=80&w=1170&auto=format&fit=crop", rating: 7.3, isPrime: true },
  { id: 26, title: "Late Night", image: "https://images.unsplash.com/photo-1493807742375-fbc46d996e8f?q=80&w=1076&auto=format&fit=crop", rating: 6.8, isPrime: true },
  { id: 27, title: "Honey Boy", image: "https://images.unsplash.com/photo-1504194104404-433180773017?q=80&w=1170&auto=format&fit=crop", rating: 7.3, isPrime: true, isNew: true },
  { id: 28, title: "Manchester by the Sea", image: "https://images.unsplash.com/photo-1583087253076-5da928112fae?q=80&w=688&auto=format&fit=crop", rating: 7.8, isPrime: true },
  { id: 29, title: "Cold War", image: "https://images.unsplash.com/photo-1551009175-15bdf9dcb580?q=80&w=1178&auto=format&fit=crop", rating: 7.6, isPrime: true },
  { id: 30, title: "Suspiria", image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=1170&auto=format&fit=crop", rating: 6.8, isPrime: true },
  { id: 31, title: "Brittany Runs a Marathon", image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=1170&auto=format&fit=crop", rating: 6.9, isPrime: true },
  { id: 32, title: "Beautiful Boy", image: "https://images.unsplash.com/photo-1564344694898-72706e6d4969?q=80&w=1173&auto=format&fit=crop", rating: 7.3, isPrime: true },
];

const Index = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

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
          
          <ContentRow 
            title="Your Watchlist" 
            items={watchlist}
          />
          
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
