'use client';

import { forwardRef } from 'react';

import clsx from 'clsx';

import LandingNecessityIcons from '@icons/LandingNecessityIcons/LandingNecessityIcons';

import { SectionLayoutProps } from './SectionLayout.types';

const SectionLayout = forwardRef<HTMLDivElement, SectionLayoutProps>(
  ({ state, title, description, inView, className }, ref) => {
    return (
      <div
        className={clsx(
          'gap-14pxr pr-110pxr flex w-full flex-col items-start justify-center whitespace-pre-line opacity-0',
          className,
          {
            'animate-fade-in-up-and-delay': inView,
          },
        )}
        ref={ref}
      >
        <LandingNecessityIcons state={state} />
        <div className="gap-12pxr flex flex-col">
          <span className="text-t2-bd text-black">{title}</span>
          <div>
            <div className="text-b2-rg whitespace-pre text-gray-200">{description}</div>
          </div>
        </div>
      </div>
    );
  },
);

SectionLayout.displayName = 'SectionLayout';

export default SectionLayout;
