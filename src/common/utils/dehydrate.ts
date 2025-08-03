/**
 * SSR에서 React Query 데이터를 미리 준비하고 직렬화하는 함수
 *
 * 동작 흐름:
 * 1. 서버에서 전달받은 prefetch 함수를 실행해,
 *    QueryClient 내부 캐시에 API 응답 데이터를 미리 저장한다.
 * 2. QueryClient 캐시를 dehydrate로 직렬화하여,
 *    클라이언트에 전달 가능한 JSON 형태로 변환한다.
 * 3. 클라이언트에서는 Hydrate로 이 직렬화된 상태를 복원하여,
 *    QueryClient 캐시에 그대로 주입한다.
 *
 * 결과:
 * - 클라이언트의 useQuery 훅은 추가 API 요청 없이
 *   서버에서 준비한 캐시 데이터를 즉시 사용한다.
 * - 첫 렌더링에서 깜박임 없이 데이터를 표시할 수 있다.
 */
import { DehydratedState, QueryClient, dehydrate } from '@tanstack/react-query';

interface DehydrationOptions {
  // 쿼리 클라이언트 설정 다르게 하려면
  queryClient?: QueryClient;
  // 원하는 prefetch 함수: 내부에서 여러 쿼리 실행 가능
  prefetch: (queryClient: QueryClient) => Promise<void>;
}

// 서버에서 데이터를 미리 fetch해, 직렬화된 React Query 상태 반환
export const getDehydratedState = async ({
  queryClient = new QueryClient(),
  prefetch,
}: DehydrationOptions): Promise<{
  dehydratedState: DehydratedState;
  queryClient: QueryClient;
}> => {
  await prefetch(queryClient);
  const dehydratedState = dehydrate(queryClient); // React Query 캐시 직렬화

  return { dehydratedState, queryClient };
};
