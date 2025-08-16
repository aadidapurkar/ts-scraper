import { JSDOM } from "jsdom";
import { argv } from "node:process"; // first arg - pathname of executable, second arg - path to js file being executed, 3+ -- provided by user

export const crawlPage = async (
  base: string,
  curr: string = base,
  pages: Record<string, number> = {}
) : Promise<Record<string, number>> => {
    const links = getURLsFromHTML(curr, base);

    // Base case
    if (curr != base) {
        console.log("Base case -- returning")
        return pages
    // Recursive case
    } else {
        console.log("Recursive case")
        const normCurr = normalizeURL(curr);

        if (pages.hasOwnProperty(normCurr)) {
            pages[normCurr] += 1;
        } else {
            pages[normCurr] = 1
        }

        const htmlText = await getHTML(curr);
        //console.log(htmlText);

        // Recursive calls
        const links = getURLsFromHTML(htmlText, base);
        console.log(`Found ${links.length} recursive calls`)
        for(let i = 0; i < links.length; i++){
            console.log(`Making a recursive call to ${links[i]}`)
            return crawlPage(base, links[i], pages)
        }
    }
    return pages
};
export const getHTML = async (url: string): Promise<string> => {
  const res = await fetch(url);

  if (res.status > 400) {
    console.log("Error");
    return "";
  } else if (!res.headers.get("content-type")!.includes("text/html")) {
    console.log("Error");
    return "";
  } else {
    const text = await res.text();
    //console.log(text);
    return text;
  }
};

export const getURLsFromHTML = (html: string, baseURL: string): string[] => {
  const dom = new JSDOM(html);

  // returns special type not standard array - can't use array methods
  const anchors: NodeListOf<HTMLAnchorElement> =
    dom.window.document.querySelectorAll("a");

  let urls: string[] = [];

  for (let i = 0; i < anchors.length; i++) {
    let href = anchors[i].getAttribute("href");

    const isRelative =
      href !== null &&
      !(href.startsWith("http://") || href.startsWith("https://"));

    if (isRelative) {
      href = baseURL + href;
    }

    href ? urls.push(href) : console.log("no href for anchor");
  }

  return urls;
};

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

const main = async () => {
  if (argv.length === 3) {
    console.log(argv[2]);
    //process.exit(0);
  } else {
    process.exit(1);
  }

  const BASE_URL = argv[2];

  //await getHTML(BASE_URL);
  const pages = await crawlPage(BASE_URL);
  console.log(pages)
};

main();
