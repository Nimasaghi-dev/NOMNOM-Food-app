/**
 * This file will be imported in all tests automatically by Jest
 */

// jsdom does not provide TextEncoder/TextDecoder, which react-router v7 needs.
import { TextEncoder, TextDecoder } from "util";
global.TextEncoder = global.TextEncoder || TextEncoder;
global.TextDecoder = global.TextDecoder || TextDecoder;

// For react-testing-library, it will be the DOM mock
import "@testing-library/jest-dom";

// Make it automatically mock fetch requests. Docs: https://www.npmjs.com/package/jest-fetch-mock
import jestFetchMock from "jest-fetch-mock";
jestFetchMock.enableMocks();
