'use client';

import ReactMarkdown from 'react-markdown';

import { MarkdownContentForProceedingProps } from './MarkdownContentForProceeding.type';

const MarkdownContentForProceeding = ({ content }: MarkdownContentForProceedingProps) => {
  return (
    <div className="md-proceeding w-full">
      <ReactMarkdown
        components={{
          h2: (p) => <h2 className="text-t4-bd" {...p} />,
          li: (p) => <li className="text-b2-rg text-gray-200" {...p} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownContentForProceeding;
