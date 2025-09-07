import * as fs from "fs";
import { ProtobufHandler } from "../ProtobufHandler";
import { FontFallbackConfigProto } from "../protos/cms/FontFallbackConfigProto";
import path from "path";

test("it produces identical FontFallbackConfigs", async () => {
  const original = fs.readFileSync(
    path.join(__dirname, "files", "FontFallbackConfig.bytes")
  );

  const handler = new ProtobufHandler("READ", original);
  handler.process();

  const json = handler.parseProto(FontFallbackConfigProto);
  const built = await new ProtobufHandler("WRITE").writeProto(
    json,
    FontFallbackConfigProto
  );

  expect(original).toEqual(built);
});
