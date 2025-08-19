'use client';

import { useEffect, useRef } from 'react';

import clsx from 'clsx';
import { useInView } from 'react-intersection-observer';
import Typed from 'typed.js';

import CtaBannerButton from '@features/landing/components/buttons/cta-buttons/CtaBannerButton/CtaBannerButton.client';

import { LandingStartProps } from './LandingStart.types';

const LandingStart = ({ onButtonClick, className }: LandingStartProps) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 });
  const el1 = useRef(null);
  const el2 = useRef(null);
  const el3 = useRef(null);
  const el4 = useRef(null);

  useEffect(() => {
    let typed1: Typed | null = null;
    let typed2: Typed | null = null;
    let typed3: Typed | null = null;
    let typed4: Typed | null = null;
    if (inView) {
      typed1 = new Typed(el1.current, {
        strings: ['지금 바로 '],
        typeSpeed: 50,
        onComplete: (self) => {
          self.cursor.remove();
          typed2 = new Typed(el2.current, {
            strings: ['HaRu'],
            typeSpeed: 50,
            onComplete: (self) => {
              self.cursor.remove();
              typed3 = new Typed(el3.current, {
                strings: ['와'],
                typeSpeed: 50,
                onComplete: (self) => {
                  self.cursor.remove();
                  typed4 = new Typed(el4.current, {
                    strings: ['하루를 시작해 보세요!'],
                    typeSpeed: 50,
                  });
                },
              });
            },
          });
        },
      });

      return () => {
        typed1?.destroy();
        typed2?.destroy();
        typed3?.destroy();
        typed4?.destroy();
      };
    }
  }, [inView]);

  return (
    <div
      className={clsx(
        'py-92pxr gap-42pxr bg-landing-bg flex w-full flex-col items-center justify-center',
        className,
      )}
      ref={ref}
    >
      <div
        className={clsx('text-h2-bd h-141pxr flex flex-col items-center opacity-0', {
          'animate-fade-in-up-and-delay': inView,
        })}
      >
        <div>
          <span className="pr-12pxr text-black" ref={el1} />
          <span className="text-primary" ref={el2} />
          <span className="text-black" ref={el3} />
        </div>
        <div>
          <span className="text-black" ref={el4} />
        </div>
      </div>
      <CtaBannerButton
        onClick={onButtonClick}
        className={clsx({
          'animate-fade-in-up-and-delay': inView,
        })}
      />
    </div>
  );
};

export default LandingStart;
