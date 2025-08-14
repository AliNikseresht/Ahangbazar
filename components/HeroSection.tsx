import React from 'react';
import { Play, TrendingUp, Star, Download, Heart, Share2, Volume2, Headphones } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface FeaturedTrack {
  id: string;
  title: string;
  artist: string;
  cover: string;
  genre: string;
  plays: number;
  rating: number;
  duration: string;
}

interface HeroSectionProps {
  featuredTrack?: FeaturedTrack;
  onPlay?: (track: FeaturedTrack) => void;
}

export function HeroSection({ featuredTrack, onPlay }: HeroSectionProps) {
  const defaultTrack: FeaturedTrack = {
    id: '1',
    title: 'نور شب',
    artist: 'ستاره موسیقی',
    cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=800&fit=crop',
    genre: 'پاپ الکترونیک',
    plays: 2750000,
    rating: 4.9,
    duration: '4:32'
  };

  const track = featuredTrack || defaultTrack;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${track.cover})`,
          filter: 'blur(20px)',
          transform: 'scale(1.1)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-purple-900/60 to-slate-900/80" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-purple-400 rounded-full animate-ping opacity-60" />
      <div className="absolute top-40 right-32 w-3 h-3 bg-pink-400 rounded-full animate-pulse opacity-40" />
      <div className="absolute bottom-32 left-16 w-1 h-1 bg-cyan-400 rounded-full animate-bounce opacity-50" />
      
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm text-white border border-purple-400/30 rounded-full px-4 py-2 hover:bg-purple-500/30 transition-all duration-300">
                <TrendingUp className="w-4 h-4 ml-1" />
                #1 در چارت
              </Badge>
              <Badge className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm text-white border border-cyan-400/30 rounded-full px-4 py-2 hover:bg-cyan-500/30 transition-all duration-300">
                <Headphones className="w-4 h-4 ml-1" />
                {track.genre}
              </Badge>
              <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm text-white border border-green-400/30 rounded-full px-4 py-2 hover:bg-green-500/30 transition-all duration-300">
                <Volume2 className="w-4 h-4 ml-1" />
                Hi-Fi کیفیت
              </Badge>
            </div>
            
            {/* Title */}
            <div className="space-y-4">
              <h1 className="text-6xl lg:text-8xl font-black leading-tight">
                <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                  {track.title}
                </span>
              </h1>
              <p className="text-2xl text-gray-300">
                اثری از{' '}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">
                  {track.artist}
                </span>
              </p>
            </div>
            
            {/* Stats */}
            <div className="flex items-center gap-8 text-gray-300">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.floor(track.rating) ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} 
                    />
                  ))}
                </div>
                <span className="font-semibold">{track.rating}</span>
              </div>
              <div className="text-lg">
                {(track.plays / 1000000).toFixed(1)}M پخش
              </div>
              <div className="text-lg">
                {track.duration}
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-4 flex-wrap">
              <Button
                onClick={() => onPlay?.(track)}
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 rounded-2xl px-8 py-4 shadow-2xl hover:shadow-purple-500/25 hover:scale-105 transition-all duration-300 text-lg"
              >
                <Play className="w-6 h-6 ml-2" />
                پخش آهنگ
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:border-white/50 rounded-2xl px-8 py-4 transition-all duration-300"
              >
                <Heart className="w-5 h-5 ml-2" />
                علاقه‌مندی
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:border-white/50 rounded-2xl px-6 py-4 transition-all duration-300"
              >
                <Download className="w-5 h-5" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:border-white/50 rounded-2xl px-6 py-4 transition-all duration-300"
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
          
          {/* Album Art */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative group">
              {/* Glow Effect */}
              <div className="absolute -inset-8 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full blur-3xl opacity-30 animate-pulse group-hover:opacity-50 transition-opacity duration-500" />
              
              {/* Vinyl Record Background */}
              <div className="relative w-96 h-96 rounded-full bg-gradient-to-br from-gray-900 to-black shadow-2xl group-hover:rotate-180 transition-transform duration-[3000ms] ease-in-out">
                {/* Vinyl grooves */}
                <div className="absolute inset-4 rounded-full border border-gray-700 opacity-50" />
                <div className="absolute inset-8 rounded-full border border-gray-700 opacity-30" />
                <div className="absolute inset-12 rounded-full border border-gray-700 opacity-20" />
                
                {/* Album Cover */}
                <div className="absolute inset-16 rounded-full overflow-hidden shadow-xl">
                  <img
                    src={track.cover}
                    alt={track.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>
                
                {/* Center Dot */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full shadow-lg" />
              </div>
              
              {/* Floating Play Button */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Button
                  onClick={() => onPlay?.(track)}
                  className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 hover:scale-110 transition-all duration-300 shadow-2xl opacity-0 group-hover:opacity-100"
                >
                  <Play className="w-8 h-8 text-white ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-16 fill-slate-900"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
}