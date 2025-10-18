import * as fs from "fs";
import { ProtobufHandler } from "../ProtobufHandler";
import path from "path";
import { LiveOpsEmojiConfigProto } from "../protos/cms/LiveOpsEmojiConfigProto";

test("it produces identical LiveOpsEmojiConfigs", async () => {
  const original = fs.readFileSync(
    path.join(__dirname, "files", "LiveOpsEmojiConfig.bytes")
  );

  const handler = new ProtobufHandler("READ", original);
  handler.process();

  const json = handler.parseProto(LiveOpsEmojiConfigProto);
  const built = await new ProtobufHandler("WRITE").writeProto(
    json,
    LiveOpsEmojiConfigProto
  );

  expect(original).toEqual(built);
});
