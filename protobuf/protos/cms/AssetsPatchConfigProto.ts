import { CMSField } from "../../interfaces/CMSField";
import { UnityAssetBundlePatch } from "../game/com/spaceape/assetspatch/UnityAssetBundlePatch";
import { UnityAssetPatch } from "../game/com/spaceape/assetspatch/UnityAssetPatch";

export const AssetsPatchConfigProto: Map<number, CMSField> = new Map([
  [1, { name: "version", type: "string" }],
  [6, { name: "downloadUrl", type: "string" }],
  [7, { name: "downloadBucketVersion", type: "string" }],
  [
    4,
    {
      name: "assetBundles",
      type: "packed",
      fields: UnityAssetBundlePatch,
    },
  ],
  [
    5,
    {
      name: "assets",
      type: "packed",
      fields: UnityAssetPatch,
    },
  ],
]);
