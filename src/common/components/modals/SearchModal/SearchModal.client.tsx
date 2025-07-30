'use client';

import { useState } from 'react';

import IndividualIcons from '@icons/IndividualIcons/IndividualIcons';
import { IndividualIconsState } from '@icons/IndividualIcons/IndividualIcons.types';

import RecentSearchChip from './RecentSearchChip/RecentSearchChip.client';
import { SearchResult } from './SearchModal.types';
import SearchResultCard from './SearchResultCard/SearchResultCard.server';
import { mockRecentQueries, mockSearchResults } from './search-modal-mock-data';

const SearchModal = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  // TODO: 추후 빈배열로 변경 필요 (mock Data)
  const [searchResults, setSearchResults] = useState<SearchResult[]>(mockSearchResults);
  const [recentQuery, setRecentQuery] = useState<string[]>(mockRecentQueries);

  const handleSearch = () => {
    // Simulate a search operation
    if (searchQuery && !recentQuery.includes(searchQuery)) {
      setRecentQuery((prev) => [...prev, searchQuery]);
    }
  };

  const handleRemoveRecentQuery = (index: number) => {
    setRecentQuery((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="shadow-modal rounded-12pxr w-800pxr h-527pxr flex flex-col items-center">
      {/* 상단 검색 input 부분 */}
      <div className="border-stroke-200 h-58pxr px-16pxr pt-4pxr gap-x-8pxr rounded-t-12pxr flex w-full flex-row items-center justify-center border-b-1 bg-white">
        <IndividualIcons state={IndividualIconsState.SEARCH} />
        <input
          type="text"
          placeholder="제목으로 검색해 보세요."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onSubmit={handleSearch}
          // TODO: text style 피그마 상에서 타이포그래피 결정되면 그걸로 변경
          className="text-b3-md py-7pxr px-9pxr flex-grow outline-none"
        />
      </div>

      {/* 최근 검색 칩 부분 */}
      {recentQuery?.length > 0 && (
        <div className="gap-x-8pxr px-16pxr mt-14pxr mb-10pxr flex w-full flex-row flex-wrap items-start justify-start">
          {recentQuery.map((query, index) => (
            <RecentSearchChip
              key={index}
              text={query}
              onClose={() => handleRemoveRecentQuery(index)}
            />
          ))}
        </div>
      )}

      {/* 검색 결과 부분 */}
      <div className="gap-y-8pxr mt-10pxr px-16pxr flex min-h-0 w-full flex-grow flex-col items-start justify-start">
        <span className="px-10pxr text-bt3-sb w-full flex-shrink-0 text-gray-400">검색 결과</span>
        <div className="scrollbar-component flex min-h-0 w-full flex-grow flex-col items-center justify-start overflow-y-auto">
          {searchResults.map((result, index) => {
            return (
              <SearchResultCard
                key={index}
                fileType={result.fileType}
                title={result.title}
                lastOpened={result.lastOpened} // Example date, replace with actual logic
              />
            );
          })}
        </div>
      </div>
      {/* 최하단 - N개의 검색 결과 */}

      <div className="mt-8pxr w-full">
        <div className="text-cap2-md h-36pxr mx-12pxr px-4pxr py-10pxr border-stroke-200 items-center justify-center border-t-1 text-gray-400">
          {searchResults.length}개의 검색 결과
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
