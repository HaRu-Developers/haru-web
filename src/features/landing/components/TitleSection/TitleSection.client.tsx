'use client';

import { forwardRef, useEffect, useRef } from 'react';

import clsx from 'clsx';
import Typed from 'typed.js';

import { TitleSectionProps } from './TitleSection.type';

const TitleSection = forwardRef<HTMLDivElement, TitleSectionProps>(
  ({ title1, title2, title3, inView, description, isSpacing = false, className, isTyping = false }, ref) => {
    const el1 = useRef(null);
    const el2 = useRef(null);
    const el3 = useRef(null);

    useEffect(() => {
      let typed1: Typed | undefined;
      let typed2: Typed | undefined;
      let typed3: Typed | undefined;

      if (inView) {
        const createTyped3 = () => {
          if (el3.current && title3) {
            typed3 = new Typed(el3.current, {
              strings: [title3],
              cursorChar: '',
              typeSpeed: 30,
            });
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
          {title1 ? (isTyping ? <span className="mr-10pxr text-black" ref={el1}></span> : <span className="mr-10pxr text-black">{title1}</span>) : null}
          <div>
            {title2 ? (isTyping ? <span className="text-primary" ref={el2}></span> : <span className="text-primary">{title2}</span>) : null}
            {title3 ? (isTyping ? <span ref={el3}></span> : <span className='text-black'>{title3}</span>) : null}
          </div>
        </div>
        {description && (
          <div className="text-t4-rg text-gray-200">
            <span>{description}</span>
          </div>
        )}
      </div>
    );
  },
);

TitleSection.displayName = 'TitleSection';

export default TitleSection;
