'use client';

import React, { Suspense } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { Filters } from './filters';
import { Button } from '../ui';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';

interface CatalogLayoutProps {
  children: React.ReactNode;
}

export const CatalogLayout: React.FC<CatalogLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 xl:gap-14">
      <aside className="hidden lg:block w-[260px] xl:w-[280px] shrink-0">
        <div className="sticky top-[88px]">
          <Suspense>
            <Filters />
          </Suspense>
        </div>
      </aside>

      <div className="flex-1 min-w-0 flex flex-col gap-5 lg:gap-0">
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="w-full h-11 rounded-2xl border-gray-200 bg-gray-50/50 hover:bg-gray-50"
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Фильтры
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-full sm:max-w-[380px] overflow-y-auto bg-white p-0"
            >
              <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-6 py-4">
                <SheetTitle className="text-lg font-bold">Фильтрация</SheetTitle>
              </div>
              <div className="px-6 pb-8 pt-2">
                <Suspense>
                  <Filters hideTitle />
                </Suspense>
              </div>
              <div className="sticky bottom-0 border-t border-gray-100 bg-white p-4">
                <SheetClose asChild>
                  <Button className="w-full h-11 rounded-2xl">Показать</Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {children}
      </div>
    </div>
  );
};
