import { useEffect } from "react";

interface UseInfiniteScrollProps {
  hasMore: boolean;
  onLoadMore: () => void;
}

export function useInfiniteScroll({
  hasMore,
  onLoadMore,
}: UseInfiniteScrollProps) {
  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onLoadMore();
        }
      },
      {
        threshold: 1.0,
      },
    );

    const sentinel = document.getElementById("scroll-sentinel");
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasMore, onLoadMore]);
}
