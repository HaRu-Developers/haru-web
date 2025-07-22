'use client';

import clsx from 'clsx';

import { MovingBarSurveyProps } from './MovingbarSurvey.types';

const MovingBarSurvey = ({ onClick, className }: MovingBarSurveyProps) => {
  return (
    <div
      className={clsx('h-17pxr flex w-full shrink-0 justify-center', className)}
      onClick={onClick}
    >
      <div className="w-52pxr h-4pxr bg-stroke-200 rounded-100pxr mt-8pxr shrink-0" />
    </div>
  );
};

export default MovingBarSurvey;
