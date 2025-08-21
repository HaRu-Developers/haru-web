'use client';

import type { ProceedingSection } from '@features/ai-meeting-manager/types/proceeding.types';

const ProceedingDoc = ({ sections }: { sections: ProceedingSection[] }) => {
  // { items: [''], title: "" } 인 상태
  const isBlank = (s: string) => !s;
  const isEmptyItems = (arr: Array<string>) => arr.every((v) => isBlank(v));
  const isNoSections = (sections: ProceedingSection[]) => {
    const s = sections[0] ?? {};
    return isBlank(s.title) && isEmptyItems(s.items);
  };

  return (
    <div className="md-proceeding scrollbar-component h-[calc(100dvh_-_var(--gnb-top-height)_-_var(--meeting-header-height)_-_var(--tab-height)_-_24pxr)] w-full overflow-y-auto">
      {isNoSections(sections) ? (
        <p className="p-16pxr text-b2-rg text-gray-300">회의 진행 내용이 없습니다.</p>
      ) : (
        sections.map((sec, i) => (
          <section key={i}>
            <h2 className="text-t4-bd">{sec.title}</h2>
            {sec.items.length > 0 && (
              <ul>
                {sec.items.map((item, idx) => (
                  <li key={idx} className="text-b2-rg text-gray-200">
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))
      )}
    </div>
  );
};

export default ProceedingDoc;
