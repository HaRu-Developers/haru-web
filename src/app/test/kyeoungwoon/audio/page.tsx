'use client';

import { useCallback } from 'react';

import GnbBottomPlayerBar from '@common/components/gnbs/gnb-audio-bar/GnbBottomPlayerBar/GnbBottomPlayerBar.client';
import GnbBottomRecorderBar from '@common/components/gnbs/gnb-audio-bar/GnbBottomRecorderBar/GnbBottomRecorderBar.client';

const AudioTestPage = () => {
  const onRecordEnd = useCallback((blob: Blob) => {
    // recordedAudioRef.current = blob;
    console.log('PARENT_COMPONENT : Audio recorded successfully:', blob);
  }, []);

  return (
    <div className="flex flex-col gap-y-5 p-10">
      <GnbBottomRecorderBar onRecordEnd={onRecordEnd} />
      <GnbBottomPlayerBar audioUrl="https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba-online-audio-converter.com_-1.wav" />
    </div>
  );
};

export default AudioTestPage;
