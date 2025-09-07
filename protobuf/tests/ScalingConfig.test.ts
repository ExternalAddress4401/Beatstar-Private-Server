import fs from "fs";
import { ProtobufHandler } from "../ProtobufHandler";
import { ScalingConfigProto } from "../protos/cms/ScalingConfigProto";
import path from "path";

test("it produces identical ScalingConfigs", async () => {
  const original = fs.readFileSync(
    path.join(__dirname, "files", "ScalingConfig.bytes")
  );

  const handler = new ProtobufHandler("READ", original);
  handler.process();

  const json = handler.parseProto(ScalingConfigProto);

  const built = await new ProtobufHandler("WRITE").writeProto(
    json,
    ScalingConfigProto
  );

  expect(original).toEqual(built);
});
