
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, Menu, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300',
        isScrolled ? 'bg-prime-dark/95 shadow-md backdrop-blur-sm' : 'bg-gradient-to-b from-prime-dark/90 to-transparent'
      )}
    >
      <div className="prime-container py-4 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link 
            to="/" 
            className="text-prime-blue font-bold text-2xl tracking-tight transition-all duration-300 hover:opacity-80"
          >
            prime<span className="text-prime-light">video</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="nav-link font-medium">Home</Link>
            <div className="relative group">
              <button className="nav-link font-medium flex items-center">
                Movies
                <ChevronDown className="ml-1 w-4 h-4 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-prime-accent border border-prime-gray/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left">
                <div className="py-2 px-4 space-y-2">
                  <Link to="/" className="block text-prime-light hover:text-prime-blue transition-colors">Popular</Link>
                  <Link to="/" className="block text-prime-light hover:text-prime-blue transition-colors">New Releases</Link>
                  <Link to="/" className="block text-prime-light hover:text-prime-blue transition-colors">Categories</Link>
                </div>
              </div>
            </div>
            <div className="relative group">
              <button className="nav-link font-medium flex items-center">
                TV Shows
                <ChevronDown className="ml-1 w-4 h-4 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-prime-accent border border-prime-gray/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left">
                <div className="py-2 px-4 space-y-2">
                  <Link to="/" className="block text-prime-light hover:text-prime-blue transition-colors">Popular</Link>
                  <Link to="/" className="block text-prime-light hover:text-prime-blue transition-colors">New Episodes</Link>
                  <Link to="/" className="block text-prime-light hover:text-prime-blue transition-colors">Categories</Link>
                </div>
              </div>
            </div>
            <Link to="/" className="nav-link font-medium">Originals</Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <button className="hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-prime-accent transition-colors duration-200">
            <Search className="w-5 h-5 text-prime-light" />
          </button>
          
          <button className="hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-prime-accent transition-colors duration-200">
            <User className="w-5 h-5 text-prime-light" />
          </button>
          
          <button 
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-prime-accent transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="w-5 h-5 text-prime-light" />
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-0 bg-prime-dark z-40 transition-transform duration-300 transform md:hidden",
        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="pt-20 px-6 space-y-6">
          <Link to="/" className="block py-2 text-xl font-medium text-prime-light hover:text-prime-blue transition-colors">Home</Link>
          <Link to="/" className="block py-2 text-xl font-medium text-prime-light hover:text-prime-blue transition-colors">Movies</Link>
          <Link to="/" className="block py-2 text-xl font-medium text-prime-light hover:text-prime-blue transition-colors">TV Shows</Link>
          <Link to="/" className="block py-2 text-xl font-medium text-prime-light hover:text-prime-blue transition-colors">Originals</Link>
          
          <div className="pt-4 flex space-x-4">
            <button className="flex items-center justify-center w-12 h-12 rounded-full bg-prime-accent/50 hover:bg-prime-accent transition-colors duration-200">
              <Search className="w-6 h-6 text-prime-light" />
            </button>
            <button className="flex items-center justify-center w-12 h-12 rounded-full bg-prime-accent/50 hover:bg-prime-accent transition-colors duration-200">
              <User className="w-6 h-6 text-prime-light" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
