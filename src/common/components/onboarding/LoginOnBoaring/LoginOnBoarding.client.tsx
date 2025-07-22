'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import clsx from 'clsx';

import AiManagerImage from '@assets/images/onboarding/AiMananger.png';
import SnsEventAssistantImage from '@assets/images/onboarding/SnsEventAssistant.png';
import TeamVibeMaker from '@assets/images/onboarding/TeamVibeMaker.png';

const slides = [
  {
    image: AiManagerImage,
    title: 'AI 회의 진행 매니저가\n회의를 똑똑하게 도와드려요.',
    description:
      '실시간 음성 인식으로 대화의 흐름을 파악하고,\n맞춤 질문 추천과 회의록 작성까지 해드릴게요!',
  },
  {
    image: SnsEventAssistantImage,
    title: 'SNS 이벤트 어시스턴트가\n이벤트 운영을 간편하게 해드려요.',
    description: '참여자 수집부터 당첨자 추첨까지,\n링크 입력 한 번으로 모두 끝나요!',
  },
  {
    image: TeamVibeMaker,
    title: '팀 분위기 트래커가\n팀 분위기를 한눈에 보여드려요.',
    description: '팀 내 설문 결과를 자동으로 분석하고,\n운영자 맞춤 인사이트까지 제공해 드려요!',
  },
];

const LoginOnBoarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => setCurrentIndex(index);

  const currentSlide = slides[currentIndex];

  return (
    <section className="h-screen w-[50vw] bg-gray-700 px-11">
      <div className="flex h-full flex-col items-center justify-center text-center">
        <Image src={currentSlide.image} alt="슬라이드 이미지" className="object-contain" priority />
        <div className="text-t2-bd mb-3.5 whitespace-pre-line text-black">{currentSlide.title}</div>
        <div className="text-b1-rg whitespace-pre-line text-gray-200">
          {currentSlide.description}
        </div>

        <div className="mt-11 flex justify-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              aria-label={`슬라이드 ${idx + 1}`}
              title={`슬라이드 ${idx + 1}`}
              className={clsx('h-11pxr w-11pxr rounded-full transition-all duration-300', {
                'bg-primary': idx === currentIndex,
                'bg-stroke-200': idx !== currentIndex,
              })}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoginOnBoarding;
