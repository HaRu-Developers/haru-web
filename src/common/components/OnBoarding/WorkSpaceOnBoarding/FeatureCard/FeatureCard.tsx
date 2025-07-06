import { FeatureCardProps } from './FeatureCard.types';

const FeatureCard = ({ title, description, icon: Icon }: FeatureCardProps) => (
  <div className="shadow-calendar w-44 rounded-xl border border-gray-600 bg-white p-4">
    <div className="mb-2">
      <Icon width="32px" height="32px" />
    </div>
    <h3 className="text-t4-bd mb-0.5 text-gray-100">{title}</h3>
    <p className="text-b3-rg whitespace-pre-line text-gray-200">{description}</p>
  </div>
);

export default FeatureCard;
