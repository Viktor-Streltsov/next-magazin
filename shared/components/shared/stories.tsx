'use client';

import { Api } from '@/shared/services/api-client';
import { IStory } from '@/shared/services/stories';
import React, { useEffect } from 'react';
import { Container } from './container';
import { cn } from '@/shared/lib/utils';
import { X } from 'lucide-react';
import ReactStories from 'react-insta-stories';

interface Props {
  className?: string;
}

export const Stories: React.FC<Props> = ({ className }) => {
  const [stories, setStories] = React.useState<IStory[]>([]);
  const [open, setOpen] = React.useState(false);
  const [selectedStory, setSelectedStory] = React.useState<IStory>();

  useEffect(() => {
    async function fetchStories() {
      const data = await Api.stories.getAll();
      setStories(data);
    }

    fetchStories();
  }, []);

  const onClickStory = (story: IStory) => {
    setSelectedStory(story);

    if (story.items.length > 0) {
      setOpen(true);
    }
  };

  return (
    <>
      <Container className={cn('my-6 sm:my-10 overflow-x-auto scrollbar', className)}>
        <div className="flex items-center gap-2 sm:gap-3 min-w-min pb-1">
          {stories.length === 0 &&
            [...Array(6)].map((_, index) => (
              <div
                key={index}
                className="w-[120px] h-[150px] sm:w-[160px] sm:h-[200px] lg:w-[200px] lg:h-[250px] bg-gray-200 rounded-md animate-pulse shrink-0"
              />
            ))}

          {stories.map(story => (
            <img
              key={story.id}
              onClick={() => onClickStory(story)}
              className="rounded-md cursor-pointer w-[120px] h-[150px] sm:w-[160px] sm:h-[200px] lg:w-[200px] lg:h-[250px] object-cover shrink-0"
              src={story.previewImageUrl}
              alt=""
            />
          ))}
        </div>

        {open && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-30 p-4">
            <div className="relative w-full max-w-[520px]">
              <button
                className="absolute -right-2 -top-10 sm:-right-10 sm:-top-5 z-30"
                onClick={() => setOpen(false)}
              >
                <X className="w-8 h-8 text-white/50" />
              </button>

              <ReactStories
                onAllStoriesEnd={() => setOpen(false)}
                stories={
                  selectedStory?.items.map(item => ({ url: item.sourceUrl })) ||
                  []
                }
                defaultInterval={3000}
                width="100%"
                height={600}
              />
            </div>
          </div>
        )}
      </Container>
    </>
  );
};
