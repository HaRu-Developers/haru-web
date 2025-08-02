import LandingNecessityIcons from '@icons/LandingNecessityIcons/LandingNecessityIcons';

import { SectionLayoutProps } from './SectionLayout.types';

const SectionLayout = ({ state, title, description1, description2 }: SectionLayoutProps) => {
  return (
    <div className="gap-14pxr w-733pxr pr-196pxr flex flex-col items-start justify-center">
      <LandingNecessityIcons state={state} />
      <div className="gap-12pxr flex flex-col">
        <span className="text-t2-bd text-black">{title}</span>
        <div>
          <div className="text-b2-rg text-gray-200">{description1}</div>
          {description2 && <div className="text-b2-rg text-gray-200">{description2}</div>}
        </div>
      </div>
    </div>
  );
};

export default SectionLayout;
