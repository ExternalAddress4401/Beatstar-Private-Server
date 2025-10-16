import { CMSField } from "../../../../../interfaces/CMSField";

export const Settings: Map<number, CMSField> = new Map([
  [10, { name: "MuteTrigger_id", type: "varint" }],
  [11, { name: "UnmuteTrigger_id", type: "varint" }],
  [13, { name: "CompanyLogoFlowEnterTrigger_id", type: "varint" }],
  [14, { name: "CompanyLogoFlowExitTrigger_id", type: "varint" }],
  [15, { name: "bootupPreloadAssets_id", type: "string-repeat" }],
  [17, { name: "BootLogoFlowEnter_id", type: "varint" }],
  [18, { name: "BootLogoFlowExit_id", type: "varint" }],
  [19, { name: "LoadingScreenTitle_id", type: "string" }],
  [21, { name: "GameLogoBankAsset_id", type: "string" }],
  [22, { name: "PersistentBankAsset_id", type: "string" }],
  [23, { name: "InitBankAsset_id", type: "string" }],
  [24, { name: "MusicSystemMetaBankAsset_id", type: "string" }],
  [25, { name: "PlaceholderSongBankAsset_id", type: "string" }],
]);
