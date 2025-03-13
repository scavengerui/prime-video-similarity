
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-prime-dark py-12 mt-8 border-t border-prime-gray/20">
      <div className="prime-container">
        <div className="flex justify-center mb-8">
          <Link 
            to="/" 
            className="text-prime-blue font-bold text-2xl tracking-tight transition-all duration-300 hover:opacity-80"
          >
            prime<span className="text-prime-light">video</span>
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-prime-light font-medium mb-4">About</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-prime-gray hover:text-prime-blue transition-colors">About Us</Link></li>
              <li><Link to="/" className="text-prime-gray hover:text-prime-blue transition-colors">Careers</Link></li>
              <li><Link to="/" className="text-prime-gray hover:text-prime-blue transition-colors">Press</Link></li>
              <li><Link to="/" className="text-prime-gray hover:text-prime-blue transition-colors">Amazon Prime</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-prime-light font-medium mb-4">Watch</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-prime-gray hover:text-prime-blue transition-colors">Movies</Link></li>
              <li><Link to="/" className="text-prime-gray hover:text-prime-blue transition-colors">TV Shows</Link></li>
              <li><Link to="/" className="text-prime-gray hover:text-prime-blue transition-colors">Originals</Link></li>
              <li><Link to="/" className="text-prime-gray hover:text-prime-blue transition-colors">Live Sports</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-prime-light font-medium mb-4">Help</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-prime-gray hover:text-prime-blue transition-colors">Account & Billing</Link></li>
              <li><Link to="/" className="text-prime-gray hover:text-prime-blue transition-colors">Devices</Link></li>
              <li><Link to="/" className="text-prime-gray hover:text-prime-blue transition-colors">Accessibility</Link></li>
              <li><Link to="/" className="text-prime-gray hover:text-prime-blue transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-prime-light font-medium mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-prime-gray hover:text-prime-blue transition-colors">Terms of Use</Link></li>
              <li><Link to="/" className="text-prime-gray hover:text-prime-blue transition-colors">Privacy Policy</Link></li>
              <li><Link to="/" className="text-prime-gray hover:text-prime-blue transition-colors">Cookies</Link></li>
              <li><Link to="/" className="text-prime-gray hover:text-prime-blue transition-colors">Ad Choices</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-prime-gray/20">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <Link to="/" className="w-10 h-10 rounded-full bg-prime-accent flex items-center justify-center hover:bg-prime-blue transition-colors">
              <Facebook className="w-5 h-5 text-prime-light" />
            </Link>
            <Link to="/" className="w-10 h-10 rounded-full bg-prime-accent flex items-center justify-center hover:bg-prime-blue transition-colors">
              <Twitter className="w-5 h-5 text-prime-light" />
            </Link>
            <Link to="/" className="w-10 h-10 rounded-full bg-prime-accent flex items-center justify-center hover:bg-prime-blue transition-colors">
              <Instagram className="w-5 h-5 text-prime-light" />
            </Link>
          </div>
          
          <p className="text-prime-gray text-sm text-center md:text-right">
            &copy; {new Date().getFullYear()} Amazon Prime Video. All rights reserved.<br />
            <span className="text-xs opacity-70">This is a clone created for educational purposes only.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
