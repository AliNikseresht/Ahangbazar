"use client";

import React, { useRef } from "react";
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
}: MusicSectionsProps) {
  const [visibleCount, setVisibleCount] = React.useState(10);
  const { data: trendingTracks = [] } = useTrendingTracks(visibleCount);
  const { data: recentTracks = [] } = useRecentTracks();
  const { data: categories = [] } = useCategories();
  const trendingSectionRef = useRef<HTMLDivElement>(null);

  const [shouldScroll, setShouldScroll] = React.useState(false);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5);
    setShouldScroll(true);
  };

  React.useEffect(() => {
    if (shouldScroll) {
      trendingSectionRef.current?.scrollIntoView({ behavior: "smooth" });
      setShouldScroll(false);
    }
  }, [trendingTracks, shouldScroll]);

  return (
    <div className="container mx-auto px-6 pt-20 pb-36 md:pb-0 md:pt-0 space-y-20 md:mt-16">
      {/* Trending Section */}
      <section className="space-y-8" ref={trendingSectionRef}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-xl">
                <Flame className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h2 className="text-lg sm:text-2xl md:text-4xl font-black text-white">
                  داغ‌ترین‌ها
                </h2>
                <p className="text-gray-400 text-sm sm:text-base">
                  آهنگ‌های پرشنونده این هفته
                </p>
              </div>
            </div>
          </div>

          <Button
            variant="ghost"
            className="self-start sm:self-auto text-purple-400 hover:text-white hover:bg-white/10 rounded-xl group transition-all duration-300 text-sm sm:text-base"
          >
            مشاهده همه
            <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
          </Button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
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

        {/* Load more */}
        {trendingTracks.length >= visibleCount && (
          <div className="flex justify-center mt-4 sm:mt-6">
            <Button
              variant="ghost"
              onClick={handleLoadMore}
              className="text-purple-400 hover:text-white hover:bg-white/10 rounded-xl group transition-all duration-300 text-sm sm:text-base"
            >
              نمایش بیشتر
              <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        )}
      </section>

      {/* Categories Section */}
      <section className="space-y-8">
        <div className="space-y-2">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-xl">
              <Music className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl md:text-4xl font-black text-white">
                دسته‌بندی‌ها
              </h2>
              <p className="text-gray-400 text-sm sm:text-base">
                کاوش در ژانرهای مختلف موسیقی
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card
                key={category.id}
                className="group cursor-pointer overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 rounded-3xl p-6 sm:p-8"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div
                      className={`p-3 sm:p-4 bg-gradient-to-r ${category.color} rounded-2xl shadow-xl group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-lg sm:text-2xl font-bold text-white">
                        {category.tracks}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-400">
                        آهنگ
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-2xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
                      {category.name}
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm mt-1 group-hover:text-gray-300 transition-colors duration-300">
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
      <section className="space-y-6 sm:space-y-8">
        <Tabs defaultValue="recent" className="w-full">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <TabsList className="grid grid-cols-2 w-full sm:w-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-1 sm:p-2 gap-2 sm:gap-0">
              <TabsTrigger
                value="recent"
                className="cursor-pointer flex items-center justify-center sm:justify-start gap-2 sm:gap-3 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white text-gray-400 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base transition-all duration-300"
              >
                <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>تازه‌ها</span>
              </TabsTrigger>
              <TabsTrigger
                value="popular"
                className="cursor-pointer flex items-center justify-center sm:justify-start gap-2 sm:gap-3 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white text-gray-400 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base transition-all duration-300"
              >
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>محبوب‌ترین‌ها</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="recent" className="space-y-4">
            <div className="bg-white/5 backdrop-blur-xl gap-3 p-3 flex flex-col border border-white/10 rounded-2xl overflow-hidden overflow-y-auto max-h-[400px] sm:max-h-[500px]">
              {recentTracks.map((track, index) => (
                <div key={track.id}>
                  <MusicCard
                    track={track}
                    onPlay={onPlayTrack}
                    onDownload={onDownloadTrack}
                    variant="list"
                  />
                  {index < recentTracks.length - 1 && (
                    <div className="border-b border-white/5 mx-4 sm:mx-6" />
                  )}
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="popular" className="space-y-4">
            <div className="bg-white/5 backdrop-blur-xl gap-3 p-3 flex flex-col border border-white/10 rounded-2xl overflow-hidden">
              {trendingTracks.slice(0, 3).map((track, index) => (
                <div key={track.id}>
                  <MusicCard
                    track={track}
                    onPlay={onPlayTrack}
                    onDownload={onDownloadTrack}
                    variant="list"
                  />
                  {index < 2 && (
                    <div className="border-b border-white/5 mx-4 sm:mx-6" />
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
