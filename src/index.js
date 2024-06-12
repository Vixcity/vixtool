import varray from "./array";
import vdate from "./date";
import vnumber from './number'
import vobject from "./object";
import vstring from "./string";
import vurl from "./url";
import vutils from "./utils";

// Export defaults to creating a vixtool object, which contains all the methods | Export默认为创建一个包含所有方法的vixtool对象
function createVixtool() {
  console.log("welcome to use vixtool");
  return {
    varray,
    vdate,
    vnumber,
    vobject,
    vstring,
    vurl,
    vutils,
  };
}

export const vixtool = createVixtool();
export default createVixtool();
