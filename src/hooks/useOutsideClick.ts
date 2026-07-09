import { useEffect, useRef, type RefObject } from "react";

export function useOutsideClick<T extends HTMLElement>(
  onOutsideClick: () => void,
  enabled = true
): RefObject<T | null> {
  const ref = useRef<T>(null);
  const onOutsideClickRef = useRef(onOutsideClick);
  onOutsideClickRef.current = onOutsideClick;

  useEffect(() => {
    if (!enabled) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onOutsideClickRef.current();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [enabled]);

  return ref;
}
