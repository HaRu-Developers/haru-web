import LandingNecessityIcons from '@icons/LandingNecessityIcons/LandingNecessityIcons';

import { SectionLayoutProps } from './SectionLayout.types';

const SectionLayout = ({ state, title, description }: SectionLayoutProps) => {
  return (
    <div className="gap-14pxr pr-196pxr flex w-full flex-col items-start justify-center whitespace-pre-line">
      <LandingNecessityIcons state={state} />
      <div className="gap-12pxr flex flex-col">
        <span className="text-t2-bd text-black">{title}</span>
        <div>
          <div className="text-b2-rg whitespace-pre-line text-gray-200">{description}</div>
        </div>
      </div>
    </div>
  );
};

export default SectionLayout;
