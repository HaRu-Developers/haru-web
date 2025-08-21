'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import WaveSurfer from 'wavesurfer.js';
import RecordPlugin from 'wavesurfer.js/dist/plugins/record.js';

import StartRecordingButton from '@common/components/buttons/32px/StartRecordingButton/StartRecordingButton.client';
import StopRecordingButton from '@common/components/buttons/32px/StopRecordingButton/StopRecordingButton.client';

import PlayPauseButton from '../PlayPauseButton/PlayPauseButton.client';
import { PlayPauseButtonStatus } from '../PlayPauseButton/PlayPauseButton.types';
import { formatAudioProgress } from '../audio-bar.utils';
import { GnbBottomRecorderBarProps } from './GnbRecorderBar.types';

const GnbBottomRecorderBar = ({
  micStream,
  isEnding,
  isPaused,
  connect,
  onOpenEndMeetingModal,
  pauseStreaming,
  resumeStreaming,
}: GnbBottomRecorderBarProps) => {
  const recorderWsRef = useRef<WaveSurfer | null>(null);
  const recorderPluginRef = useRef<RecordPlugin | null>(null);
  const recorderContainerRef = useRef<HTMLDivElement | null>(null);

  const [hasStartedRecording, setHasStartedRecording] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recorderProgress, setRecorderProgress] = useState<number>(0);

  const initializeWavesurfer = useCallback(() => {
    // console.log('Initializing Wavesurfer...');
    // div container is required, assuring it.
    if (!recorderContainerRef.current) {
      // console.error('[ERR] Recorder plugin is not initialized.');
      return;
    }
    // if wavesurfer obj already exists, destroy it.
    if (recorderWsRef.current) {
      recorderWsRef.current.destroy();
    }

    const ws = WaveSurfer.create({
      container: recorderContainerRef.current,
      waveColor: '#E65787',
      progressColor: '#E65787',
      fillParent: true,
      dragToSeek: false,
      // minPxPerSec: 5000,
      normalize: false,
      height: 32, // 높이는 17px로 고정
      interact: false, // 클릭 시 상호작용 비활성화

      // Figma 참고해서 임의로 설정하였음.
      barWidth: 3,
      barGap: 2,
      barRadius: 2,
    });

    const recorderPlugin = ws.registerPlugin(
      RecordPlugin.create({
        renderRecordedAudio: false,
        // mimeType: 'audio/webm', // 녹음 형식 설정 (기본값은 'audio/webm')
        // continuousWaveformDuration: 30, // 녹음된 오디오의 지속 시간 설정
        scrollingWaveform: true,
        scrollingWaveformWindow: 3,
      }),
    );

    recorderPlugin.on('record-end', () => {
      // 서버/브라우저의 강제 종료 케이스
      setIsRecording(false); // 아이콘 변경
    });

    recorderPlugin.on('record-progress', (progress: number) => {
      setRecorderProgress(progress);
    });

    recorderPlugin.on('record-resume', () => {
      setIsRecording(true);
    });

    recorderPlugin.on('record-pause', () => {
      // pause는 원인을 유지해 둠
      setIsRecording(false);
    });

    recorderWsRef.current = ws;
    recorderPluginRef.current = recorderPlugin;

    // console.log('Wavesurfer and RecordPlugin initialized');
  }, []);

  // 일시정지/재개
  const handleRecordResumePause = useCallback(() => {
    if (!recorderPluginRef.current) {
      // console.error('[ERR] Recorder plugin is not initialized.');
      return;
    }

    if (isPaused()) {
      // 재생
      recorderPluginRef.current.resumeRecording(); // ui
      resumeStreaming(); // ws
    } else {
      // 일시정지
      recorderPluginRef.current.pauseRecording(); // ui
      pauseStreaming(); // ws
    }
  }, [isPaused, resumeStreaming, pauseStreaming]);

  // 녹음 시작
  const handleStartRecording = useCallback(async () => {
    await connect(); // hook이 스트림 생성 + onMicStream으로 넘김

    if (!recorderPluginRef.current) {
      // console.error('[ERR] Recorder plugin is not initialized.');
      return;
    }

    try {
      // 같은 인스턴스에서 startRecording 호출
      recorderPluginRef.current.startRecording();
      setHasStartedRecording(true);
      setIsRecording(true);
    } catch {
      void 0;
    }
  }, [connect]);

  // 종료
  const handleEndRecording = useCallback(async () => {
    if (!recorderPluginRef.current) {
      // console.error('[ERR] Recorder plugin is not initialized.');
      return;
    }

    // 먼저 녹음을 잠시 멈추고(무음 전송 방지)
    try {
      recorderPluginRef.current.pauseRecording(); // ui
      pauseStreaming(); // ws
    } catch {
      void 0;
    }

    // 종료 확인 모달 열기 (취소 시 외부에서 resume 이벤트를 쏴줌)
    try {
      await onOpenEndMeetingModal();
    } catch {
      void 0;
    }
  }, [onOpenEndMeetingModal, pauseStreaming]);

  useEffect(() => {
    // 마운트 시 initializeWavesurfer() 1회만 생성
    initializeWavesurfer();
    return () => {
      try {
        recorderPluginRef.current?.stopRecording();
      } catch {
        void 0;
      }
      try {
        recorderWsRef.current?.destroy();
      } catch {
        void 0;
      }
      recorderPluginRef.current = null;
      recorderWsRef.current = null;
    };
  }, [initializeWavesurfer]);

  // hook에서 넘겨준 micStream이 오면, 그 스트림으로 시각화만
  useEffect(() => {
    if (!micStream || !recorderPluginRef.current) return;
    try {
      recorderPluginRef.current.renderMicStream(micStream);
    } catch {
      void 0;
    }
  }, [micStream]);

  // 외부 이벤트에 반응
  useEffect(() => {
    const onExternalEvent = (e: Event) => {
      if (!recorderPluginRef.current) return;
      const action = (e as CustomEvent)?.detail?.action as 'pause' | 'resume' | undefined;

      try {
        if (action === 'pause') {
          recorderPluginRef.current.pauseRecording(); // Wavesurfer 녹음 멈춤
          setIsRecording(false);
          return;
        }
        if (action === 'resume') {
          recorderPluginRef.current.resumeRecording(); // Wavesurfer 녹음 재개
          setIsRecording(true);
          return;
        }
      } catch (err) {
        console.error('recorder event error', err);
      }
    };

    window.addEventListener('recorder', onExternalEvent as EventListener);
    return () => window.removeEventListener('recorder', onExternalEvent as EventListener);
  }, []);

  return (
    <div className="w-656pxr h-68pxr rounded-100pxr border-stroke-200/70 px-16pxr flex flex-row items-center border bg-white">
      {/* 녹음 시작 여부에 따라 선택적 렌더링 */}
      {hasStartedRecording ? (
        // 녹음이 시작된 경우
        <PlayPauseButton
          className="mr-184pxr"
          status={isRecording ? PlayPauseButtonStatus.PAUSE : PlayPauseButtonStatus.PLAY}
          onClick={handleRecordResumePause}
        />
      ) : (
        // 녹음이 시작되지 않은 경우
        <StartRecordingButton
          className="mr-137pxr"
          onClick={async () => await handleStartRecording()}
        />
      )}
      {/* 녹음 시작 여부에 따라 선택적 렌더링, Wavesurfer 객체를 위해 hidden을 활용 */}
      <div className="w-122pxr bg-primary h-2pxr rounded-100pxr" hidden={hasStartedRecording} />
      <div className="w-122pxr" ref={recorderContainerRef} hidden={!hasStartedRecording} />
      {/* 현재 녹음 시간 */}
      <span className="text-cap1-rg ml-12pxr text-black">
        {formatAudioProgress(recorderProgress)}
      </span>
      {/* 녹음이 시작된 경우에만 정지 버튼 렌더링 */}
      {hasStartedRecording && (
        <StopRecordingButton
          isEnding={isEnding}
          onClick={handleEndRecording}
          className="ml-155pxr"
        />
      )}
      <div className="flex-grow" /> {/* 남은 공간을 채우기 위한 빈 div */}
    </div>
  );
};

export default GnbBottomRecorderBar;
