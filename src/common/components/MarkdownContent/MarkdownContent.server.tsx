import ReactMarkdown from 'react-markdown';

import { MarkdownContentProps } from './MarkdownContent.types';

const MarkdownContent = ({ content }: MarkdownContentProps) => {
  console.log(content);
  return (
    <ReactMarkdown
      components={{
        h1: ({ node, ...props }) => <h1 className="whitespace-pre-line" {...props} />,
        h2: ({ node, ...props }) => <h2 className="text-t4-bd whitespace-pre-line" {...props} />,
        h3: ({ node, ...props }) => <h3 className="text-t5-sb whitespace-pre-line" {...props} />,
        h4: ({ node, ...props }) => <h4 className="text-b4-rg whitespace-pre-line" {...props} />, // ol 방지용
        p: ({ node, ...props }) => <p className="text-b4-rg whitespace-pre-line" {...props} />,
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownContent;
