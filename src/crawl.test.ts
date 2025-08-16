import {expect, test} from 'vitest'
import { normalizeURL } from './crawl'


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

