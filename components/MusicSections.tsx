import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, TrendingUp, Clock, Heart, Music, Flame, Zap, Star, Radio, Disc3 } from 'lucide-react';
import { Button } from './ui/button';
import { MusicCard } from './MusicCard';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  cover: string;
  plays?: number;
  isPlaying?: boolean;
}

interface MusicSectionsProps {
  onPlayTrack: (track: Track) => void;
  onDownloadTrack?: (track: Track) => void;
  currentTrack?: Track;
}

export function MusicSections({ onPlayTrack, onDownloadTrack, currentTrack }: MusicSectionsProps) {
  // Mock data for different sections
  const trendingTracks: Track[] = [
    {
      id: '1',
      title: 'احساس آزادی',
      artist: 'آرمین ملودی',
      duration: '3:45',
      cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
      plays: 1250000,
      isPlaying: currentTrack?.id === '1'
    },
    {
      id: '2',
      title: 'شب طوفانی',
      artist: 'سارا ریتم',
      duration: '4:12',
      cover: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop',
      plays: 980000,
      isPlaying: currentTrack?.id === '2'
    },
    {
      id: '3',
      title: 'رقص نور',
      artist: 'گروه الکترو',
      duration: '3:28',
      cover: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&h=400&fit=crop',
      plays: 1560000,
      isPlaying: currentTrack?.id === '3'
    },
    {
      id: '4',
      title: 'صدای سکوت',
      artist: 'رضا آکوستیک',
      duration: '5:01',
      cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop',
      plays: 870000,
      isPlaying: currentTrack?.id === '4'
    },
    {
      id: '5',
      title: 'پرواز درونی',
      artist: 'لیلا فلوت',
      duration: '3:33',
      cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&flip=h',
      plays: 2010000,
      isPlaying: currentTrack?.id === '5'
    }
  ];

  const recentTracks: Track[] = [
    {
      id: '6',
      title: 'نسیم صبح',
      artist: 'امیر پیانو',
      duration: '3:22',
      cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&sat=2',
      plays: 150000
    },
    {
      id: '7',
      title: 'ستاره‌های شب',
      artist: 'نازی کلاسیک',
      duration: '4:05',
      cover: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop&sat=2',
      plays: 85000
    },
    {
      id: '8',
      title: 'موج آرامش',
      artist: 'گروه طبیعت',
      duration: '6:18',
      cover: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&h=400&fit=crop&sat=2',
      plays: 92000
    }
  ];

  const categories = [
    { 
      id: 'electronic', 
      name: 'الکترونیک', 
      icon: Zap, 
      color: 'from-cyan-500 to-blue-600',
      tracks: 1240,
      description: 'موزیک‌های دیجیتال و ترنس'
    },
    { 
      id: 'pop', 
      name: 'پاپ', 
      icon: Star, 
      color: 'from-pink-500 to-rose-600',
      tracks: 3420,
      description: 'محبوب‌ترین آهنگ‌های روز'
    },
    { 
      id: 'rock', 
      name: 'راک', 
      icon: Flame, 
      color: 'from-red-500 to-orange-600',
      tracks: 890,
      description: 'قدرت و انرژی خالص'
    },
    { 
      id: 'classical', 
      name: 'کلاسیک', 
      icon: Music, 
      color: 'from-purple-500 to-indigo-600',
      tracks: 567,
      description: 'شاهکارهای جاودان'
    },
    { 
      id: 'jazz', 
      name: 'جز', 
      icon: Radio, 
      color: 'from-yellow-500 to-amber-600',
      tracks: 234,
      description: 'ریتم‌های آزاد و خلاقانه'
    },
    { 
      id: 'ambient', 
      name: 'محیطی', 
      icon: Disc3, 
      color: 'from-green-500 to-emerald-600',
      tracks: 445,
      description: 'آرامش و مدیتیشن'
    }
  ];

  return (
    <div className="container mx-auto px-6 py-16 space-y-20">
      {/* Trending Section */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-xl">
                <Flame className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-4xl font-black text-white">داغ‌ترین‌ها</h2>
                <p className="text-gray-400">آهنگ‌های پرشنونده این هفته</p>
              </div>
            </div>
          </div>
          <Button 
            variant="ghost" 
            className="text-purple-400 hover:text-white hover:bg-white/10 rounded-xl group transition-all duration-300"
          >
            مشاهده همه
            <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {trendingTracks.map((track) => (
            <MusicCard
              key={track.id}
              track={track}
              onPlay={onPlayTrack}
              onDownload={onDownloadTrack}
              variant="grid"
            />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="space-y-8">
        <div className="space-y-2">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-xl">
              <Music className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-black text-white">دسته‌بندی‌ها</h2>
              <p className="text-gray-400">کاوش در ژانرهای مختلف موسیقی</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card
                key={category.id}
                className="group cursor-pointer overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 rounded-3xl p-8"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-4 bg-gradient-to-r ${category.color} rounded-2xl shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">{category.tracks}</div>
                      <div className="text-sm text-gray-400">آهنگ</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">{category.name}</h3>
                    <p className="text-gray-400 text-sm mt-1 group-hover:text-gray-300 transition-colors duration-300">{category.description}</p>
                  </div>

                  {/* Progress indicator */}
                  <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${category.color} rounded-full w-0 group-hover:w-full transition-all duration-1000 delay-200`}></div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Recent and Popular Tabs */}
      <section className="space-y-8">
        <Tabs defaultValue="recent" className="w-full">
          <div className="flex items-center justify-between mb-8">
            <TabsList className="grid grid-cols-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-2">
              <TabsTrigger 
                value="recent" 
                className="flex items-center space-x-3 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white text-gray-400 px-6 py-3 transition-all duration-300"
              >
                <Clock className="w-5 h-5" />
                <span>تازه‌ها</span>
              </TabsTrigger>
              <TabsTrigger 
                value="popular" 
                className="flex items-center space-x-3 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white text-gray-400 px-6 py-3 transition-all duration-300"
              >
                <TrendingUp className="w-5 h-5" />
                <span>محبوب‌ترین‌ها</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="recent" className="space-y-4">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden">
              {recentTracks.map((track, index) => (
                <div key={track.id}>
                  <MusicCard
                    track={track}
                    onPlay={onPlayTrack}
                    onDownload={onDownloadTrack}
                    variant="list"
                  />
                  {index < recentTracks.length - 1 && (
                    <div className="border-b border-white/5 mx-6" />
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="popular" className="space-y-4">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden">
              {trendingTracks.slice(0, 3).map((track, index) => (
                <div key={track.id}>
                  <MusicCard
                    track={track}
                    onPlay={onPlayTrack}
                    onDownload={onDownloadTrack}
                    variant="list"
                  />
                  {index < 2 && (
                    <div className="border-b border-white/5 mx-6" />
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}