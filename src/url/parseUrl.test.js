import { parseUrl } from ".";

describe("parseUrl", () => {
  // 解析简单的URL
  test("parses a simple URL", () => {
    const url = "https://example.com/path?query=value";
    const result = parseUrl(url);
    expect(result).toEqual({
      protocol: "https",
      host: "example.com",
      path: "/path",
      queryParams: { query: "value" },
    });
  });

  // 使用非默认端口解析URL
  test("parses a URL with a non-default port", () => {
    const url = "https://example.com:8080/path?query=value";
    const result = parseUrl(url);
    expect(result).toEqual({
      protocol: "https",
      host: "example.com:8080",
      path: "/path",
      queryParams: { query: "value" },
      port: "8080",
    });
  });

  // 在查询参数中使用JSON解析URL
  test("parses a URL with JSON in query parameters", () => {
    const url = 'https://example.com/path?data={"key":"value"}';
    const result = parseUrl(url);
    expect(result).toEqual({
      protocol: "https",
      host: "example.com",
      path: "/path",
      queryParams: { data: { key: "value" } },
    });
  });

  // 使用默认端口解析URL
  test("parses a URL with default port", () => {
    const url = "http://example.com/path";
    const result = parseUrl(url);
    expect(result).toEqual({
      protocol: "http",
      host: "example.com",
      path: "/path",
      queryParams: {},
    });
  });
});
