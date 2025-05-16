
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SearchCommand } from './SearchCommand';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { trackEvent } from '@/utils/analytics';

const Navbar: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    trackEvent('auth', 'sign_out', 'success');
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="w-full bg-background border-b border-gray-800">
      <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link to="/" className="font-bold text-xl">DEtermined.eng</Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <SearchCommand />
          <Link to="/de-prep" className="nav-link">DE PREP</Link>
          <Link to="/de-projects" className="nav-link">DE PROJECTS</Link>
          <Link to="/about" className="nav-link">ABOUT</Link>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="text-sm cursor-pointer" onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline" onClick={() => navigate('/auth')}>
              Sign In
            </Button>
          )}
        </div>
        
        <div className="md:hidden">
          <button 
            onClick={toggleMenu}
            className="p-2 text-gray-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          {isMenuOpen && (
            <div className="absolute top-16 right-0 left-0 bg-background border-b border-gray-800 p-4 flex flex-col space-y-4 z-50">
              <Link to="/de-prep" className="nav-link block" onClick={toggleMenu}>DE PREP</Link>
              <Link to="/de-projects" className="nav-link block" onClick={toggleMenu}>DE PROJECTS</Link>
              <Link to="/about" className="nav-link block" onClick={toggleMenu}>ABOUT</Link>
              
              {user ? (
                <Button variant="outline" onClick={handleSignOut}>Sign Out</Button>
              ) : (
                <Button variant="outline" onClick={() => { navigate('/auth'); toggleMenu(); }}>Sign In</Button>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
