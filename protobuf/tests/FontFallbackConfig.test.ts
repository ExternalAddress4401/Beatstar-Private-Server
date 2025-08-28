import * as fs from "fs";
import { ProtobufHandler } from "../ProtobufHandler";
import { FontFallbackConfigProto } from "../protos/cms/FontFallbackConfigProto";

test("it produces identical FontFallbackConfigs", () => {
  const original = fs.readFileSync(
    "./protobuf/tests/files/FontFallbackConfig.bytes"
  );

  const handler = new ProtobufHandler("READ", original);
  handler.process();

  const json = handler.parseProto(FontFallbackConfigProto);
  const built = new ProtobufHandler("WRITE").writeProto(
    json,
    FontFallbackConfigProto
  );

  expect(original).toEqual(built);
});
