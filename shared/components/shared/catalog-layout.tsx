'use client';

import React, { Suspense } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { Filters } from './filters';
import { Button } from '../ui';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';

interface CatalogLayoutProps {
  children: React.ReactNode;
}

export const CatalogLayout: React.FC<CatalogLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-[60px]">
      <div className="hidden lg:block w-[250px] shrink-0">
        <Suspense>
          <Filters />
        </Suspense>
      </div>

      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full h-11">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Фильтры
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full sm:max-w-md overflow-y-auto">
            <SheetTitle className="sr-only">Фильтрация</SheetTitle>
            <Suspense>
              <Filters />
            </Suspense>
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
};
