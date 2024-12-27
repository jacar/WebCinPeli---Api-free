import React, { useEffect, useRef } from 'react';
import { useQuery } from 'react-query';
import { getMovies, getTvShows, getLatestMovies } from '../services/tmdb';
import HeroSlider from '../components/HeroSlider';
import ContentSlider from '../components/ContentSlider';
import Footer from '../components/Footer';

const Home = () => {
  const { data: latestMovies } = useQuery('latestMovies', getLatestMovies);
  const { data: trendingMovies } = useQuery('trendingMovies', () => getMovies('popular'));
  const { data: topRatedMovies } = useQuery('topRatedMovies', () => getMovies('top_rated'));
  const { data: trendingTv } = useQuery('trendingTv', () => getTvShows('popular'));
  const { data: topRatedTv } = useQuery('topRatedTv', () => getTvShows('top_rated'));

  const peliculasRef = useRef<HTMLDivElement>(null);
  const seriesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Handle direct navigation to sections via URL hash
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        const navHeight = 64;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navHeight;

        setTimeout(() => {
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      {latestMovies && <HeroSlider movies={latestMovies.results.slice(0, 5)} />}
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div id="peliculas" ref={peliculasRef} className="scroll-mt-16">
          {trendingMovies && (
            <ContentSlider title="Películas Populares" items={trendingMovies.results} />
          )}
          
          {topRatedMovies && (
            <ContentSlider title="Películas Mejor Valoradas" items={topRatedMovies.results} />
          )}
        </div>

        <div id="series" ref={seriesRef} className="scroll-mt-16">
          {trendingTv && (
            <ContentSlider title="Series Populares" items={trendingTv.results} />
          )}
          
          {topRatedTv && (
            <ContentSlider title="Series Mejor Valoradas" items={topRatedTv.results} />
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;