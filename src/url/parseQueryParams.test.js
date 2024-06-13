import { parseQueryParams } from "."; // 假设parseQueryParams函数在这个模块中

describe("parseQueryParams", () => {
  // 解析URL中的查询参数
  it("parses query parameters from a URL", () => {
    const url = "https://example.com/path?query=value";
    const result = parseQueryParams(url);
    expect(result).toEqual({ query: "value" });
  });

  // 解析URL中的JSON
  it("parses JSON in query parameters", () => {
    const url = 'https://example.com/path?data={"key":"value"}';
    const result = parseQueryParams(url);
    expect(result).toEqual({ data: { key: "value" } });
  });

  // 为不带查询参数的URL返回一个空对象
  it("returns an empty object for URLs without query parameters", () => {
    const url = "https://example.com/path";
    const result = parseQueryParams(url);
    expect(result).toEqual({});
  });

  // 对于没有查询参数的URL返回一个空对象
  it("returns an empty object for URLs without query parameters", () => {
    // 为测试提供一个完整的URL
    const url = "https://example.com/path";
    const result = parseQueryParams(url);
    expect(result).toEqual({});
  });
});
