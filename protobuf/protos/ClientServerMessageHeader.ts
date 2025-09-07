import { CMSField } from "../interfaces/CMSField";

export interface ClientServerMessageHeader {
  version: string;
  service: string;
  rpc: string;
  authentication: string;
  ignoreMaintenance: boolean;
  supportsCompression: boolean;
  platform: number;
  shard: number;
  clide: string;
  secret: string;
}

export const ClientServerMessageHeaderMap: Map<number, CMSField> = new Map([
  [1, { name: "version", type: "string" }],
  [2, { name: "service", type: "string" }],
  [3, { name: "rpc", type: "string" }],
  [4, { name: "authentication", type: "string" }],
  [5, { name: "ignoreMaintenance", type: "boolean" }],
  [6, { name: "supportsCompression", type: "boolean" }],
  [7, { name: "platform", type: "varint" }],
  [8, { name: "shard", type: "varint" }],
  [9, { name: "clide", type: "string" }],
  [10, { name: "secret", type: "string" }],
]);
