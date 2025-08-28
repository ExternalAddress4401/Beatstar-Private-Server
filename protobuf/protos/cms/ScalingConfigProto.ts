import { CMSField } from "../../interfaces/CMSField";
import { FlamingoScalingModuleTemplate } from "../chunks/FlamingoScalingModuleTemplate";
import { MemoryRequirement } from "../chunks/MemoryRequirement";
import { PlatformRequirement } from "../chunks/PlatformRequirement";
import { ResolutionRequirement } from "../chunks/ResolutionRequirement";
import { ShaderScalingModule } from "../chunks/ShaderScalingModule";

export const ScalingConfigProto: Map<number, CMSField> = new Map([
  [1, { name: "version", type: "string" }],
  [
    2,
    {
      name: "levels",
      type: "group",
      fields: new Map([
        [1, { name: "id", type: "string" }],
        [
          2,
          {
            name: "module",
            type: "group",
            fields: new Map([
              [
                1,
                {
                  name: "type",
                  type: "enum",
                  enums: {
                    7: ShaderScalingModule,
                    102: FlamingoScalingModuleTemplate,
                  },
                },
              ],
            ]),
          },
        ],
      ]),
    },
  ],
  [
    3,
    {
      name: "groups",
      type: "group",
      fields: new Map([
        [1, { name: "id", type: "string" }],
        [4, { name: "level_id", type: "string" }],
        [2, { name: "priority", type: "varint" }],
        [
          3,
          {
            name: "requirements",
            type: "group",
            fields: new Map([
              [
                1,
                {
                  name: "type",
                  type: "enum",
                  enums: {
                    3: PlatformRequirement,
                    4: MemoryRequirement,
                    7: ResolutionRequirement,
                  },
                },
              ],
            ]),
          },
        ],
      ]),
    },
  ],
  [
    4,
    {
      name: "devices",
      type: "packed",
      fields: new Map([
        [1, { name: "id", type: "varint" }],
        [2, { name: "idLabel", type: "string" }],
        [3, { name: "platform", type: "varint" }],
        [4, { name: "level_id", type: "string" }],
      ]),
    },
  ],
]);
