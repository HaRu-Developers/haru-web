'use client';

import type { ProceedingSection } from '@features/ai-meeting-manager/types/proceeding.types';

const ProceedingDoc = ({ sections }: { sections: ProceedingSection[] }) => {
  return (
    <div className="md-proceeding">
      {sections.map((sec, i) => (
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
      ))}
    </div>
  );
};

export default ProceedingDoc;
