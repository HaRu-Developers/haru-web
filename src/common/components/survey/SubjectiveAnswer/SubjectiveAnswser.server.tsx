import ChartContainer from '@common/components/survey/ChartContainer/ChartContainer.server';

import { SubjectiveAnswersProps } from './SubjectiveAnswer.types';

const SubjectiveAnswers = ({ title, answers }: SubjectiveAnswersProps) => {
  return (
    <ChartContainer title={title}>
      <div className="flex w-full flex-col gap-1">
        {answers.map((answer, index) => (
          <div key={index} className="rounded-5pxr py-5pxr bg-gray-600 px-3">
            <p className="text-b3-rg text-black">{answer}</p>
          </div>
        ))}
      </div>
    </ChartContainer>
  );
};
export default SubjectiveAnswers;
