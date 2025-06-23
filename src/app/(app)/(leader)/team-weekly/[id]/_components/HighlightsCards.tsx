"use client";

import { Card } from "@/components/ui/card";
import { TeamWeeklyHighlightItem } from "@/types/reportType";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

interface HighlightsCardProps {
  highlight: TeamWeeklyHighlightItem;
}

const getProgressColor = (progress: number) => {
  if (progress <= 30) return "bg-red-500";
  if (progress <= 70) return "bg-yellow-500";
  return "bg-green-500";
};

export function HighlightsCard({ highlight }: HighlightsCardProps) {
  return (
    <Card className='p-4 border border-gray-200 hover:shadow-lg transition-all rounded-2xl'>
      <div className='space-y-4'>
        <h4 className='text-lg font-semibold text-gray-800'>
          {highlight.title}
        </h4>

        <div className='flex items-center gap-4'>
          <div className='relative flex-1 h-3 bg-gray-200 rounded-full w-full max-w-[600px] overflow-hidden'>
            <div
              className={`h-3 rounded-full transition-all duration-500 ${getProgressColor(highlight.progress_percentage)}`}
              style={{
                width: `${highlight.progress_percentage}%`,
              }}
            ></div>
          </div>

          <span className='text-sm font-medium text-gray-700 whitespace-nowrap'>
            {highlight.progress_percentage}%
          </span>
        </div>

        <p className='text-gray-700 text-sm leading-relaxed'>
          {highlight.summary}
        </p>

        <div className='flex flex-wrap gap-3 pt-2'>
          {highlight.contributors.map((name, idx) => (
            <div
              key={idx}
              className='flex items-center bg-gray-100 rounded-full pl-2 pr-4 py-1 text-sm text-gray-700 shadow-sm hover:shadow-md transition-all hover:bg-gray-200'
            >
              <Avatar className='w-8 h-8 border-2 border-white shadow-md rounded-full'>
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${name}`}
                  alt={name}
                  className='rounded-full'
                />
                <AvatarFallback className='text-sm font-bold bg-gradient-to-br from-primary/80 to-primary/40 text-white rounded-full'>
                  {name.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <span className='ml-2 font-medium'>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
