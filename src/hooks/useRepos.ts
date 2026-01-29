import { useState, useCallback } from "react";
import { searchRepositories, GithubApiError } from "../api/githubApi";
import type { GithubRepository } from "../api/githubApi";

export function useRepos() {
  const [repos, setRepos] = useState<GithubRepository[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<GithubApiError | null>(null);

  const fetchRepos = useCallback(async (query: string, page: number) => {
    setLoading(true);
    setError(null);

    try {
      const { items, totalCount } = await searchRepositories(query, page);
      setRepos(items);
      setTotalCount(totalCount);
    } catch (err) {
      if (err instanceof GithubApiError) {
        setError(err);
      } else {
        setError(new GithubApiError("Unexpected error occurred", 0));
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    repos,
    totalCount,
    loading,
    error,
    fetchRepos,
  };
}
