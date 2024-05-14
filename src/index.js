

import vurl from "./url.js";
import vobject from "./object.js";
import varray from "./array.js";
import vdate from "./date.js";
import vutils from "./utils.js";

// Export defaults to creating a vixtool object, which contains all the methods | Export默认为创建一个包含所有方法的vixtool对象 
function createVixtool() {
  console.log("welcome to use vixtool");
  return {
    vurl,
    vobject,
    varray,
    vdate,
    vutils,
  };
}

export const vixtool = createVixtool();
export default createVixtool();
