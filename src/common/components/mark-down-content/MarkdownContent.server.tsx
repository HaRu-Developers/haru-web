import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { FileType } from '@common/types/file-type.enum';

import { MarkdownContentProps } from './MarkdownContent.types';

{
  /*
  
 ol 이 적용이 되지 않음 - 협의 필요

 */
}

const MarkdownContent = ({ content, variant }: MarkdownContentProps) => {
  const titleMaxWidth = variant === FileType.AI_MEETING_MANAGER ? 'max-w-1096pxr' : 'max-w-668pxr';
  const titleClassName = `text-t4-bd ${titleMaxWidth} py-4-5pxr mb-3pxr mt-24pxr`;

  const pClassName = 'text-b2-rg max-w-628pxr py-2pxr mb-3pxr';

  return (
    <div className="mb-50pxr">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ node, ...props }) => <h1 className={titleClassName} {...props} />,
          h2: ({ node, ...props }) => <h2 className={titleClassName} {...props} />,
          h3: ({ node, ...props }) => <h3 className={titleClassName} {...props} />,
          h4: ({ node, ...props }) => <h4 className={titleClassName} {...props} />,
          p: ({ node, ...props }) => <p className={pClassName} {...props} />,
          ul: ({ children }) => <ul className="pl-20pxr list-outside list-disc">{children}</ul>,
          ol: ({ children }) => <ol className="pl-20pxr list-outside list-decimal">{children}</ol>,
          li: ({ children }) => <li className="text-b2-rg py-2pxr">{children}</li>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownContent;
