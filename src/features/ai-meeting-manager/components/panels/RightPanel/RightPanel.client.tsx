'use client';

import { useMemo } from 'react';

import { useParams } from 'next/navigation';

import AiQuestionIcons from '@icons/AiQuestionIcons/AiQuestionIcons';
import { AiQuestionIconsState } from '@icons/AiQuestionIcons/AiQuestionIcons.types';

import useFetchMeetingMinutesSpeechQuestion from '@api/meeting/get/queries/useFetchMeetingMinutesSpeechQuestion';

import AiQuestionCard from '@common/components/AiQuestionCard/AiQuestionCard.client';
import CategoryOption from '@common/components/CategoryOption/CategoryOption.client';

import { DEFAULT_SPEECH_QUESTION } from '@features/ai-meeting-manager/constants/speechQuestion.constants';

import { useAiQuestions } from '@features/ai-meeting-manager/hooks/useAiQuestions';
import useMeetingSocket from '@features/ai-meeting-manager/hooks/useMeetingSocket';
import { usePrefillQuestionsFromServer } from '@features/ai-meeting-manager/hooks/usePrefillQuestionsFromServer';

import { mockData } from '@features/ai-meeting-manager/data/speechQuestionMock';

import { RightTabLabels } from './RightPanel.constants';
import { RightTabType } from './RightPanel.types';

const RightPanel = () => {
  const { meetingId, workspaceId } = useParams<{ meetingId: string; workspaceId: string }>();
  const { extra: { meetingStartTime, transcripts } = DEFAULT_SPEECH_QUESTION } =
    useFetchMeetingMinutesSpeechQuestion(meetingId);

  const { speeches } = useMeetingSocket({
    workspaceId,
    meetingId,
    meetingStartTime,
    initialTranscripts: transcripts,
  });

  usePrefillQuestionsFromServer(meetingId); // 초기 서버 질문 - 스토어에서 가져오기

  // const { questions, hasMeetingLog } = useAiQuestions();

  // // segmentId → text 매핑 (string 키로 통일)
  // const speechTextById = useMemo(() => {
  //   const rec: Record<string, string> = {};
  //   for (const s of speeches) rec[String(s.segmentId)] = s.text;
  //   return rec;
  // }, [speeches]);

  // speechId → text 매핑
  const speechTextById = useMemo(() => {
    const rec: Record<string, string> = {};
    for (const s of mockData.transcripts) rec[String(s.segmentId)] = s.text;
    return rec;
  }, []);

  // 질문 평탄화
  const questions = useMemo(
    () =>
      mockData.transcripts.flatMap((t) =>
        (t.aiQuestions ?? []).map((q) => ({
          id: `${t.segmentId}-${q.questionId}`,
          text: q.question,
          speechId: String(t.segmentId),
        })),
      ),
    [],
  );

  const hasMeetingLog = questions.length > 0;

  const label = hasMeetingLog
    ? RightTabLabels[RightTabType.AI_QUESTIONS]
    : RightTabLabels[RightTabType.AI_RECOMMENDATIONS];

  return (
    <section className="w-480pxr border-stroke-200 flex flex-col border-l border-solid">
      <div className="border-stroke-200 py-13pxr flex h-[var(--tab-height)] shrink-0 flex-col items-start justify-center gap-2.5 border-b border-solid bg-white px-5">
        <CategoryOption label={label} active />
      </div>
      {/* 목록 부분 */}
      <div className="scrollbar-component h-[calc(100dvh-var(--tab-height))] overflow-y-auto">
        {/* 설명 부분 */}
        <div className="gap-6pxr mt-36pxr mb-32pxr flex flex-col items-center">
          <div className="gap-3pxr flex items-center">
            <AiQuestionIcons state={AiQuestionIconsState.SIZE_18} />
            <h3 className="text-t3-sb text-black">HaRu AI 추천 질문</h3>
          </div>
          <h4 className="text-b4-rg text-gray-300">회의 내용에 맞춰 질문을 추천해 드려요.</h4>
        </div>
        {/* 추천 질문 부분 */}
        {hasMeetingLog && (
          <div className="gap-12pxr px-20pxr pb-76pxr flex flex-col">
            {questions.map((q) => (
              <AiQuestionCard
                key={q.id}
                speechId={q.speechId}
                aiRecommendQuestion={q.text}
                userAnswer={speechTextById[q.speechId]}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RightPanel;
