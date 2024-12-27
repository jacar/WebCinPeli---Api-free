import React from 'react';
import { useFavorites } from '../hooks/useFavorites';
import MovieCard from '../components/MovieCard';

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8">Mi Lista</h1>
        {favorites.length === 0 ? (
          <p className="text-gray-400 text-center py-8">
            No hay películas o series en tu lista. ¡Agrega algunas!
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {favorites.map((item) => (
              <MovieCard
                key={item.id}
                id={item.id}
                title={item.title}
                posterPath={item.posterPath}
                mediaType={item.mediaType}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;