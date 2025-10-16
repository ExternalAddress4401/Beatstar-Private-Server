import { CMSField } from "../../../../../interfaces/CMSField";
import { CmsGradientModifier } from "../../../../reused/CmsGradientModifier";
import { StreamableImage } from "../imagestreaming/StreamableImage";

export const ChallengeNotificationSchedule: Map<number, CMSField> = new Map([
  [1, { name: "ChallengesHalfFullNotification_id", type: "string" }],
  [2, { name: "ChallengesFullNotification_id", type: "string" }],
  [3, { name: "StartedChallengeExpiringSoonNotification_id", type: "string" }],
  [4, { name: "UnclaimedQuestsNotification_id", type: "string" }],
  [5, { name: "UnclaimedSongsNotification_id", type: "string" }],
  [6, { name: "timeBeforeExpireWarningNotificationsMsecs", type: "varint" }],
  [7, { name: "numQuestsForHalfFullWarning", type: "varint" }],
  [8, { name: "numQuestsForFullWarning", type: "varint" }],
  [9, { name: "NewFeaturedSongNotification_id", type: "string" }],
  [10, { name: "NewChallengesAvailableNotification_id", type: "string" }],
  [
    11,
    { name: "NumNewChallengesAvailableNotificationsToGive", type: "varint" },
  ],
  [12, { name: "CampaignGachaBoxReadyToClaimNotification_id", type: "string" }],
  [
    13,
    {
      name: "CampaignGachaBoxReadyToClaimReminderNotification_id",
      type: "string",
    },
  ],
  [14, { name: "UnUnlockedCampaignGachaBoxesNotification_id", type: "string" }],
  [15, { name: "UnclaimedCampaignGachaBoxesNotification_id", type: "string" }],
  [
    16,
    {
      name: "DelayBeforeCampaignGachaBoxReadyToClaimReminderNotificationMsecs",
      type: "varint",
    },
  ],
  [17, { name: "VenueEndedNotification_id", type: "varint" }],
  [18, { name: "VenueCooldownEndedNotification_id", type: "string" }],
  [
    19,
    {
      name: "FinalCampaignGachaBoxReadyToClaimNotification_id",
      type: "string",
    },
  ],
  [
    20,
    {
      name: "FinalCampaignGachaBoxReadyToClaimReminderNotification_id",
      type: "string",
    },
  ],
]);
