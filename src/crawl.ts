import { JSDOM } from 'jsdom'
import { argv } from 'node:process'; // first arg - pathname of executable, second arg - path to js file being executed, 3+ -- provided by user

export const getHTML = async (url : string) => {
    const res = await fetch(url);
    
    if (res.status > 400 ) {
        console.log("Error");
        return;
    } else if (!res.headers.get("content-type")!.includes("text/html")) {
        console.log("Error");
        return;
    } else {
            //const dom = new JSDOM(await res.text());
            //console.log(dom.window.document.querySelector("body"))
            console.log(await res.text())
    }
}

export const getURLsFromHTML = (html : string, baseURL : string) : string[] => {
    const dom = new JSDOM(html);
    
    // returns special type not standard array - can't use array methods
    const anchors : NodeListOf<HTMLAnchorElement> = dom.window.document.querySelectorAll('a');

    let urls : string[] = [];

    for(let i=0; i < anchors.length; i++) {
        let href = anchors[i].getAttribute("href");

        const isRelative = href !== null && !(href.startsWith("http://") || href.startsWith("https://"));
        
        if (isRelative) {
            href = baseURL + href;
        };

        href ? urls.push(href) : console.log("no href for anchor")
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

    if(argv.length === 3) {
        console.log(argv[2]);
        //process.exit(0);
    } else {
        process.exit(1);
    }

    const BASE_URL = argv[2];

    await getHTML(BASE_URL)
};

main();