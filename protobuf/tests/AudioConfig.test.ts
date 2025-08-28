import * as fs from "fs";
import { ProtobufHandler } from "../ProtobufHandler";
import { AudioConfigProto } from "../protos/cms/AudioConfigProto";

test("it produces identical AudioConfigs", () => {
  const original = fs.readFileSync("./protobuf/tests/files/AudioConfig.bytes");

  const handler = new ProtobufHandler("READ", original);
  handler.process();

  const json = handler.parseProto(AudioConfigProto);
  const built = new ProtobufHandler("WRITE").writeProto(json, AudioConfigProto);

  expect(original).toEqual(built);
});
