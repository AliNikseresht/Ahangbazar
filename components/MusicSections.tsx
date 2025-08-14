"use client";

import React from "react";
import { MusicCard } from "./MusicCard";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ChevronLeft, Clock, TrendingUp, Flame, Music } from "lucide-react";
import { useTrendingTracks } from "@/hooks/useTrendingTracks";
import { useRecentTracks } from "@/hooks/useRecentTracks";
import { useCategories } from "@/hooks/useCategories";
import { Track } from "@/types/tracksType";

interface MusicSectionsProps {
  onPlayTrack: (track: Track) => void;
  onDownloadTrack?: (track: Track) => void;
  currentTrack?: Track;
}

export function MusicSections({
  onPlayTrack,
  onDownloadTrack,
  currentTrack,
}: MusicSectionsProps) {
  const { data: trendingTracks = [] } = useTrendingTracks(currentTrack);
  const { data: recentTracks = [] } = useRecentTracks();
  const { data: categories = [] } = useCategories();

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
              onPlay={(t) => {
                console.log("Playing track:", t.title, t.audio);
                onPlayTrack(t);
              }}
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
                    <div
                      className={`p-4 bg-gradient-to-r ${category.color} rounded-2xl shadow-xl group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">
                        {category.tracks}
                      </div>
                      <div className="text-sm text-gray-400">آهنگ</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
                      {category.name}
                    </h3>
                    <p className="text-gray-400 text-sm mt-1 group-hover:text-gray-300 transition-colors duration-300">
                      {category.description}
                    </p>
                  </div>

                  {/* Progress indicator */}
                  <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${category.color} rounded-full w-0 group-hover:w-full transition-all duration-1000 delay-200`}
                    ></div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Recent & Popular Tabs */}
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
