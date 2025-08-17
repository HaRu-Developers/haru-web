import { LinkTextProps } from './LinkText.types';

const LinkText = ({ text, className }: LinkTextProps) => {
  return (
    <a
      href={text}
      target="_blank"
      rel="noopener noreferrer"
      className={`hover:underline ${className}`}
    >
      {text}
    </a>
  );
};

export default LinkText;
