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

const storySizes =
  'w-[108px] h-[136px] sm:w-[140px] sm:h-[175px] md:w-[168px] md:h-[210px] lg:w-[200px] lg:h-[250px]';

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
      <Container className={cn('my-5 sm:my-8', className)}>
        <div className="scroll-x scroll-x-snap scroll-fade-x -mx-1 px-1">
          <div className="flex w-max items-center gap-2.5 sm:gap-3 pb-1">
            {stories.length === 0 &&
              [...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    'shrink-0 rounded-2xl bg-gray-200 animate-pulse',
                    storySizes
                  )}
                />
              ))}

            {stories.map(story => (
              <button
                key={story.id}
                type="button"
                onClick={() => onClickStory(story)}
                className={cn(
                  'shrink-0 overflow-hidden rounded-2xl ring-2 ring-transparent transition hover:ring-primary/30 focus-visible:outline-none focus-visible:ring-primary',
                  storySizes
                )}
              >
                <img
                  className="h-full w-full object-cover"
                  src={story.previewImageUrl}
                  alt=""
                />
              </button>
            ))}
          </div>
        </div>
      </Container>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4">
          <div className="relative w-full max-w-[min(520px,100%)]">
            <button
              type="button"
              className="absolute -top-12 right-0 z-10 rounded-full p-2 text-white/70 transition hover:text-white sm:-right-2 sm:-top-10"
              onClick={() => setOpen(false)}
              aria-label="Закрыть"
            >
              <X className="h-8 w-8" />
            </button>

            <div className="overflow-hidden rounded-2xl">
              <ReactStories
                onAllStoriesEnd={() => setOpen(false)}
                stories={
                  selectedStory?.items.map(item => ({ url: item.sourceUrl })) ||
                  []
                }
                defaultInterval={3000}
                width="100%"
                height={Math.min(720, window.innerHeight * 0.82)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
