import * as fs from "fs";
import { ProtobufHandler } from "../ProtobufHandler";
import { LangConfigProto } from "../protos/cms/LangConfigProto";
import path from "path";

test("it produces identical LangConfigs", async () => {
  const original = fs.readFileSync(
    path.join(__dirname, "files", "LangConfig.bytes")
  );

  const handler = new ProtobufHandler("READ", original);
  handler.process();

  const json = handler.parseProto(LangConfigProto);
  const built = await new ProtobufHandler("WRITE").writeProto(
    json,
    LangConfigProto
  );

  expect(original).toEqual(built);
});
