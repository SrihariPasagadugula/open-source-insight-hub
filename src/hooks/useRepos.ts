import { useState, useCallback } from "react";
import { searchRepositories, GithubApiError } from "../api/githubApi";
import type { GithubRepository } from "../api/githubApi";

export function useRepos() {
  const [repos, setRepos] = useState<GithubRepository[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<GithubApiError | null>(null);
  const [page, setPage] = useState(0);

  const fetchRepos = useCallback(
    async (query: string, page: number) => {
      if (loading) return;

      if (page === 0) {
        setRepos([]);
        setTotalCount(0);
      }
      setLoading(true);
      setError(null);

      try {
        const { items, totalCount } = await searchRepositories(query, page);
        setRepos((prev) => (page === 0 ? items : [...prev, ...items]));
        setTotalCount(totalCount);
        setPage(page);
      } catch (err) {
        if (err instanceof GithubApiError) {
          setError(err);
        } else {
          setError(new GithubApiError("Unexpected error occurred", 0));
        }
      } finally {
        setLoading(false);
      }
    },
    [loading],
  );

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
