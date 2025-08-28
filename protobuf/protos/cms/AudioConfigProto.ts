import { CMSField } from "../../interfaces/CMSField";

export const AudioConfigProto: Map<number, CMSField> = new Map([
  [100, { name: "version", type: "string" }],
  [
    1001,
    {
      name: "Settings",
      type: "group",
      fields: new Map([
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
      ]),
    },
  ],
  [
    109,
    {
      name: "EQEntries",
      type: "packed",
      fields: new Map([
        [1, { name: "id", type: "varint" }],
        [2, { name: "order", type: "varint" }],
        [
          3,
          {
            name: "rtpc",
            type: "group",
            fields: new Map([[1, { name: "rtpcId", type: "varint" }]]),
          },
        ],
        [4, { name: "amountOfEQ", type: "float" }],
        [5, { name: "idLabel", type: "string" }],
      ]),
    },
  ],
  [1002, { name: "EventSystem_id", type: "string" }],
  [1003, { name: "GameCanvas_id", type: "string" }],
  [
    1,
    {
      name: "AudioTriggers",
      type: "packed",
      fields: new Map([
        [1, { name: "id", type: "varint" }],
        [
          5,
          {
            name: "wwiseSwitch",
            type: "group",
            fields: new Map([
              [1, { name: "switchId", type: "varint" }],
              [2, { name: "switchState", type: "varint" }],
            ]),
          },
        ],
        [6, { name: "audioEvent_id", type: "varint" }],
        [7, { name: "idLabel", type: "string" }],
      ]),
    },
  ],
  [
    2,
    {
      name: "AudioEvents",
      type: "packed",
      fields: new Map([
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
      ]),
    },
  ],
]);
