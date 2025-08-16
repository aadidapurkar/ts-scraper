import { JSDOM } from 'jsdom'

export const getURLsFromHTML = (html : string, baseURL : string) : string[] => {

}


export const normalizeURL = (url: string): string => {
  const removePrefix = (url: string, prefix: string) =>
    url.startsWith(prefix) ? url.slice(prefix.length) : url;

  const removeCaps = (url: string) => url.toLowerCase();

  const removeTrailingSlash = (url: string) =>
    url[url.length - 1] === "/" ? url.slice(0, url.length - 1) : url;

  return removeTrailingSlash(
    removeCaps(removePrefix(removePrefix(url, "http://"), "https://"))
  );
};
