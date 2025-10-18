import * as fs from "fs";
import { ProtobufHandler } from "../ProtobufHandler";
import path from "path";
import { LiveOpsProfileIconConfigProto } from "../protos/cms/LiveOpsProfileIconConfigProto";

test("it produces identical LiveOpsProfileIconConfigs", async () => {
  const original = fs.readFileSync(
    path.join(__dirname, "files", "LiveOpsProfileIconConfig.bytes")
  );

  const handler = new ProtobufHandler("READ", original);
  handler.process();

  const json = handler.parseProto(LiveOpsProfileIconConfigProto);
  const built = await new ProtobufHandler("WRITE").writeProto(
    json,
    LiveOpsProfileIconConfigProto
  );

  expect(original).toEqual(built);
});
