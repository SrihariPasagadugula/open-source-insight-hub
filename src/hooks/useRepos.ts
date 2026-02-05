import { useState, useCallback, useRef } from "react";
import { searchRepositories, GithubApiError } from "../api/githubApi";
import type { GithubRepository } from "../api/githubApi";

export function useRepos() {
  const [repos, setRepos] = useState<GithubRepository[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<GithubApiError | null>(null);
  const [page, setPage] = useState(0);

  const abortControllerRef = useRef<AbortController | null>(null);
  const requestIdRef = useRef(0);

  const fetchRepos = useCallback(async (query: string, page: number) => {
    abortControllerRef.current?.abort();

    const controller = new AbortController();
    abortControllerRef.current = controller;

    const requestId = ++requestIdRef.current;

    if (page === 0) {
      setRepos([]);
      setTotalCount(0);
    }
    setLoading(true);
    setError(null);

    try {
      const { items, totalCount } = await searchRepositories(
        query,
        page,
        controller.signal,
      );

      if (requestId === requestIdRef.current) {
        setRepos((prev) => (page === 0 ? items : [...prev, ...items]));
        setTotalCount(totalCount);
        setPage(page);
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        return;
      }
      if (requestId === requestIdRef.current) {
        if (err instanceof GithubApiError) {
          setError(err);
        } else {
          setError(new GithubApiError("Unexpected error occurred", 0));
        }
      }
    } finally {
      if (requestId === requestIdRef.current) {
        setLoading(false);
      }
    }
  }, []);

  const loadMore = useCallback(
    (query: string) => {
      if (loading) return;
      fetchRepos(query, page + 1);
    },
    [fetchRepos, loading, page],
  );

  const resetRepos = useCallback(() => {
    setRepos([]);
    setTotalCount(0);
    setError(null);
    setLoading(false);
  }, []);

  return {
    repos,
    totalCount,
    loading,
    error,
    fetchRepos,
    loadMore,
    resetRepos,
  };
}
