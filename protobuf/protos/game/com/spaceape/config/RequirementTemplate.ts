import { CMSField } from "../../../../../interfaces/CMSField";
import { RequirementItem } from "./RequirementItem";

export const RequirementTemplate: Map<number, CMSField> = new Map([
  [1, { name: "id", type: "string" }],
  [2, { name: "requirements", type: "packed", fields: RequirementItem }],
  [3, { name: "sharedRequirement_id", type: "string" }],
]);
