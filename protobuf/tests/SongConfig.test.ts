import * as fs from "fs";
import { ProtobufHandler } from "../ProtobufHandler";
import { SongConfigProto } from "../protos/cms/SongConfigProto";

test("it produces identical ScalingConfigs", () => {
  const original = fs.readFileSync("./protobuf/tests/files/SongConfig.bytes");

  const handler = new ProtobufHandler("READ", original);
  handler.process();

  const json = handler.parseProto(SongConfigProto);
  const built = new ProtobufHandler("WRITE").writeProto(json, SongConfigProto);

  expect(original).toEqual(built);
});
