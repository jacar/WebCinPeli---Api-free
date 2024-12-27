import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, Film, Tv2, Heart, Github } from 'lucide-react';
import SearchResults from './SearchResults';
import { useSearch } from '../hooks/useSearch';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearchOpen,
    setIsSearchOpen,
  } = useSearch();
  
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
      
      // Update active section based on scroll position
      const sections = ['peliculas', 'series'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
        setSearchQuery('');
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsSearchOpen, setSearchQuery]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 64;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
    setIsOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-colors duration-300 ${
      isScrolled ? 'bg-purple-900' : 'bg-gradient-to-b from-black/80 to-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Film className="h-8 w-8 text-purple-300" />
              <span className="ml-2 text-2xl font-bold text-white">WebcinPeli</span>
            </Link>

            <div className="hidden md:flex items-center space-x-8 ml-12">
              <button
                onClick={() => scrollToSection('peliculas')}
                className={`text-gray-300 hover:text-white flex items-center transition-colors ${
                  activeSection === 'peliculas' ? 'text-purple-300' : ''
                }`}
              >
                <Film className="mr-1" size={20} />
                Películas
              </button>
              <button
                onClick={() => scrollToSection('series')}
                className={`text-gray-300 hover:text-white flex items-center transition-colors ${
                  activeSection === 'series' ? 'text-purple-300' : ''
                }`}
              >
                <Tv2 className="mr-1" size={20} />
                Series
              </button>
              <Link 
                to="/favorites" 
                className="text-gray-300 hover:text-white flex items-center transition-colors"
              >
                <Heart className="mr-1" size={20} />
                Mi Lista
              </Link>
              <a
                href="https://github.com/jacar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white flex items-center transition-colors"
              >
                <Github className="mr-1" size={20} />
                GitHub
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div ref={searchRef} className="relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar películas o series..."
                  className="w-64 bg-purple-800 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
              </div>

              {isSearchOpen && searchResults && searchResults.length > 0 && (
                <SearchResults
                  results={searchResults}
                  onClose={() => {
                    setIsSearchOpen(false);
                    setSearchQuery('');
                  }}
                />
              )}
            </div>
            
            <button
              className="md:hidden text-gray-300 hover:text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-purple-900">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button
              onClick={() => scrollToSection('peliculas')}
              className={`w-full text-left text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium ${
                activeSection === 'peliculas' ? 'bg-purple-800' : ''
              }`}
            >
              Películas
            </button>
            <button
              onClick={() => scrollToSection('series')}
              className={`w-full text-left text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium ${
                activeSection === 'series' ? 'bg-purple-800' : ''
              }`}
            >
              Series
            </button>
            <Link
              to="/favorites"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Mi Lista
            </Link>
            <a
              href="https://github.com/jacar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              GitHub
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;