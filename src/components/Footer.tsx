import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Tv2, Star, TrendingUp } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center">
              <Film className="mr-2" size={20} />
              Películas
            </h3>
            <ul className="space-y-2">
              <li><Link to="/movies/popular" className="text-gray-400 hover:text-white">Populares</Link></li>
              <li><Link to="/movies/now-playing" className="text-gray-400 hover:text-white">En Cartelera</Link></li>
              <li><Link to="/movies/upcoming" className="text-gray-400 hover:text-white">Próximamente</Link></li>
              <li><Link to="/movies/top-rated" className="text-gray-400 hover:text-white">Mejor Valoradas</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center">
              <Tv2 className="mr-2" size={20} />
              Series
            </h3>
            <ul className="space-y-2">
              <li><Link to="/tv/popular" className="text-gray-400 hover:text-white">Populares</Link></li>
              <li><Link to="/tv/airing-today" className="text-gray-400 hover:text-white">En Emisión</Link></li>
              <li><Link to="/tv/on-the-air" className="text-gray-400 hover:text-white">En TV</Link></li>
              <li><Link to="/tv/top-rated" className="text-gray-400 hover:text-white">Mejor Valoradas</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center">
              <Star className="mr-2" size={20} />
              Géneros
            </h3>
            <ul className="space-y-2">
              <li><Link to="/genre/action" className="text-gray-400 hover:text-white">Acción</Link></li>
              <li><Link to="/genre/comedy" className="text-gray-400 hover:text-white">Comedia</Link></li>
              <li><Link to="/genre/drama" className="text-gray-400 hover:text-white">Drama</Link></li>
              <li><Link to="/genre/horror" className="text-gray-400 hover:text-white">Terror</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center">
              <TrendingUp className="mr-2" size={20} />
              Tendencias
            </h3>
            <ul className="space-y-2">
              <li><Link to="/trending/day" className="text-gray-400 hover:text-white">Hoy</Link></li>
              <li><Link to="/trending/week" className="text-gray-400 hover:text-white">Esta Semana</Link></li>
              <li><Link to="/discover/movies" className="text-gray-400 hover:text-white">Descubrir</Link></li>
              <li><Link to="/people" className="text-gray-400 hover:text-white">Artistas</Link></li>
            </ul>
          </div>
        </div>

        <div className="text-center pt-8 border-t border-gray-800">
          <p className="text-gray-400">© {new Date().getFullYear()} WebcinPeli - Todos los derechos reservados @webcincodev</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;