import { CMSField } from "../interfaces/CMSField";
import { ReqHeader } from "./reused/ReqHeader";
import { ReqPayload } from "./reused/ReqPayload";

export const createBatchRequest = (
  enums: Record<number, Map<number, CMSField>>
) => {
  return new Map([
    ...ReqHeader,
    [
      5,
      {
        name: "requests",
        type: "group",
        fields: new Map([
          ...ReqPayload,
          [
            3,
            {
              name: "rpcType",
              type: "enum",
              key: 4,
              enums,
            },
          ],
        ]),
      },
    ],
  ]);
};
