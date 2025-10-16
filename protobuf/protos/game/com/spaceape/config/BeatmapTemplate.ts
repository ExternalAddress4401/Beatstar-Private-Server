import { CMSField } from "../../../../../interfaces/CMSField";

export const BeatmapTemplate: Map<number, CMSField> = new Map([
  [1, { name: "id", type: "varint" }],
  [21, { name: "Song_id", type: "varint" }],
  [37, { name: "idLabel", type: "string" }],
  [46, { name: "BeatmapVariantReference_id", type: "varint" }],
  [
    5,
    {
      name: "availability",
      type: "varint",
      map: {
        0: "NotAvailable",
        1: "InCampaign",
        2: "OutsideCampaign",
        3: "Tutorial",
        4: "Calibration",
        5: "ComingSoon",
      },
    },
  ],
]);
