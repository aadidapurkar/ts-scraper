import {expect, test} from 'vitest'
import { normalizeURL, getURLsFromHTML } from './crawl'

// Get URL's from HTML
test("Get all URLs from a HTML string", () => {
    const input1 = `<html>
    <body>
        <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
        <a href="/bye"><span>Bye</span></a>
    </body>
    </html>`;

    const input2 = "https://google.com";

    const output = getURLsFromHTML(input1, input2);

    const expectedOutput = [ 'https://blog.boot.dev', 'https://google.com/bye' ];

    expect(output).toEqual(expectedOutput);
})


// Normalize URL
test("Remove HTTPS Prefix", () => {
    const input = "https://google.com";
    const output = normalizeURL(input);
    const expectedOutput = "google.com";

    expect(output).toEqual(expectedOutput);
})

test("Remove HTTP Prefix", () => {
    const input = "http://google.com";
    const output = normalizeURL(input);
    const expectedOutput = "google.com";

    expect(output).toEqual(expectedOutput);
})

test("Remove Capitals", () => {
    const input = "http://GOOGLE.com";
    const output = normalizeURL(input);
    const expectedOutput = "google.com";

    expect(output).toEqual(expectedOutput);
})

test("Remove Trailing Slash", () => {
    const input = "http://google.com/";
    const output = normalizeURL(input);
    const expectedOutput = "google.com";

    expect(output).toEqual(expectedOutput);
})

