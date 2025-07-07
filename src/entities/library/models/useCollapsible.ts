import {
  useState,
  useRef,
  useLayoutEffect,
  useCallback,
  useEffect,
} from "react";

export function useCollapsible(extraDeps: unknown[] = []) {
  const [open, setOpen] = useState(false);
  const innerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  const toggle = useCallback(() => setOpen((o) => !o), []);
  const calcHeight = useCallback(() => {
    if (!innerRef.current) return;
    setHeight(open ? innerRef.current.scrollHeight : 0);
  }, [open]);

  const depsKey = extraDeps.map(String).join("|");

  useLayoutEffect(calcHeight, [open, calcHeight]);
  useLayoutEffect(calcHeight, [calcHeight, depsKey]);

  useEffect(() => {
    if (!open) return;
    const el = innerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(calcHeight);
    ro.observe(el);
    return () => ro.disconnect();
  }, [open, calcHeight]);

  return { open, toggle, height, innerRef };
}
