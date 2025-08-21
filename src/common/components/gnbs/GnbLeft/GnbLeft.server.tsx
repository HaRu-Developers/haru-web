'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import HaruLogoIcons from '@icons/logos/HaruLogoIcons/HaruLogoIcons';
import { HaruLogoIconsState } from '@icons/logos/HaruLogoIcons/HaruLogoIcons.types';

import { GnbLeftNavItems } from '@common/constants/gnbs.constants';
import { ROUTES } from '@common/constants/routes.constants';

import { GnbLeftProps } from './GnbLeft.types';
import NavItem from './NavItem/NavItem.client';
import RecentDocumentsSection from './RecentDocumentsSection/RecentDocumentsSection.client';
import WorkSpaceProfile from './WorkspaceProfile/WorkspaceProfile.client';

/**
 * isNumberString 함수
 * 문자열이 숫자로만 이루어져 있는지 확인합니다.
 * @param str - 확인할 문자열
 * @returns - 문자열이 숫자로만 이루어져 있으면 true,
 */
const isNumericString = (str: string | null) => {
  if (str === null) return true; // null이면 ture 반환
  return /^-?\d+$/.test(str);
};

const GnbLeft = ({ workspaceId }: GnbLeftProps) => {
  const router = useRouter();
  // NaN이면 not-found.tsx로 이동
  if (!isNumericString(workspaceId)) {
    router.replace(ROUTES.NOT_FOUND);
  }

  // Server Component에서 prefetch 실행
  // workspaceId가 있을 때만 prefetch
  // let dehydratedState: DehydratedState | undefined;

  // if (workspaceId != null) {
  //   try {
  //     const { dehydratedState: state } = await getDehydratedState({
  //       prefetch: async (qc) => {
  //         // detail을 ensureQueryData로 "먼저" 확인 (여기서 throw 나면 catch로 감)
  //         await qc.ensureQueryData({
  //           queryKey: queryKeys.workspaces.detail(workspaceId).queryKey,
  //           queryFn: () => fetchWorkspaceDetail({ workspaceId }),
  //         });

  //         // 통과했다면 나머지는 병렬 프리패치
  //         await Promise.all([
  //           qc.prefetchQuery({
  //             queryKey: queryKeys.user.detail().queryKey,
  //             queryFn: fetchUserDetail,
  //           }),
  //           qc.prefetchQuery({
  //             queryKey: queryKeys.workspaces.myWorkspaces.queryKey,
  //             queryFn: fetchMyWorkspaces,
  //           }),
  //           qc.prefetchQuery({
  //             queryKey: queryKeys.workspaces.recentDocuments(workspaceId).queryKey,
  //             queryFn: () => fetchRecentDocuments({ workspaceId }),
  //           }),
  //         ]);
  //       },
  //     });

  //     dehydratedState = state;
  //   } catch (err) {
  //     if (isWorkspaceNotFound(err)) notFound(); // 서버에서만 사용
  //     throw err;
  //   }
  // }

  return (
    <div className="border-stroke-200 p-16pxr flex w-60 shrink-0 flex-col border-r border-solid">
      <Link href={ROUTES.WORKSPACE_MAIN()} className="inline-block w-fit">
        <HaruLogoIcons
          state={HaruLogoIconsState.MIXED}
          className="w-99pxr h-24pxr mb-8pxr mt-5pxr ml-5pxr"
        />
      </Link>
      {/* <HydrationBoundary state={dehydratedState}> */}
      {/* 워크스페이스 프로필, 내부 모달을 여는 것도 해당 컴포넌트에 책임이 있음 (워크스페이스 목록 등) */}
      <WorkSpaceProfile workspaceId={workspaceId} />
      <div className="gap-16pxr flex flex-col">
        <div className="rounded-10pxr flex flex-col items-start gap-2 self-stretch">
          {GnbLeftNavItems.map((item) => (
            <NavItem key={item} item={item} workspaceId={workspaceId} />
          ))}
        </div>
        <div className="bg-stroke-200 h-1pxr w-full shrink-0"></div>
      </div>
      {workspaceId != null && <RecentDocumentsSection workspaceId={workspaceId} />}
      {/* </HydrationBoundary> */}
    </div>
  );
};

export default GnbLeft;
