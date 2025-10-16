import { CMSField } from "../../../../../interfaces/CMSField";

export const LiveOpsTrackSkinExtensionTemplate: Map<number, CMSField> = new Map(
  [
    [1, { name: "key", type: "string" }],
    [2, { name: "intValues", type: "varint-repeat" }],
    [3, { name: "floatValues", type: "float-repeat" }],
    [4, { name: "boolValues", type: "boolean-repeat" }],
    [5, { name: "unityAssets_id", type: "string-repeat" }],
  ]
);
