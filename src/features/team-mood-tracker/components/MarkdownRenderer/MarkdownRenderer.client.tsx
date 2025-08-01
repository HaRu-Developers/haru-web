'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { MarkdownRendererProps } from './MarkdownRenderer.types';

const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
  return (
    <div className="w-668pxr">
      <ReactMarkdown
        // remarkGfm 플러그인을 사용하여 테이블, 취소선 등 확장 문법을 지원합니다.
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ node, ...props }) => <h1 className="my-4 text-2xl font-bold" {...props} />,
          h2: ({ node, ...props }) => <h2 className="my-3 text-xl font-semibold" {...props} />,
          h3: ({ node, ...props }) => <h3 className="my-2 text-lg font-semibold" {...props} />,
          p: ({ node, ...props }) => <p className="my-1 text-base leading-relaxed" {...props} />,
          li: ({ node, ...props }) => <li className="ml-6 list-disc" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
