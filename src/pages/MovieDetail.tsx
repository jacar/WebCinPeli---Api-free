import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getDetails } from '../services/tmdb';
import { Play, Plus, Star } from 'lucide-react';
import ReactPlayer from 'react-player';

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: movie } = useQuery(['movie', id], () => getDetails('movie', id || ''));

  if (!movie) return null;

  const trailer = movie.videos.results.find((video: any) => video.type === 'Trailer');

  return (
    <div className="min-h-screen bg-gray-900 pt-16">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full h-[60vh] object-cover"
        />
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-4">{movie.title}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-yellow-400 flex items-center">
                <Star className="mr-1" size={20} />
                {movie.vote_average.toFixed(1)}
              </span>
              <span className="text-gray-300">{movie.release_date.split('-')[0]}</span>
              <span className="text-gray-300">{movie.runtime} min</span>
            </div>
            
            <div className="flex space-x-4 mb-8">
              <button className="bg-purple-600 text-white px-8 py-3 rounded-full flex items-center hover:bg-purple-700 transition-colors">
                <Play size={20} className="mr-2" />
                Reproducir
              </button>
              <button className="bg-gray-700 text-white px-8 py-3 rounded-full flex items-center hover:bg-gray-600 transition-colors">
                <Plus size={20} className="mr-2" />
                Mi Lista
              </button>
            </div>
            
            <p className="text-gray-300 max-w-2xl">{movie.overview}</p>
          </div>
        </div>
      </div>

      {trailer && (
        <div className="max-w-7xl mx-auto px-8 py-12">
          <h2 className="text-2xl font-bold text-white mb-6">Trailer</h2>
          <div className="aspect-video">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${trailer.key}`}
              width="100%"
              height="100%"
              controls
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;