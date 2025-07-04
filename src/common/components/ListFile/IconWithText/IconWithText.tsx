import { SVGProps } from 'react';

const IconWithText = ({
  icon: Icon,
  text,
  className = '',
}: {
  icon: React.ComponentType<SVGProps<SVGSVGElement>>;
  text: string | number;
  className?: string;
}) => (
  <div className={`text-body-3-rg flex items-center text-gray-200 ${className}`}>
    <Icon width="20px" height="20px" className="mr-1" />
    <span>{text}</span>
  </div>
);

export default IconWithText;
