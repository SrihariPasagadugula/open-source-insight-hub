export interface GithubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string | null;
  updated_at: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface SearchRepositoriesResponse {
  total_count: number;
  incomplete_results: boolean;
  items: GithubRepository[];
}

const BASE_URL = "https://api.github.com";
const SEARCH_REPOS_ENDPOINT = "/search/repositories";
const PER_PAGE = 30;

export class GithubApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export async function searchRepositories(
  query: string,
  page: number,
): Promise<{ items: GithubRepository[]; totalCount: number }> {
  const url = new URL(`${BASE_URL}${SEARCH_REPOS_ENDPOINT}`);
  url.searchParams.set("q", query);
  url.searchParams.set("page", String(page + 1));
  url.searchParams.set("per_page", String(PER_PAGE));

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new GithubApiError("Failed to fetch repositories", response.status);
  }

  const data: SearchRepositoriesResponse = await response.json();

  return {
    items: data.items,
    totalCount: data.total_count,
  };
}
