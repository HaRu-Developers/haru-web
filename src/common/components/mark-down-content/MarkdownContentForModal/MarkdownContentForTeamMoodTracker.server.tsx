import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { MarkdownContentProps } from '../MarkdownContent.types';

{
  /*
  
  임시 - 디자이너 문의 title, subtitle, headline, body 명시

  */
}

const MarkdownContentForModal = ({ content }: MarkdownContentProps) => {
  console.log(content);
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ node, ...props }) => <h1 className="whitespace-pre-line" {...props} />,
        h2: ({ node, ...props }) => <h2 className="text-t4-bd whitespace-pre-line" {...props} />,
        h3: ({ node, ...props }) => <h3 className="text-t5-sb whitespace-pre-line" {...props} />,
        h4: ({ node, ...props }) => <h4 className="text-b4-rg whitespace-pre-line" {...props} />, // ol 방지용
        p: ({ node, ...props }) => <p className="text-b4-rg whitespace-pre-line" {...props} />,
        li: ({ node, ...props }) => <li className="ml-6 list-disc" {...props} />,
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownContentForModal;
