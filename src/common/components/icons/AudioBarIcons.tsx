import EndRecordingIcon from '@svgs/audio-bar/EndRecordingIcon.svg';
import PauseIcon from '@svgs/audio-bar/PauseIcon.svg';
import PlayIcon from '@svgs/audio-bar/PlayIcon.svg';
import StartRecordingIcon from '@svgs/audio-bar/StartRecordingIcon.svg';

export enum AudioBarState {
  START_RECORDING = 'START_RECORDING',
  STOP_RECORDING = 'STOP_RECORDING',
  PAUSE = 'PAUSE',
  PLAY = 'PLAY',
}

interface AudioBarIconsProps {
  state: AudioBarState;
  width?: string | number;
  height?: string | number;
}

const AudioBarIcons = ({ state }: AudioBarIconsProps) => {
  switch (state) {
    case AudioBarState.START_RECORDING:
      return <StartRecordingIcon />;
    case AudioBarState.STOP_RECORDING:
      return <EndRecordingIcon />;
    case AudioBarState.PAUSE:
      return <PauseIcon />;
    case AudioBarState.PLAY:
      return <PlayIcon />;
    default:
      return null;
  }
};

export default AudioBarIcons;
