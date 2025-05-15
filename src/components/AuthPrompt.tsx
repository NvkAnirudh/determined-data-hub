
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface AuthPromptProps {
  message?: string;
  showOnlyWhenUnauthenticated?: boolean;
}

const AuthPrompt: React.FC<AuthPromptProps> = ({ 
  message = "Sign up to access full features including question links, difficulty levels, and confidence tracking.",
  showOnlyWhenUnauthenticated = true
}) => {
  const { user } = useAuth();
  
  if (showOnlyWhenUnauthenticated && user) {
    return null;
  }
  
  return (
    <div className="border border-gray-800 bg-gray-900 rounded-md p-4 my-4">
      <p className="mb-4 text-gray-300">{message}</p>
      <div className="flex space-x-4">
        <Button variant="default" asChild>
          <Link to="/auth?mode=signup">Sign Up</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/auth?mode=signin">Sign In</Link>
        </Button>
      </div>
    </div>
  );
};

export default AuthPrompt;
