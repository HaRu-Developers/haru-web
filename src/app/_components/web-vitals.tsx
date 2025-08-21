'use client';

import { useReportWebVitals } from 'next/web-vitals';

const logWebVitals = (metric: unknown) => {
  console.log(metric);
};

const WebVitals = () => {
  useReportWebVitals(logWebVitals);

  return null;
};

export default WebVitals;
