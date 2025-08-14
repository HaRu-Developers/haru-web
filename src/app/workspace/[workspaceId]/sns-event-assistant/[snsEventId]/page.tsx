'use client';

import { useState } from 'react';

import { GnbSection } from '@common/types/gnbs.types';

import GnbTop from '@common/components/gnbs/GnbTop/GnbTop.client';
import InputFileTitle from '@common/components/inputs/InputFileTitle/InputFileTitle.client';
import { InputFileTitleMode } from '@common/components/inputs/InputFileTitle/InputFileTitle.types';

const SnsEventAssistantDetailPage = () => {
  const [title, setTitle] = useState<string>('UMC Networking Day 인스타그램 언급 이벤트');
  const [mode, setMode] = useState<InputFileTitleMode>(InputFileTitleMode.DEFAULT);
  return (
    <section>
      <GnbTop section={GnbSection.CUSTOM} title={title} />
      <div className="flex w-full">
        {/* 상단 부분 */}
        <div className="flex w-full justify-center">
          <div className="w-668pxr">
            <InputFileTitle value={title} onSave={setTitle} mode={mode} onMode={setMode} />
            <div className="flex w-full justify-between">
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
        {/* 하단 부분 */}
      </div>
    </section>
  );
};

export default SnsEventAssistantDetailPage;
