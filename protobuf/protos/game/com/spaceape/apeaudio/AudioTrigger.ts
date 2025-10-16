import { CMSField } from "../../../../../interfaces/CMSField";

export const AudioTrigger: Map<number, CMSField> = new Map([
  [1, { name: "id", type: "varint" }],
  [
    5,
    {
      name: "wwiseSwitch",
      type: "group",
      fields: new Map([
        [1, { name: "switchId", type: "varint" }],
        [2, { name: "switchState", type: "varint" }],
      ]),
    },
  ],
  [6, { name: "audioEvent_id", type: "varint" }],
  [7, { name: "idLabel", type: "string" }],
]);
