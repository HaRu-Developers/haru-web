export const mockData = {
  meetingStartTime: '2025-08-14T17:00:00.000Z',
  transcripts: [
    {
      segmentId: 101,
      speakerId: '1',
      text: '그럼 회비는 인당 25,000원으로 가정하고, 예산 구조를 항목별로 나눠봅시다.',
      startTime: '2025-08-14T17:01:15.100Z',
      aiQuestions: [
        {
          questionId: 201,
          question:
            '해당 금액에 법인세 외에 음료까지 포함되는 건가요? 아니면 순수 식사만 기준인가요?',
        },
      ],
    },
    {
      segmentId: 102,
      speakerId: '2',
      text: '좋아. 회비 예산이 320,000원이니까 잘 생각해서 산정해야 할 것 같네.',
      startTime: '2025-08-14T17:02:30.500Z',
      aiQuestions: [], //aiQuestion이 없을 수도 있음
    },
    {
      segmentId: 103,
      speakerId: '1',
      text: '네, 맞습니다. 식대, 교통비, 그리고 기타 비용으로 나눠서 계획을 세워보죠.',
      startTime: '2025-08-14T17:03:45.800Z',
      aiQuestions: [
        {
          questionId: 202,
          question: '기타 비용의 구체적인 항목에는 어떤 것들이 포함될 수 있을까요?',
        },
        {
          questionId: 203,
          question: '예상치 못한 지출을 대비한 예비비 항목도 고려해야 할까요?',
        },
      ],
    },
  ],
};
