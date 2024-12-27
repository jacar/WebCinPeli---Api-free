import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Film, Tv2 } from 'lucide-react';

interface SearchResult {
  id: number;
  title?: string;
  name?: string;
  media_type: 'movie' | 'tv';
  poster_path: string | null;
}

interface SearchResultsProps {
  results: SearchResult[];
  onClose: () => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, onClose }) => {
  const navigate = useNavigate();

  const handleClick = (result: SearchResult) => {
    navigate(`/${result.media_type}/${result.id}`);
    onClose();
  };

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-purple-900 rounded-lg shadow-lg max-h-96 overflow-y-auto">
      {results.length === 0 ? (
        <div className="p-4 text-gray-300">No se encontraron resultados</div>
      ) : (
        <div className="p-2">
          {results.map((result) => (
            <button
              key={`${result.media_type}-${result.id}`}
              onClick={() => handleClick(result)}
              className="w-full flex items-center p-2 hover:bg-purple-800 rounded-lg transition-colors"
            >
              <div className="w-12 h-16 flex-shrink-0">
                {result.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w92${result.poster_path}`}
                    alt={result.title || result.name}
                    className="w-full h-full object-cover rounded"
                  />
                ) : (
                  <div className="w-full h-full bg-purple-800 rounded flex items-center justify-center">
                    {result.media_type === 'movie' ? <Film size={24} /> : <Tv2 size={24} />}
                  </div>
                )}
              </div>
              <div className="ml-3 text-left">
                <p className="text-white font-medium">{result.title || result.name}</p>
                <p className="text-gray-400 text-sm">
                  {result.media_type === 'movie' ? 'Película' : 'Serie'}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;