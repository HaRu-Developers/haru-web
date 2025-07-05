import { motion } from 'framer-motion';

import { ProgressBarProps } from './ProgressBar.types';

const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <div className="flex h-[49px] w-80 flex-col gap-[10px]">
      <div className="relative h-[7px] w-full overflow-hidden bg-gray-700">
        <motion.div
          className="bg-primary-gradient absolute top-0 left-0 h-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>
      <p className="text-b3-md text-center text-gray-200">{progress}% 완료</p>
    </div>
  );
};

export default ProgressBar;
