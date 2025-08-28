import * as fs from "fs";
import { ProtobufHandler } from "../ProtobufHandler";
import { AssetsPatchConfigProto } from "../protos/cms/AssetsPatchConfigProto";

test("it produces identical AssetsPatchConfigs", () => {
  const original = fs.readFileSync(
    "./protobuf/tests/files/AssetsPatchConfig.bytes"
  );

  const handler = new ProtobufHandler("READ", original);
  handler.process();

  const json = handler.parseProto(AssetsPatchConfigProto);
  const built = new ProtobufHandler("WRITE").writeProto(
    json,
    AssetsPatchConfigProto
  );

  expect(original).toEqual(built);
});
