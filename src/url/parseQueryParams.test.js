import { parseQueryParams } from '.'; // 假设parseQueryParams函数在这个模块中

describe('parseQueryParams', () => {
  // 解析URL中的查询参数
  it('parses query parameters from a URL', () => {
    const url = 'https://example.com/path?query=value';
    const result = parseQueryParams(url);
    expect(result).toEqual({ query: 'value' });
  });

  // 解析URL中的JSON
  it('parses JSON in query parameters', () => {
    const url = 'https://example.com/path?data={"key":"value"}';
    const result = parseQueryParams(url);
    expect(result).toEqual({ data: { key: 'value' } });
  });

  // 为不带查询参数的URL返回一个空对象
  it('returns an empty object for URLs without query parameters', () => {
    const url = 'https://example.com/path';
    const result = parseQueryParams(url);
    expect(result).toEqual({});
  });

  // 处理不带查询参数且未提供URL的URL
  it('handles URLs with no query parameters and no URL provided', () => {
    const result = parseQueryParams();
    expect(result).toEqual({});
  });

  // 对于没有查询参数的URL返回一个空对象
  it('returns an empty object for URLs without query parameters', () => {
    // 为测试提供一个完整的URL
    const url = 'https://example.com/path';
    const result = parseQueryParams(url);
    expect(result).toEqual({});
  });

  // 处理没有提供URL且没有window对象可用的情况
  it('handles URLs with no query parameters and no URL provided', () => {
    // 确保提供一个默认的URL或者处理错误
    expect(() => parseQueryParams()).toThrow('Cannot parse URL in a non-browser environment');
  });
});
