import useSearchInput from '@app/hooks/useSearchInput';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  searchPlaceholder: 'Search Movies & TV',
});

const SearchInput = () => {
  const intl = useIntl();
  const { searchValue, setSearchValue, setIsOpen, clear } = useSearchInput();
  const [searchQuery, setSearchQuery] = useState(searchValue);
  return (
    <div className="flex flex-1">
      <div className="flex w-full gap-2">
        <label htmlFor="search_field" className="sr-only">
          Search
        </label>
        <div className="relative flex w-full items-center text-white focus-within:text-gray-200">
          <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
            <MagnifyingGlassIcon className="h-5 w-5" />
          </div>
          <input
            id="search_field"
            style={{ paddingRight: searchValue.length > 0 ? '1.75rem' : '' }}
            className="block w-full rounded-full border border-gray-600 bg-gray-900 bg-opacity-80 py-2 pl-10 text-white placeholder-gray-300 hover:border-gray-500 focus:border-gray-500 focus:bg-opacity-100 focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-base"
            placeholder={intl.formatMessage(messages.searchPlaceholder)}
            type="search"
            autoComplete="off"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
            onBlur={() => {
              if (searchValue === '') {
                setIsOpen(false);
              }
            }}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                if (searchQuery) setSearchValue(searchQuery);
                else clear();
              }
            }}
          />
          {searchValue.length > 0 && (
            <button
              className="absolute inset-y-0 right-2 m-auto h-7 w-7 border-none p-1 text-gray-400 outline-none transition hover:text-white focus:border-none focus:outline-none"
              onClick={() => {
                clear();
                setSearchQuery('');
              }}
            >
              <XCircleIcon className="h-5 w-5" />
            </button>
          )}
        </div>
        <button
          className="focus:ring-indigo button-md inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md border border border-indigo-500 bg-indigo-600 bg-opacity-80 px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out hover:border-indigo-500 hover:bg-opacity-100 focus:border-indigo-700 focus:outline-none active:border-indigo-700 active:bg-opacity-100 disabled:opacity-50"
          onClick={() => {
            if (searchQuery) {
              setIsOpen(true);
              setSearchValue(searchQuery);
            } else clear();
          }}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
