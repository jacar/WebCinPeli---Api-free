import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';

interface Content {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  media_type?: 'movie' | 'tv';
}

interface ContentSliderProps {
  title: string;
  items: Content[];
}

const ContentSlider: React.FC<ContentSliderProps> = ({ title, items }) => {
  const scrollContainer = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainer.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollContainer.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      <div className="relative group">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronLeft size={24} />
        </button>
        
        <div
          ref={scrollContainer}
          className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth"
        >
          {items.map((item) => (
            <div key={item.id} className="flex-none w-[200px]">
              <MovieCard
                id={item.id}
                title={item.title || item.name || ''}
                posterPath={item.poster_path}
                mediaType={item.media_type || 'movie'}
              />
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default ContentSlider;