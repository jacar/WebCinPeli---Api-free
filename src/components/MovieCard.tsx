import React from 'react';
import { Play, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';

interface MovieCardProps {
  id: number;
  title: string;
  posterPath: string;
  mediaType: 'movie' | 'tv';
}

const MovieCard: React.FC<MovieCardProps> = ({ id, title, posterPath, mediaType }) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const isInFavorites = isFavorite(id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInFavorites) {
      removeFromFavorites(id);
    } else {
      addToFavorites({ id, title, posterPath, mediaType });
    }
  };

  return (
    <div className="relative group">
      <img
        src={`https://image.tmdb.org/t/p/w500${posterPath}`}
        alt={title}
        className="rounded-lg w-full h-auto transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex flex-col justify-end p-4">
        <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
        <div className="flex space-x-2">
          <Link
            to={`/${mediaType}/${id}`}
            className="bg-purple-600 text-white px-4 py-2 rounded-full flex items-center hover:bg-purple-700 transition-colors"
          >
            <Play size={16} className="mr-1" />
            Reproducir
          </Link>
          <button 
            onClick={handleFavoriteClick}
            className={`${
              isInFavorites ? 'bg-purple-600' : 'bg-gray-700/80'
            } text-white p-2 rounded-full hover:bg-purple-700 transition-colors`}
            title={isInFavorites ? 'Quitar de Mi Lista' : 'Agregar a Mi Lista'}
          >
            {isInFavorites ? <Minus size={16} /> : <Plus size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;