import { CMSField } from "../../interfaces/CMSField";
import { NewsFeedStories } from "../reused/NewsFeedStories";

export const newsFeedConfig: Map<number, CMSField> = new Map([
  [100, { name: "version", type: "string" }],
  [101, { name: "nextStoryId", type: "varint" }],
  [
    1,
    {
      name: "NewsFeedStories",
      type: "packed",
      fields: NewsFeedStories,
    },
  ],
]);
