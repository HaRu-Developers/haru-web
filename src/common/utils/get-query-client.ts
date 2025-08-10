/**
 * 서버, 클라이언트에 따라
 * QueryClient를 생성/관리하는 유틸
 */
import { QueryClient, defaultShouldDehydrateQuery, isServer } from '@tanstack/react-query';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1분
        gcTime: 5 * 60 * 1000, // 5분
        retry: false,
      },
      dehydrate: {
        // 쿼리를 직렬화할 때 포함할지 여부 결정하는 로직 - 요청 중인 쿼리도 포함
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) || query.state.status === 'pending',
        // Next.js 서버 에러는 건들지 않음 - Next가 자체적으로 가공함
        shouldRedactErrors: (error) => {
          return false;
        },
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (isServer) {
    // 서버 환경:
    // 매 요청마다 새로운 QueryClient 생성
    // 이유: 요청 간에 캐시가 공유되면 다른 사용자의 데이터가 섞이는 문제가 생김
    return makeQueryClient();
  } else {
    // 브라우저 환경:
    // 최초 렌더링 시에만 새 QueryClient 생성
    // 이후에는 기존 QueryClient를 재사용
    // 이유: 리렌더링 또는 React Suspense 발생 시마다
    // 새로 생성하면 캐시가 날아가므로 전역 유지 필요
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
