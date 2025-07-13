import { SurveyInSiteProps } from './SurveyInSite.types';

const SurveyInSite = ({ title, items }: SurveyInSiteProps) => {
  return (
    <div className="flex w-167 flex-col rounded-xl bg-gray-700 px-8 py-4">
      <div className="text-t4-bd text-primary mb-1">{title}</div>
      <div>
        {items.map((item, index) => (
          <div key={index} className="text-b1-rg ml-1.5 flex text-black">
            <span className="mr-1">{index + 1}.</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SurveyInSite;
