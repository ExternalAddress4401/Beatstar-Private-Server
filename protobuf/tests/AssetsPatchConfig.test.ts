import fs from "fs";
import { ProtobufHandler } from "../ProtobufHandler";
import { AssetsPatchConfigProto } from "../protos/cms/AssetsPatchConfigProto";
import path from "path";

test("it produces identical AssetsPatchConfigs", async () => {
  const original = fs.readFileSync(
    path.join(__dirname, "files", "AssetsPatchConfig.bytes")
  );

  const handler = new ProtobufHandler("READ", original);
  handler.process();

  const json = handler.parseProto(AssetsPatchConfigProto);
  const built = await new ProtobufHandler("WRITE").writeProto(
    json,
    AssetsPatchConfigProto
  );

  expect(original).toEqual(built);
});
