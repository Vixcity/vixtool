import { prettyLog } from ".";

describe("prettyLog", () => {
  let consoleSpy;
  const originalConsole = global.console;

  beforeEach(() => {
    consoleSpy = {
      log: jest.spyOn(global.console, "log").mockImplementation(() => {}),
      table: jest.spyOn(global.console, "table").mockImplementation(() => {}),
    };
  });

  afterEach(() => {
    global.console = originalConsole;
    jest.restoreAllMocks();
  });

  // Because `console.table` is not standard and may not be available in all environments,
  // 因为`console.table`不是标准的，可能在所有环境中都不可用，
  // we should also test if `console.table` is a function.
  // 因此，我们应该测试`console.table`是否是一个函数。
  test("table should call console.table", () => {
    const logger = prettyLog();
    logger.table([
      ["Name", "Age"],
      ["Alice", 30],
    ]);
    expect(consoleSpy.table).toHaveBeenCalledWith([
      ["Name", "Age"],
      ["Alice", 30],
    ]);
  });
});
