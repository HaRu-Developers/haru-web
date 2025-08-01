import { useCallback, useEffect, useRef, useState } from 'react';

import WaveSurfer from 'wavesurfer.js';
import RecordPlugin from 'wavesurfer.js/dist/plugins/record.js';

import StartRecordingButton from '@common/components/buttons/32px/StartRecordingButton/StartRecordingButton.client';
import StopRecordingButton from '@common/components/buttons/32px/StopRecordingButton/StopRecordingButton.client';

import PlayPauseButton from '../PlayPauseButton/PlayPauseButton.client';
import { PlayPauseButtonStatus } from '../PlayPauseButton/PlayPauseButton.types';
import { formatAudioProgress } from '../audio-bar.util';

interface GnbBottomRecorderBarProps {
  onRecordEnd: (blob: Blob) => void;
}

const GnbBottomRecorderBar = ({ onRecordEnd }: GnbBottomRecorderBarProps) => {
  const recorderWsRef = useRef<WaveSurfer | null>(null);
  const recorderPluginRef = useRef<RecordPlugin | null>(null);
  const recorderContainerRef = useRef<HTMLDivElement | null>(null);

  // 녹음 시작 전 최초 상태일 경우 구별을 위해 사용
  const [hasStartedRecording, setHasStartedRecording] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);

  const [recorderProgress, setRecorderProgress] = useState<number>(0);

  // 사용 가능한 마이크 디바이스 가져오기
  const getAvailableDevices = async () => {
    try {
      const devices = await RecordPlugin.getAvailableAudioDevices();
      return devices;
    } catch (error) {
      console.error('[ERR] Cannot get audio devices:', error);
      alert('오디오 디바이스를 가져올 수 없습니다.');
      return [];
    }
  };

  const handleRecordResumePause = useCallback(() => {
    if (!recorderPluginRef.current) {
      // console.error('Recorder plugin is not initialized.');
      return;
    }

    const isPaused = recorderPluginRef.current.isPaused();
    if (isPaused) {
      recorderPluginRef.current.resumeRecording();
    } else {
      recorderPluginRef.current.pauseRecording();
    }
  }, []);

  const handleStartRecording = useCallback(async () => {
    // initializeWavesurfer();

    if (!recorderPluginRef.current) {
      // console.error('Recorder plugin is not initialized.');
      return;
    }

    const devices = await getAvailableDevices();
    // console.log('Available devices:', devices);

    recorderPluginRef.current.startRecording({ deviceId: devices[0]?.deviceId });

    setHasStartedRecording(true);
    setIsRecording(true);
  }, []);

  const handleEndRecording = useCallback(() => {
    if (!recorderPluginRef.current) {
      // console.error('Recorder plugin is not initialized.');
      return;
    }

    recorderPluginRef.current.stopRecording();
  }, []);

  const initializeWavesurfer = () => {
    // console.log('Initializing Wavesurfer...');
    // div container is required, assuring it.
    if (!recorderContainerRef.current) {
      // console.error('Recorder container is not initialized.', recorderContainerRef);
      return;
    }
    // if wavesurfer obj already exists, destroy it.
    if (recorderWsRef.current) {
      recorderWsRef.current.destroy();
    }

    const ws = WaveSurfer.create({
      container: recorderContainerRef.current,
      waveColor: '#007AFF', // color variable : audio-bar
      progressColor: '#007AFF',
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

    recorderPlugin.on('record-end', (blob: Blob) => {
      // console.log('Recording ended:', blob);
      // console.log('Recorded audio URL:', URL.createObjectURL(blob));
      onRecordEnd(blob);
      setIsRecording(false);
    });

    recorderPlugin.on('record-progress', (progress: number) => {
      setRecorderProgress(progress);
    });

    recorderPlugin.on('record-resume', () => {
      // console.log('Recording resumed');
      setIsRecording(true);
    });

    recorderPlugin.on('record-pause', () => {
      // console.log('Recording paused');
      setIsRecording(false);
    });

    recorderWsRef.current = ws;
    recorderPluginRef.current = recorderPlugin;

    // console.log('Wavesurfer and RecordPlugin initialized');
  };

  useEffect(() => {
    // if (!hasStartedRecording) return;

    if (recorderWsRef.current) {
      recorderWsRef.current.destroy();
    }

    initializeWavesurfer();
    // console.log('Wavesurfer Initialized');

    return () => {
      if (recorderWsRef.current) {
        recorderWsRef.current.destroy();
        recorderWsRef.current = null;
      }
    };
  }, []);

  // 구성은 [녹음 재개/일시정지 버튼] [녹음 진행바] [녹음 시간] [녹음 정지 버튼]
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
      <div className="w-122pxr bg-audio-bar h-2pxr rounded-100pxr" hidden={hasStartedRecording} />
      <div className="w-122pxr" ref={recorderContainerRef} hidden={!hasStartedRecording} />
      {/* 현재 녹음 시간 */}
      <span className="text-cap1-rg ml-12pxr text-black">
        {formatAudioProgress(recorderProgress)}
      </span>
      {/* 녹음이 시작된 경우에만 정지 버튼 렌더링 */}
      {hasStartedRecording && (
        <StopRecordingButton onClick={handleEndRecording} className="ml-155pxr" />
      )}
      <div className="flex-grow" /> {/* 남은 공간을 채우기 위한 빈 div */}
    </div>
  );
};

export default GnbBottomRecorderBar;
