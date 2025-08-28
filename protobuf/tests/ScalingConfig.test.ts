import * as fs from "fs";
import { ProtobufHandler } from "../ProtobufHandler";
import { ScalingConfigProto } from "../protos/cms/ScalingConfigProto";

test("it produces identical ScalingConfigs", () => {
  const original = fs.readFileSync(
    "./protobuf/tests/files/ScalingConfig.bytes"
  );

  const handler = new ProtobufHandler("READ", original);
  handler.process();

  const json = handler.parseProto(ScalingConfigProto);

  const built = new ProtobufHandler("WRITE").writeProto(
    json,
    ScalingConfigProto
  );

  expect(original).toEqual(built);
});
