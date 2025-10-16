import { CMSField } from "../../interfaces/CMSField";
import { GradientTO } from "../game/com/spaceape/config/GradientTO";

export const CmsGradientModifier: Map<number, CMSField> = new Map([
  [1, { name: "gradient", type: "group", fields: GradientTO }],
]);
