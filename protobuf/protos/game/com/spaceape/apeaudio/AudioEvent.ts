import { CMSField } from "../../../../../interfaces/CMSField";

export const AudioEvent: Map<number, CMSField> = new Map([
  [1, { name: "id", type: "varint" }],
  [
    3,
    {
      name: "wwiseEvent",
      type: "group",
      fields: new Map([[1, { name: "eventId", type: "varint" }]]),
    },
  ],
  [6, { name: "idLabel", type: "string" }],
]);
