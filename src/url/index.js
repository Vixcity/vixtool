/**
 * Parse the URL and return an object containing the various parts of the URL. | 解析URL并返回一个包含URL各部分的对象
 * If the URL does not specify a non default port, the port attribute will not be returned | 如果URL没有指定非默认端口，则不会返回port属性
 *
 * @param {string} url - The URL string to be parsed, defaults to the URL of the current page | 要解析的URL字符串，默认为当前页面的URL
 * @returns {object} - An object containing the various parts of the URL | 包含URL各部分的对象，如protocol, host, port, path, queryParams
 */
export function parseUrl(url) {
  // Create a URL object
  // 创建一个URL对象
  let finalUrl = url;

  if (!finalUrl) {
    if (typeof window !== 'undefined') {
      finalUrl = window.location.href;
    } else {
      // 当window对象不可用时抛出错误
      throw new Error("Cannot parse URL in a non-browser environment")
    }
  }

  const parsedUrl = new URL(finalUrl);

  // Parsing query parameters
  // 解析查询参数
  function parseQueryParams(queryString) {
    const params = {};
    const pairs = queryString.split("&");

    for (const pair of pairs) {
      const [key, value] = pair.split("=");

      if (!key) return {};

      // Attempt to parse JSON (if the value looks like a JSON string)
      // 尝试解析JSON（如果值看起来像JSON字符串）
      try {
        const parsedValue = JSON.parse(decodeURIComponent(value));
        params[decodeURIComponent(key)] = parsedValue || "";
      } catch (e) {
        // If the value is not JSON, assign it true (optional, depending on your needs)
        // 如果不是JSON，则直接赋值
        params[decodeURIComponent(key)] = value
          ? decodeURIComponent(value)
          : "";
      }
    }

    return params;
  }

  // Return an object containing all the necessary information
  // 返回包含所有所需信息的对象
  const result = {
    protocol: parsedUrl.protocol.slice(0, -1), // Remove the colon at the end | 移除末尾的冒号
    host: parsedUrl.host,
    path: parsedUrl.pathname,
    queryParams: parseQueryParams(parsedUrl.search.substring(1)),
  };

  // If the port is not the default port (HTTP: 80, HTTPS: 443), add the port attribute
  // 如果端口不是默认端口（HTTP:80, HTTPS:443），则添加port属性
  if (parsedUrl.port && parsedUrl.port !== (parsedUrl.protocol === "https:" ? "443" : "80")) {
    result.port = parsedUrl.port;
  }

  return result;
}

/**
 * Parse the query parameters in the URL and return an object | 解析URL中的查询参数并返回一个对象
 *
 * @param {string} [url=''] - The URL to be parsed, defaults to the URL of the current page | 要解析的URL，默认为当前页面的URL
 * @returns {Object} - An object containing the query parameters | 包含查询参数的对象。
 */
export function parseQueryParams(url) {
  const parsedUrl = parseUrl(url);
  const queryParams = parsedUrl.queryParams;

  return queryParams;
}

export default {
  parseUrl,
  parseQueryParams,
};
