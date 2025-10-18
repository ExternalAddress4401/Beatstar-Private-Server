import * as fs from "fs";
import { ProtobufHandler } from "../ProtobufHandler";
import path from "path";
import { LiveOpsCallingCardsConfigProto } from "../protos/cms/LiveOpsCallingCardsConfigProto";

test("it produces identical LiveOpsCallingCardsConfigs", async () => {
  const original = fs.readFileSync(
    path.join(__dirname, "files", "LiveOpsCallingCardsConfig.bytes")
  );

  const handler = new ProtobufHandler("READ", original);
  handler.process();

  const json = handler.parseProto(LiveOpsCallingCardsConfigProto);
  const built = await new ProtobufHandler("WRITE").writeProto(
    json,
    LiveOpsCallingCardsConfigProto
  );

  expect(original).toEqual(built);
});
