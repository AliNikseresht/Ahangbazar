import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Clock, TrendingUp } from "lucide-react";
import { MusicCard } from "../MusicCard";
import { Track } from "@/types/tracksType";

interface RecentPopularSectionProps {
  recentTracks: Track[];
  trendingTracks: Track[];
  onPlayTrack: (track: Track) => void;
  onDownloadTrack?: (track: Track) => void;
}

export default function RecentPopularSection({
  recentTracks,
  trendingTracks,
  onPlayTrack,
  onDownloadTrack,
}: RecentPopularSectionProps) {
  return (
    <section className="space-y-6 sm:space-y-8">
      <Tabs defaultValue="recent" className="w-full">
        {/* Tabs Header */}
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

        {/* Tabs Content */}
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
                {index < 2 && <div className="border-b border-white/5 mx-4 sm:mx-6" />}
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
