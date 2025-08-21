'use client';

import { forwardRef, useEffect, useRef } from 'react';

import clsx from 'clsx';
import Typed from 'typed.js';

import { TitleSectionProps } from './TitleSection.type';

const TitleSection = forwardRef<HTMLDivElement, TitleSectionProps>(
  ({ title1, title2, title3, inView, description, isSpacing = false, className }, ref) => {
    const el1 = useRef(null);
    const el2 = useRef(null);
    const el3 = useRef(null);
    const el4 = useRef(null);

    useEffect(() => {
      let typed1: Typed | undefined;
      let typed2: Typed | undefined;
      let typed3: Typed | undefined;
      let typed4: Typed | undefined;

      if (inView) {
        const createTyped4 = () => {
          if (el4.current && description) {
            typed4 = new Typed(el4.current, {
              strings: [description],
              typeSpeed: 20,
            });
          }
        };

        const createTyped3 = () => {
          if (el3.current && title3) {
            typed3 = new Typed(el3.current, {
              strings: [title3],
              cursorChar: '',
              typeSpeed: 30,
              onComplete: createTyped4,
            });
          } else {
            createTyped4();
          }
        };

        const createTyped2 = () => {
          if (el2.current && title2) {
            typed2 = new Typed(el2.current, {
              strings: [title2],
              cursorChar: '',
              typeSpeed: 30,
              onComplete: createTyped3,
            });
          } else {
            createTyped3();
          }
        };

        if (el1.current && title1) {
          typed1 = new Typed(el1.current, {
            strings: [title1],
            cursorChar: '',
            typeSpeed: 30,
            onComplete: createTyped2,
          });
        } else {
          createTyped2();
        }
      }

      return () => {
        if (typed1) typed1.destroy();
        if (typed2) typed2.destroy();
        if (typed3) typed3.destroy();
        if (typed4) typed4.destroy();
      };
    }, [inView, title1, title2, title3, description]);

    return (
      <div ref={ref} className={clsx('gap-10pxr flex flex-col', className)}>
        <div
          className={clsx('text-h2-bd flex', {
            'flex-col': isSpacing,
            'flex-row': !isSpacing,
          })}
        >
          {title1 && <span className="mr-10pxr text-black" ref={el1}></span>}
          <div>
            {title2 && <span className="text-primary" ref={el2}></span>}
            {title3 && <span ref={el3}></span>}
          </div>
        </div>
        {description && (
          <div className="text-t4-rg text-gray-200">
            <span ref={el4}></span>
          </div>
        )}
      </div>
    );
  },
);

TitleSection.displayName = 'TitleSection';

export default TitleSection;
