import { CMSField } from "../../interfaces/CMSField";

export const AnalyticsEventDynamicTO: Map<number, CMSField> = new Map([
  [
    1,
    {
      name: "attributes",
      type: "packed",
      fields: new Map([
        [1, { name: "attributeKey", type: "string" }],
        [
          2,
          {
            name: "attributeValue",
            type: "string",
          },
        ],
        [3, { name: "attributeType", type: "varint" }],
        [4, { name: "attributeFloatValue", type: "float" }], //check this
        [5, { name: "attributeBoolValue", type: "boolean" }],
        [6, { name: "attributeIntValue", type: "varint" }],
        [7, { name: "attributeLongValue", type: "varint" }],
        [8, { name: "attributeDoubleValue", type: "double" }],
        [9, { name: "attributeDateTimeMsecs", type: "varint" }],
        [10, { name: "attributeDurationMsecs", type: "varint" }],
      ]),
    },
  ],
]);
