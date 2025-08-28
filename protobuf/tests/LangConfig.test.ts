import * as fs from "fs";
import { ProtobufHandler } from "../ProtobufHandler";
import { LangConfigProto } from "../protos/cms/LangConfigProto";

test("it produces identical LangConfigs", () => {
  const original = fs.readFileSync("./protobuf/tests/files/LangConfig.bytes");

  const handler = new ProtobufHandler("READ", original);
  handler.process();

  const json = handler.parseProto(LangConfigProto);
  const built = new ProtobufHandler("WRITE").writeProto(json, LangConfigProto);

  expect(original).toEqual(built);
});
