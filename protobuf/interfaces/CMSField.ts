export type ProtoType =
  | "varint"
  | "varint-repeat"
  | "boolean"
  | "boolean-repeat"
  | "string"
  | "string-repeat"
  | "hex-string"
  | "float"
  | "float-repeat"
  | "group"
  | "packed"
  | "enums"
  | "double"
  | "raw";

interface BaseCMSField {
  name: string;
}

interface PlainCMSField extends BaseCMSField {
  type:
    | "varint"
    | "varint-repeat"
    | "double"
    | "boolean"
    | "boolean-repeat"
    | "string"
    | "string-repeat"
    | "hex-string"
    | "float"
    | "float-repeat"
    | "raw";
  map?: Record<number, string>;
}

export interface CMSFieldGroupOrPacked extends BaseCMSField {
  type: "group" | "packed";
  fields: Map<number, CMSField>;
}

export interface EnumCMSField extends BaseCMSField {
  type: "enum";
  key?: number;
  enums: Record<number, Map<number, CMSField>>;
}

export type CMSField = PlainCMSField | CMSFieldGroupOrPacked | EnumCMSField;
