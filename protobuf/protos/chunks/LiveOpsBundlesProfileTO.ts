import { CMSField } from "../../interfaces/CMSField";

export const LiveOpsBundlesProfileTO: Map<number, CMSField> = new Map([
  [
    2,
    {
      name: "trackedLiveOpsBundles",
      type: "group",
      fields: new Map([
        [
          3,
          {
            name: "bundles",
            type: "packed",
            fields: new Map([
              [1, { name: "uniqueShopId", type: "string" }],
              [2, { name: "startTimeMsecs", type: "varint" }],
              [3, { name: "endTimeMsecs", type: "varint" }],
              [6, { name: "usdReportingCents", type: "varint" }],
            ]),
          },
        ],
      ]),
    },
  ],
]);
