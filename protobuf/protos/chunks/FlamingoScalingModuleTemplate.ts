import { CMSField } from "../../interfaces/CMSField";

export const FlamingoScalingModuleTemplate: Map<number, CMSField> = new Map([
  [
    2,
    {
      name: "scaling",
      type: "group",
      fields: new Map([
        [1, { name: "WhizzBangs", type: "varint" }],
        [2, { name: "GameTrackEq", type: "boolean" }],
        [3, { name: "GameHudEq", type: "boolean" }],
        [4, { name: "GameTrackVfx", type: "boolean" }],
        [5, { name: "GameTileVfx", type: "boolean" }],
        [8, { name: "Fps", type: "varint" }],
        [9, { name: "MaxWhizzBangsPerFrame", type: "signed-varint" }],
        [10, { name: "GameLowPolyWaves", type: "boolean" }],
        [12, { name: "TargetDPI", type: "float" }],
        [13, { name: "TextureQuality", type: "varint" }],
        [14, { name: "AntiAliasing", type: "varint" }],
        [15, { name: "AnisotropicTextures", type: "varint" }],
        [16, { name: "VSync", type: "varint" }],
        [18, { name: "FallbackFonts", type: "boolean" }],
        [19, { name: "MenuFps", type: "varint" }],
        [20, { name: "MenyVSync", type: "varint" }],
        [21, { name: "uiBlur", type: "varint" }],
        [22, { name: "uiFeedbackAnimations", type: "varint" }],
        [
          23,
          {
            name: "switchHoldScaling",
            type: "group",
            fields: new Map([
              [1, { name: "basicSwitchHolds", type: "boolean" }],
            ]),
          },
        ],
        [24, { name: "liquidGradient", type: "boolean" }],
        [25, { name: "EqualiserSimplification", type: "float" }],
      ]),
    },
  ],
]);
