import { CMSField } from "../../interfaces/CMSField";

export const FeaturedSongProfileTO: Map<number, CMSField> = new Map([
  [
    2,
    {
      name: "featuredSong",
      type: "group",
      fields: new Map([
        [1, { name: "cycle", type: "varint" }],
        [2, { name: "Boxes_id", type: "varint-repeat" }],
      ]),
    },
  ],
]);
