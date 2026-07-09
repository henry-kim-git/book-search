import BasicIcon from "@/components/BasicIcon";
import Typography, { TYPO_STYLES } from "@/components/Typography";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { useState, type SubmitEvent } from "react";
import useSearchBook from "../../hooks/useSearchBook";
import type { SearchTarget } from "../../hooks/useSearchBook";
import TargetSelect from "./TargetSelect";

const DEFAULT_TARGET: SearchTarget = "title" as const;

function DetailSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [target, setTarget] = useState<SearchTarget>(DEFAULT_TARGET);
  const { searchBookList } = useSearchBook();

  const close = () => setIsOpen(false);
  const toggleOpen = () => setIsOpen((prev) => !prev);

  const containerRef = useOutsideClick<HTMLDivElement>(close, isOpen);

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const query = new FormData(event.currentTarget).get("query");
    if (typeof query !== "string") return;

    searchBookList(query.trim(), target);
    close();
  };

  return (
    <div ref={containerRef} className="relative my-1.75">
      <button onClick={toggleOpen} className="border-text-subtitle rounded-lg border p-2.5">
        <Typography type="Body-2" className="text-text-subtitle">
          상세검색
        </Typography>
      </button>
      {isOpen && (
        <form
          onSubmit={handleSubmit}
          className="absolute -bottom-3.75 left-1/2 w-90 -translate-x-1/2 translate-y-full rounded-lg px-8.5 pt-9 pb-8.5 shadow-[0_4px_14px_6px_rgba(151,151,151,0.15)]"
        >
          <button type="button" onClick={toggleOpen} className="absolute top-2.5 right-2.5">
            <BasicIcon iconType={{ type: "line", name: "close" }} size={20} className="text-[#B1B8C0]" />
          </button>
          <div className="mb-4 grid grid-cols-[100px_1fr] items-center gap-1">
            <TargetSelect value={target} onChange={setTarget} />
            <input
              placeholder="검색어 입력"
              name="query"
              maxLength={50}
              className={`${TYPO_STYLES["Body-2"]} border-palette-primary placeholder:text-text-subtitle h-9 border-b pb-1.5 pl-2`}
            />
          </div>
          <button type="submit" className="bg-palette-primary flex h-9 w-full items-center justify-center rounded-lg">
            <Typography type="Body-2" className="text-white">
              검색하기
            </Typography>
          </button>
        </form>
      )}
    </div>
  );
}

export default DetailSearch;
