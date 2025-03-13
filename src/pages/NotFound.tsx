
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-prime-dark text-prime-light">
      <Navbar />
      
      <div className="prime-container min-h-[80vh] flex flex-col items-center justify-center py-20">
        <div className="text-center max-w-md animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-prime-blue mb-6">404</h1>
          <div className="w-24 h-0.5 bg-prime-gray/30 mx-auto mb-6"></div>
          <h2 className="text-2xl md:text-3xl font-medium mb-4">Page Not Found</h2>
          <p className="text-prime-gray mb-8">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          
          <Link 
            to="/" 
            className="inline-flex items-center justify-center bg-prime-blue hover:bg-prime-blue/90 text-white font-medium px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            <Home className="w-5 h-5 mr-2" />
            Return to Home
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
