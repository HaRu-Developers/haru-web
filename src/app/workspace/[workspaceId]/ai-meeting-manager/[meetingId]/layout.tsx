import GnbTopTitle from '@features/ai-meeting-manager/components/GnbTopTitle/GnbTopTitle.client';

const AiMeetingLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { meetingId: string };
}) => {
  const { meetingId } = await params;

  // // 서버에서 meeting detail을 ensureQueryData로 가져오며, 성공 시 캐시에 저장 + 이 컴포넌트에서 즉시 사용
  // let title = '';
  // let dehydratedState: DehydratedState | undefined;
  // try {
  //   const result = await getDehydratedState({
  //     prefetch: async (qc) => {
  //       // 필수 데이터 보장 (없으면 throw → catch에서 notFound)
  //       const res = await qc.ensureQueryData<BaseResponseDto<FetchMeetingMinutesDetailResponseDto>>(
  //         {
  //           queryKey: queryKeys.meetings.detail(meetingId).queryKey,
  //           queryFn: () => fetchMeetingMinutesDetail({ meetingId }),
  //         },
  //       );
  //       title = res.result.title;
  //     },
  //   });
  //   dehydratedState = result.dehydratedState;
  // } catch (e) {
  //   if (isMeetingNotFound(e)) notFound(); // 서버에서만 사용
  //   throw e; // 다른 에러는 상위로 던짐
  // }

  return (
    // <HydrationBoundary state={dehydratedState}>
    <>
      <GnbTopTitle meetingId={meetingId} />
      <main className="h-[calc(100%-var(--gnb-top-height))]">{children}</main>
    </>
    // </HydrationBoundary>
  );
};

export default AiMeetingLayout;
