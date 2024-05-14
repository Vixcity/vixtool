import varray from "./array.js";
import vdate from "./date.js";
import vobject from "./object.js";
import vstring from "./string.js";
import vurl from "./url.js";
import vutils from "./utils.js";

// Export defaults to creating a vixtool object, which contains all the methods | Export默认为创建一个包含所有方法的vixtool对象
function createVixtool() {
  console.log("welcome to use vixtool");
  return {
    varray,
    vdate,
    vobject,
    vstring,
    vurl,
    vutils,
  };
}

export const vixtool = createVixtool();
export default createVixtool();
