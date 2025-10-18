import * as fs from "fs";
import { ProtobufHandler } from "../ProtobufHandler";
import path from "path";
import { LiveOpsLoadingScreenConfigProto } from "../protos/cms/LiveOpsLoadingScreenConfigProto";

test("it produces identical LiveOpsLoadingScreenConfigs", async () => {
  const original = fs.readFileSync(
    path.join(__dirname, "files", "LiveOpsLoadingScreenConfig.bytes")
  );

  const handler = new ProtobufHandler("READ", original);
  handler.process();

  const json = handler.parseProto(LiveOpsLoadingScreenConfigProto);
  const built = await new ProtobufHandler("WRITE").writeProto(
    json,
    LiveOpsLoadingScreenConfigProto
  );

  expect(original).toEqual(built);
});
