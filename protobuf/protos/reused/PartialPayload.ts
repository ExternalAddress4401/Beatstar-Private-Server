import { CMSField } from "../../interfaces/CMSField";
import { ReqHeader } from "./ReqHeader";
import { ReqPayload } from "./ReqPayload";

export const PartialPayload: Map<number, CMSField> = new Map([...ReqPayload]);
