import { CMSField } from "../../interfaces/CMSField";

export const liveOpsBundleConfig: Map<number, CMSField> = new Map([
  [100, { name: "version", type: "string" }],
  [101, { name: "nextBundleId", type: "varint" }],
  [102, { name: "settings", type: "group", fields: new Map([]) }],
]);
