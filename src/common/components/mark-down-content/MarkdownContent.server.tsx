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
  const titleClassName = `text-t4-bd whitespace-pre-line ${titleMaxWidth} h-32pxr py-4-5pxr mb-3pxr mt-22pxr`;

  const pClassName = 'text-b2-rg max-w-628pxr py-2pxr mb-3pxr whitespace-pre-line ml-20pxr';

  const liContainerClassName = `ml-20pxr gap-14pxr mb-3pxr max-w-628pxr flex items-center h-30pxr`;

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
          li: ({ children }) => (
            <div className={liContainerClassName}>
              <div className="w-6pxr h-6pxr flex-shrink-0 rounded-full bg-black" />
              <span className="text-b2-rg py-2pxr flex-1 whitespace-pre-line">{children}</span>
            </div>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownContent;
