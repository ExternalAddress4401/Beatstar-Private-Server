import { CMSField } from "../../interfaces/CMSField";

export const AssetsPatchConfigProto: Map<number, CMSField> = new Map([
  [1, { name: "version", type: "string" }],
  [6, { name: "downloadUrl", type: "string" }],
  [7, { name: "downloadBucketVersion", type: "string" }],
  [
    4,
    {
      name: "assetBundles",
      type: "packed",
      fields: new Map([
        [1, { name: "id", type: "string" }],
        [2, { name: "DependenciesAndroid_id", type: "string" }],
        [5, { name: "HashAndroid", type: "string" }],
        [6, { name: "SizeInBytesAndroid", type: "varint" }],
        [7, { name: "CRCAndroid", type: "varint" }],
        [8, { name: "HashIos", type: "string" }],
        [9, { name: "SizeInBytesIos", type: "varint" }],
        [10, { name: "CRCIos", type: "varint" }],
        [11, { name: "DependenciesIos_id", type: "string" }],
      ]),
    },
  ],
  [
    5,
    {
      name: "assets",
      type: "packed",
      fields: new Map([
        [1, { name: "id", type: "string" }],
        [2, { name: "name", type: "string" }],
        [3, { name: "iosBundle", type: "string" }],
        [4, { name: "androidBundle", type: "string" }],
      ]),
    },
  ],
]);
