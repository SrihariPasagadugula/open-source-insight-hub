export type SortBy = "none" | "stars" | "forks" | "updated";

export function isValidSort(value: string | null): value is SortBy {
  return (
    value === "none" ||
    value === "stars" ||
    value === "forks" ||
    value === "updated"
  );
}
