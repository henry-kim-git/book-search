import { useEffect, useRef, useState, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import BasicIcon from "@/components/BasicIcon";
import Typography, { TYPO_STYLES } from "@/components/Typography";
import { SEARCH_HISTORY_COOKIE, getCookie } from "@/utils/cookie";
import useSearchBook from "../../hooks/useSearchBook";

function SearchBox() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const currentQueryRef = useRef<string>("");
  const [history, setHistory] = useState<string[]>([]);
  const { searchBookList, query, deleteSearchHistory } = useSearchBook();

  useEffect(() => {
    if (inputRef.current) inputRef.current.value = query;
  }, [query]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const closeHistory = () => {
    setHistory([]);
  };

  const handleFocus = () => {
    try {
      const raw = getCookie(SEARCH_HISTORY_COOKIE);
      if (!raw) return;

      const history = JSON.parse(raw);
      if (Array.isArray(history)) setHistory(history);
    } catch {
      // TODO: Handle error
    }
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    const nextFocusedElement = event.relatedTarget;
    if (nextFocusedElement instanceof Node && containerRef.current?.contains(nextFocusedElement)) return;

    closeHistory();
    currentQueryRef.current = "";
  };

  const handleSearchBookList = (query: string) => {
    closeHistory();

    if (query && query === currentQueryRef.current) return;
    currentQueryRef.current = query;

    inputRef.current?.blur();
    searchBookList(query);
  };

  const handleHistoryClick = (item: string) => (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (inputRef.current) inputRef.current.value = item;
    handleSearchBookList(item);
  };

  const handleHistoryDelete = (item: string) => (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    deleteSearchHistory(item);
    setHistory((prev) => prev.filter((historyItem) => historyItem !== item));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;

    handleSearchBookList(event.currentTarget.value.trim());
  };

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-[min-content_1fr] items-center gap-3 rounded-3xl bg-[#F2F4F6] p-2.5"
      onClick={focusInput}
    >
      <BasicIcon iconType={{ type: "line", name: "search" }} size={30} />
      <input
        ref={inputRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        placeholder="검색어를 입력하세요"
        maxLength={50}
        className={`${TYPO_STYLES["Caption"]} placeholder:text-text-subtitle`}
      />
      {history.length > 0 && (
        <ul className="col-start-2 mr-3.5 mb-3.5 grid gap-4">
          {history.map((item) => (
            <li key={item} className="grid grid-cols-[1fr_min-content] items-center gap-4">
              <button onClick={handleHistoryClick(item)} className="min-w-0">
                <Typography
                  type="Caption"
                  className="text-text-subtitle overflow-hidden text-left text-ellipsis whitespace-nowrap"
                >
                  {item}
                </Typography>
              </button>
              <button aria-label="검색기록 삭제" onClick={handleHistoryDelete(item)}>
                <BasicIcon iconType={{ type: "line", name: "close" }} className="text-[#222]" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBox;
