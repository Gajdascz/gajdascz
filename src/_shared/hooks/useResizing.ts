import { useEffect, useState } from "react";

export const useResizing = (t = 200) => {
  const [isResizing, setIsResizing] = useState(false);
  const [resizeTimeout, setResizeTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    const handleResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      setIsResizing(true);
      const timeout = setTimeout(() => setIsResizing(false), t);
      setResizeTimeout(timeout);
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimeout) clearTimeout(resizeTimeout);
    };
  }, [isResizing]);
  return { isResizing, windowSize };
};
