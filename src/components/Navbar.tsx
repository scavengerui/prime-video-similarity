
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import AuthButton from './AuthButton';
import { useMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const location = useLocation();
  const isMobile = useMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location.pathname]);
  
  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "bg-prime-dark/95 backdrop-blur-sm shadow-lg" : "bg-gradient-to-b from-prime-dark to-transparent"
    )}>
      <div className="prime-container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img 
            src="https://m.media-amazon.com/images/G/01/digital/video/acquisition/amazon_video_light.png"
            alt="Prime Video" 
            className="h-6 md:h-8" 
          />
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className={`text-prime-light hover:text-white transition-colors ${location.pathname === '/' ? 'font-medium' : ''}`}>
            Home
          </Link>
          <Link to="/tvshows" className={`text-prime-light hover:text-white transition-colors ${location.pathname === '/tvshows' ? 'font-medium' : ''}`}>
            TV Shows
          </Link>
          <Link to="/movies" className={`text-prime-light hover:text-white transition-colors ${location.pathname === '/movies' ? 'font-medium' : ''}`}>
            Movies
          </Link>
          <Link to="/originals" className={`text-prime-light hover:text-white transition-colors ${location.pathname === '/originals' ? 'font-medium' : ''}`}>
            Originals
          </Link>
        </div>
        
        {/* Right section: Search & Auth */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            {searchOpen ? (
              <div className="flex items-center bg-prime-dark/80 backdrop-blur-sm rounded-full overflow-hidden border border-gray-700 pl-3 pr-1 py-1">
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent text-white text-sm w-36 md:w-40 lg:w-48 focus:outline-none"
                  autoFocus
                />
                <button 
                  className="ml-1 p-1 text-prime-gray rounded-full hover:bg-prime-gray/20 transition-colors"
                  onClick={() => setSearchOpen(false)}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button 
                className="text-prime-light hover:text-white transition-colors p-2"
                onClick={() => setSearchOpen(true)}
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>
          
          {/* Auth Button */}
          <AuthButton />
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-prime-light hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden fixed inset-0 bg-prime-dark/95 backdrop-blur-lg transition-all duration-300 flex flex-col pt-20 px-6",
        isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
      )}>
        <div className="flex flex-col space-y-6">
          <Link to="/" className={`text-prime-light hover:text-white text-lg transition-colors ${location.pathname === '/' ? 'font-medium' : ''}`}>
            Home
          </Link>
          <Link to="/tvshows" className={`text-prime-light hover:text-white text-lg transition-colors ${location.pathname === '/tvshows' ? 'font-medium' : ''}`}>
            TV Shows
          </Link>
          <Link to="/movies" className={`text-prime-light hover:text-white text-lg transition-colors ${location.pathname === '/movies' ? 'font-medium' : ''}`}>
            Movies
          </Link>
          <Link to="/originals" className={`text-prime-light hover:text-white text-lg transition-colors ${location.pathname === '/originals' ? 'font-medium' : ''}`}>
            Originals
          </Link>

          <div className="pt-6 mt-6 border-t border-gray-800">
            <Link to="/auth" className="flex items-center justify-center bg-prime-blue hover:bg-prime-blue/90 text-white px-6 py-3 rounded-md transition-colors w-full">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
