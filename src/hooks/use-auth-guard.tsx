
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

export function useAuthGuard(requireAuth: boolean = true) {
  const { isSignedIn, isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded) {
      // If auth is required but user is not signed in
      if (requireAuth && !isSignedIn) {
        toast({
          title: "Authentication required",
          description: "Please sign in to access this page",
          variant: "destructive"
        });
        navigate("/auth");
      }
      
      // If auth is NOT required but user is signed in (for auth pages)
      if (!requireAuth && isSignedIn) {
        navigate("/");
      }
    }
  }, [isSignedIn, isLoaded, navigate, requireAuth]);

  return { isSignedIn, isLoaded };
}
