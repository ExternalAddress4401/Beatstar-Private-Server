import { CMSField } from "../../interfaces/CMSField";
import { ReqPayload } from "./ReqPayload";

export const PartialPayload: Map<number, CMSField> = new Map([...ReqPayload]);
