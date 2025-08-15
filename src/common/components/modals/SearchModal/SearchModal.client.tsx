'use client';

import { useEffect, useState } from 'react';

import { useParams, useRouter, useSearchParams } from 'next/navigation';

import clsx from 'clsx';

import IndividualIcons from '@icons/IndividualIcons/IndividualIcons';
import { IndividualIconsState } from '@icons/IndividualIcons/IndividualIcons.types';

import { ROUTES } from '@common/constants/routes.constants';

import useDebounce from '@common/hooks/useDebounce';

import { SearchedDocument } from '@/api/workspace/api.types';
import { useSearchDocumentsQuery } from '@/api/workspace/get/queries/useSearchDocumentQuery';

import RecentSearchChip from './RecentSearchChip/RecentSearchChip.client';
import { CONFIG, STORAGE_KEYS } from './SearchModal.types';
import SearchResultCard from './SearchResultCard/SearchResultCard.client';

const SearchModal = () => {
  const router = useRouter();
  const query = useSearchParams();
  const searchType = query.get('type') || 'default'; // 기본값은 'title'

  console.log('LOG: SEARCH MODAL TRIGGERED IN SECTION:', searchType);

  const { workspaceId } = useParams<{ workspaceId: string }>();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [recentQueries, setRecentQueries] = useState<string[]>([]);

  const debouncedSearchQuery = useDebounce(searchQuery, CONFIG.SEARCH_DEBOUNCE_MS);

  const { data: searchResults, isFetching } = useSearchDocumentsQuery({
    workspaceId,
    title: debouncedSearchQuery,
  });

  const documents = searchResults?.documents ?? [];

  useEffect(() => {
    const savedQueries = localStorage.getItem(STORAGE_KEYS.RECENT_SEARCHES);
    if (savedQueries) {
      setRecentQueries(JSON.parse(savedQueries));
    }
  }, []);

  const handleRemoveRecentQuery = (queryToRemove: string) => {
    const newQueries = recentQueries.filter((q) => q !== queryToRemove);
    setRecentQueries(newQueries);
    localStorage.setItem(STORAGE_KEYS.RECENT_SEARCHES, JSON.stringify(newQueries));
  };

  const handleChipClick = (query: string) => {
    setSearchQuery(query);
  };

  const handleSearchResultClick = (document: SearchedDocument) => {
    // 현재 input에 있는 검색어(searchQuery)가 비어있지 않을 때만 저장
    if (searchQuery.trim().length > 0) {
      const newQueries = [searchQuery, ...recentQueries.filter((q) => q !== searchQuery)].slice(
        0,
        CONFIG.MAX_RECENT_SEARCHES,
      );
      setRecentQueries(newQueries);
      localStorage.setItem(STORAGE_KEYS.RECENT_SEARCHES, JSON.stringify(newQueries));
    }

    /**
     * 검색 결과에 해당하는 문서의 링크를 생성합니다.
     */
    const pathGenerator = ROUTES.DETAIL_DOCUMENTS_DEFAULT[document.documentType];

    if (pathGenerator && workspaceId) {
      // 찾은 함수를 실행하여 경로와 쿼리 객체를 가져옵니다.
      const routeInfo = pathGenerator(workspaceId, document.documentId);
      // router.push에 객체를 직접 전달합니다.
      router.push(routeInfo);
    } else {
      console.error('알 수 없는 문서 타입 또는 workspaceId가 없습니다:', document.documentType);
    }
  };

  const isSearching = debouncedSearchQuery.trim().length > 0;
  const ShowRecentQueries = recentQueries.length > 0;

  return (
    <div
      className={clsx('shadow-modal rounded-12pxr w-800pxr flex flex-col items-center bg-white', {
        'h-527pxr': ShowRecentQueries,
        'h-479pxr': !ShowRecentQueries,
      })}
    >
      <div className="border-stroke-200 h-58pxr px-16pxr pt-4pxr gap-x-8pxr rounded-t-12pxr flex w-full flex-shrink-0 flex-row items-center justify-center border-b-1 bg-white">
        <IndividualIcons state={IndividualIconsState.SEARCH_SIZE_20} />
        <input
          type="text"
          placeholder="제목으로 검색해 보세요."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="text-t4-md py-7pxr flex-grow outline-none placeholder:text-gray-400"
        />
      </div>

      <div className="scrollbar-component flex min-h-0 w-full flex-grow flex-col items-start justify-start overflow-y-auto">
        {ShowRecentQueries && (
          <div className="gap-x-8pxr px-16pxr pt-14pxr pb-6pxr flex w-full flex-row flex-wrap items-start justify-start">
            {recentQueries.map((query, index) => (
              <RecentSearchChip
                key={index}
                text={query}
                onClick={() => handleChipClick(query)}
                onClose={() => handleRemoveRecentQuery(query)}
              />
            ))}
          </div>
        )}
        <div className="gap-y-8pxr px-16pxr pt-14pxr flex min-h-0 w-full flex-grow flex-col items-start justify-start">
          <span className="px-10pxr text-bt3-sb w-full flex-shrink-0 text-gray-400">검색 결과</span>
          <div className="flex min-h-0 w-full flex-grow flex-col items-start justify-start">
            {isSearching ? (
              documents.length > 0 ? (
                documents.map((result) => (
                  <SearchResultCard
                    key={result.documentId}
                    fileType={result.documentType}
                    title={result.title}
                    lastOpened={result.lastOpened}
                    onClick={() => handleSearchResultClick(result)}
                  />
                ))
              ) : (
                !isFetching && (
                  <div className="text-b2-rg pl-10pxr pt-14pxr text-gray-400">
                    일치하는 검색 결과가 없습니다.
                  </div>
                )
              )
            ) : (
              <div className="text-b2-rg pl-10pxr pt-14pxr text-gray-400">
                검색어에 해당하는 파일을 보여드려요.
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-8pxr w-full flex-shrink-0">
        <div className="text-cap2-md h-36pxr mx-12pxr px-4pxr py-10pxr border-stroke-200 items-center justify-center border-t-1 text-gray-400">
          {`${documents.length}개의 검색 결과`}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
