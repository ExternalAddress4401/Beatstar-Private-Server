export type ProtoType =
  | "varint"
  | "boolean"
  | "string"
  | "string-repeat"
  | "hex-string"
  | "float"
  | "signed-varint"
  | "group"
  | "packed"
  | "enums";

interface BaseCMSField {
  name: string;
}

interface PlainCMSField extends BaseCMSField {
  type:
    | "varint"
    | "boolean"
    | "string"
    | "string-repeat"
    | "hex-string"
    | "float"
    | "signed-varint";
}

export interface CMSFieldGroupOrPacked extends BaseCMSField {
  type: "group" | "packed";
  fields: Map<number, CMSField>;
}

export interface EnumCMSField extends BaseCMSField {
  type: "enum";
  enums: Record<number, Map<number, CMSField>>;
}

export type CMSField = PlainCMSField | CMSFieldGroupOrPacked | EnumCMSField;
