
import { useState, useEffect } from 'react';
import { SignIn, SignUp } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAuthGuard } from '@/hooks/use-auth-guard';

const Auth = () => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const navigate = useNavigate();
  
  // Use auth guard to redirect if already signed in
  useAuthGuard(false);
  
  // Handle URL hash for signup/signin switching
  useEffect(() => {
    if (window.location.hash === '#signup') {
      setMode('signup');
    } else if (window.location.hash === '#signin') {
      setMode('signin');
    }
  }, []);
  
  return (
    <div className="min-h-screen bg-prime-dark flex flex-col">
      <div className="p-4">
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center text-prime-gray hover:text-prime-blue transition-colors"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Browse
        </button>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md rounded-lg bg-[#1A242F] p-6 shadow-xl">
          <div className="mb-8">
            <img 
              src="https://m.media-amazon.com/images/G/01/digital/video/acquisition/amazon_video_light.png" 
              alt="Prime Video" 
              className="h-12 mx-auto"
            />
          </div>
          
          <div className="mb-6 flex justify-center border-b border-prime-gray/20">
            <button 
              className={`px-4 py-2 font-medium ${mode === 'signin' ? 'text-prime-blue border-b-2 border-prime-blue' : 'text-prime-gray'}`}
              onClick={() => {
                setMode('signin');
                window.location.hash = 'signin';
              }}
            >
              Sign In
            </button>
            <button 
              className={`px-4 py-2 font-medium ${mode === 'signup' ? 'text-prime-blue border-b-2 border-prime-blue' : 'text-prime-gray'}`}
              onClick={() => {
                setMode('signup');
                window.location.hash = 'signup';
              }}
            >
              Create Account
            </button>
          </div>
          
          <div className="animate-fade-in">
            {mode === 'signin' ? (
              <SignIn 
                signUpUrl="#signup" 
                afterSignInUrl="/"
                appearance={{
                  elements: {
                    formButtonPrimary: 'bg-prime-blue hover:bg-prime-blue/90 text-white',
                    formFieldInput: 'bg-prime-dark border-prime-gray/30',
                    card: 'bg-transparent shadow-none',
                    footer: 'hidden'
                  }
                }}
              />
            ) : (
              <SignUp 
                signInUrl="#signin" 
                afterSignUpUrl="/"
                appearance={{
                  elements: {
                    formButtonPrimary: 'bg-prime-blue hover:bg-prime-blue/90 text-white',
                    formFieldInput: 'bg-prime-dark border-prime-gray/30',
                    card: 'bg-transparent shadow-none',
                    footer: 'hidden'
                  }
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
