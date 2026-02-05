export function getParam(name: string) {
  return new URLSearchParams(window.location.search).get(name);
}
