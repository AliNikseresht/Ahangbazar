import { FeaturedTrack } from '@/types/heroSectionType';
import { Star } from 'lucide-react';

interface HeroStatsProps {
  track: FeaturedTrack;
}

export function HeroStats({ track }: HeroStatsProps) {
  return (
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
      <h4 className="text-lg">
        {(track.plays / 1000000).toFixed(1)}M پخش
      </h4>
      <div className="text-lg">{track.duration}</div>
    </div>
  );
}
