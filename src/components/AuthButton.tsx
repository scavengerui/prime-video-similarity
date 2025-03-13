
import { useUser, SignOutButton, SignInButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { User, LogOut } from "lucide-react";

const AuthButton = () => {
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();

  if (isSignedIn && user) {
    return (
      <div className="relative group">
        <button className="flex items-center space-x-2 text-prime-light hover:text-prime-blue transition-colors">
          <div className="w-8 h-8 rounded-full bg-prime-accent flex items-center justify-center overflow-hidden">
            {user.imageUrl ? (
              <img src={user.imageUrl} alt={user.firstName || 'User'} className="w-full h-full object-cover" />
            ) : (
              <User className="w-5 h-5" />
            )}
          </div>
          <span className="hidden md:inline">{user.firstName || 'User'}</span>
        </button>
        
        <div className="absolute right-0 mt-2 w-48 py-2 bg-prime-accent rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20">
          <div className="px-4 py-2 border-b border-white/10">
            <p className="text-sm font-medium">{user.fullName || user.emailAddresses[0].emailAddress}</p>
          </div>
          
          <SignOutButton>
            <button className="w-full text-left px-4 py-2 text-sm text-prime-light hover:bg-prime-blue/20 flex items-center">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </button>
          </SignOutButton>
        </div>
      </div>
    );
  }
  
  return (
    <button
      onClick={() => navigate('/auth')}
      className="flex items-center space-x-2 text-prime-light hover:text-prime-blue transition-colors"
    >
      <User className="w-5 h-5" />
      <span className="hidden md:inline">Sign In</span>
    </button>
  );
};

export default AuthButton;
