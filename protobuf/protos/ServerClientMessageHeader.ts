import { CMSField } from "../interfaces/CMSField";

export interface ServerClientMessageHeader {
  version: string;
  timestamp: number;
  tokenId: string;
  status: number;
  compressed: boolean;
  redirectHost: string;
  redirectPort: number;
  service: string;
}

export const ServerClientMessageHeaderMap: Map<number, CMSField> = new Map([
  [1, { name: "version", type: "string" }],
  [2, { name: "timestamp", type: "varint" }],
  [3, { name: "tokenId", type: "string" }],
  //4: newVersion VersionInfoTO
  [5, { name: "status", type: "varint" }],
  [
    6,
    {
      name: "messages",
      type: "group",
      fields: new Map([
        [1, { name: "test", type: "string" }],
        [2, { name: "expiry", type: "varint" }],
      ]),
    },
  ],
  [7, { name: "compressed", type: "boolean" }],
  [8, { name: "redirectHost", type: "string" }],
  [9, { name: "redirectPort", type: "varint" }],
  [10, { name: "service", type: "string" }],
]);
