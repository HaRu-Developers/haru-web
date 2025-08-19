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
  endMeeting,
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
      endMeeting();
      setIsRecording(false);
    });

    recorderPlugin.on('record-progress', (progress: number) => {
      setRecorderProgress(progress);
    });

    recorderPlugin.on('record-resume', () => {
      console.log('Recording resumed');
      resumeStreaming();
      setIsRecording(true);
    });

    recorderPlugin.on('record-pause', () => {
      console.log('Recording paused');
      pauseStreaming();
      setIsRecording(false);
    });

    recorderWsRef.current = ws;
    recorderPluginRef.current = recorderPlugin;

    // console.log('Wavesurfer and RecordPlugin initialized');
  }, [endMeeting, pauseStreaming, resumeStreaming]);

  // 일시정지/재개
  const handleRecordResumePause = useCallback(() => {
    if (!recorderPluginRef.current) {
      // console.error('[ERR] Recorder plugin is not initialized.');
      return;
    }

    if (isPaused()) {
      recorderPluginRef.current.resumeRecording();
    } else {
      recorderPluginRef.current.pauseRecording();
    }
  }, [isPaused]);

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
  const handleEndRecording = useCallback(() => {
    if (!recorderPluginRef.current) {
      // console.error('[ERR] Recorder plugin is not initialized.');
      return;
    }

    recorderPluginRef.current.stopRecording();
  }, []);

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

  // recorder:resume, pause 이벤트 발생시 다시 플레이 or 멈춤
  // recorder:resume, recorder:pause 수신
  useEffect(() => {
    const onExternalEvent = async () => {
      if (!hasStartedRecording || !recorderPluginRef.current) return;
      try {
        if (isPaused()) {
          recorderPluginRef.current.resumeRecording();
        } else {
          recorderPluginRef.current.pauseRecording();
        }
      } catch (e) {
        console.error('onExternalEvent', e);
      }
    };
    window.addEventListener('recorder', onExternalEvent);
    return () => {
      window.removeEventListener('recorder', onExternalEvent);
    };
  }, [hasStartedRecording, isRecording, isPaused]);

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
