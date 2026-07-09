import { useState } from "react";
import BasicIcon from "@/components/BasicIcon";
import Typography from "@/components/Typography";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { type SearchTarget } from "../../hooks/useSearchBook";

type TargetOption = {
  name: string;
  value: SearchTarget;
};

const TARGET_OPTIONS: TargetOption[] = [
  { name: "제목", value: "title" },
  { name: "저자명", value: "person" },
  { name: "출판사", value: "publisher" }
] as const;

type Props = {
  value: SearchTarget;
  onChange: (value: SearchTarget) => void;
};

function TargetSelect({ value, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const close = () => setIsOpen(false);
  const toggleOpen = () => setIsOpen((prev) => !prev);

  const containerRef = useOutsideClick<HTMLDivElement>(close, isOpen);

  const selectedOption = TARGET_OPTIONS.find((option) => option.value === value) ?? TARGET_OPTIONS[0];
  const unselectedOptions = TARGET_OPTIONS.filter((option) => option.value !== value);

  const handleSelect = (option: TargetOption) => {
    onChange(option.value);
    close();
  };

  return (
    <div ref={containerRef} className="relative">
      <input type="hidden" name="target" value={value} readOnly />
      <button
        type="button"
        onClick={toggleOpen}
        className="grid h-9 w-full cursor-pointer grid-cols-[1fr_min-content] items-center border-b border-[#D2D6DA] pr-1 pb-1.5 pl-2"
      >
        <Typography type="Body-2-B" className="text-left">
          {selectedOption.name}
        </Typography>
        <BasicIcon iconType={{ type: "line", name: "chevronDown" }} size={20} className="text-[#B1B8C0]" />
      </button>
      {isOpen && (
        <ul className="absolute -bottom-1.5 left-1/2 w-full -translate-x-1/2 translate-y-full bg-white shadow-[0_0_4px_0_rgba(0,0,0,0.25)]">
          {unselectedOptions.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                onClick={() => handleSelect(option)}
                className="flex h-7.5 w-full items-center px-2"
              >
                <Typography type="Body-2" className="text-text-subtitle">
                  {option.name}
                </Typography>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TargetSelect;
