import * as fs from "fs";
import { ProtobufHandler } from "../ProtobufHandler";
import path from "path";
import { GameConfigProto } from "../protos/cms/GameConfigProto";

test("it produces identical GameConfigs", async () => {
  const original = fs.readFileSync(
    path.join(__dirname, "files", "GameConfig.bytes")
  );

  const handler = new ProtobufHandler("READ", original);
  handler.process();

  const json = handler.parseProto(GameConfigProto);
  const built = await new ProtobufHandler("WRITE").writeProto(
    json,
    GameConfigProto
  );

  expect(original).toEqual(built);
});
