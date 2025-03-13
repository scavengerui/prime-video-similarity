
// Clerk publishable key
export const CLERK_PUBLISHABLE_KEY = "pk_test_Z3JlYXQtY29uZG9yLTk4LmNsZXJrLmFjY291bnRzLmRldiQ";

// Function to ensure environment variables are set
export function checkEnvVariables() {
  if (!CLERK_PUBLISHABLE_KEY) {
    console.warn("Missing CLERK_PUBLISHABLE_KEY - Authentication will not work properly");
    return false;
  }
  return true;
}
