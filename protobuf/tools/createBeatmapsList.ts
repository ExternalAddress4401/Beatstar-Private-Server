import fs from "fs";
import { ProtobufHandler } from "../ProtobufHandler";
import { SongConfigProto } from "../protos/cms/SongConfigProto";
import { stringify } from "./utilities";

const songConfig = fs.readFileSync("../tests/files/SongConfig.bytes");

const handler = new ProtobufHandler("READ", songConfig);
handler.process();

const songs = handler.parseProto(SongConfigProto);

const syncReqBeatmaps = songs.Beatmaps.map((beatmap) => ({
  template_id: beatmap.id.toString() + "n",
  BragState: {},
  HighestScore: {},
  RewardSource: "1n",
  Version: "1n",
}));

fs.writeFileSync("./songsout", stringify(syncReqBeatmaps));

/*{
              "template_id": "57n",
              "BragState": {},
              "HighestScore": {},
              "RewardSource": "1n",
              "Version": "1n"
            },*/
