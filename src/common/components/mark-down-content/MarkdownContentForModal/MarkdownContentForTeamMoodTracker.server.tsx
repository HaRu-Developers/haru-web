import clsx from 'clsx';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { MarkdownContentProps } from '../MarkdownContent.types';

const MARKER = '[mb22]';

const MarkdownContentForModal = ({ content }: MarkdownContentProps) => {
  console.log(content);
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ node, ...props }) => <h1 className="text-t2-bd whitespace-pre-line" {...props} />,
        h2: ({ node, ...props }) => (
          <h2 className="text-t4-bd mb-22pxr whitespace-pre-line" {...props} />
        ),
        h3: ({ node, ...props }) => (
          <h3 className="text-t5-sb mb-3pxr whitespace-pre-line" {...props} />
        ),
        h4: ({ node, children, ...props }) => {
          const text = String(children);
          const isMarker = text.includes(MARKER);
          return (
            <h4
              className={clsx('text-b4-rg whitespace-pre-line', isMarker && 'mb-22pxr')}
              {...props}
            >
              {text.replace(MARKER, '')}
            </h4>
          );
        },
        p: ({ node, ...props }) => <p className="text-b4-rg whitespace-pre-line" {...props} />,
        li: ({ node, ...props }) => <li className="ml-6 list-disc" {...props} />,
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownContentForModal;
