import { getRandomColor } from ".";

describe("getRandomColor", () => {
  // 测试是否返回一个字符串
  test("should return a string", () => {
    expect(typeof getRandomColor()).toBe("string");
  });

  // 测试返回的字符串是否符合十六进制颜色格式
  test("should return a valid hex color format", () => {
    const color = getRandomColor();
    expect(color).toMatch(/^#[0-9A-Fa-f]{6}$/);
  });

  // 测试连续生成多个颜色是否有重复，这也可以间接表明函数能够
  // 产生足够随机的颜色，不过请注意这并不是一个绝对严密的测试
  test("should generate unique colors in multiple invocations", () => {
    const colors = new Set();
    const tries = 1000;
    for (let i = 0; i < tries; i++) {
      colors.add(getRandomColor());
    }
    expect(colors.size).toBe(tries);
  });
});
