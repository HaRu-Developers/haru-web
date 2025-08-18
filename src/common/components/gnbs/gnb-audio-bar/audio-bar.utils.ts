/**
 * ms 단위로 주어지는 시간을 'mm:ss' 형식으로 포맷팅하는 함수
 */
export const formatAudioProgress = (time: number | undefined | null) => {
  if (time === undefined || time === null) {
    console.log('Invalid time value:', time);
    return '--:--';
  }

  const formattedTime = [
    Math.floor((time % 3600000) / 60000), // minutes
    Math.floor((time % 60000) / 1000), // seconds
  ]
    .map((v) => (v < 10 ? '0' + v : v))
    .join(':');

  return formattedTime;
};
