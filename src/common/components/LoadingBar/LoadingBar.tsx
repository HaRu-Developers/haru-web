import { motion } from 'framer-motion';

const LoadingBar = () => {
  return (
    <div className="relative h-[7px] w-80 overflow-hidden bg-gray-700">
      <motion.div
        className="absolute top-0 left-0 h-full w-full"
        style={{
          backgroundImage: 'linear-gradient(to right, #0075ff, #00a3ff 48.4375%, #00ffff)',
          transformOrigin: 'left',
        }}
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: [0, 1, 1], opacity: [1, 1, 0] }}
        transition={{
          duration: 1.7,
          repeat: Infinity,
          ease: 'easeInOut',
          times: [0, 0.7, 1],
        }}
      />
    </div>
  );
};

export default LoadingBar;
