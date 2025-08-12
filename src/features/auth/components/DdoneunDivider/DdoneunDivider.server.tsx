import clsx from 'clsx';

interface DdoneunDividerProps {
  className?: string;
}
const DdoneunDivider = ({ className }: DdoneunDividerProps) => {
  return (
    <div className={clsx('gap-x-10pxr flex w-full flex-row items-center', className)}>
      <div className="bg-stroke-200 h-px flex-grow" />
      <span className="mx-10pxr text-cap2-rg text-gray-300">또는</span>
      <div className="bg-stroke-200 h-px flex-grow" />
    </div>
  );
};

export default DdoneunDivider;
