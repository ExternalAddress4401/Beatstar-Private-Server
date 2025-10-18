import * as fs from "fs";
import { ProtobufHandler } from "../ProtobufHandler";
import path from "path";
import { NotificationConfigProto } from "../protos/cms/NotificationConfigProto";

test("it produces identical NotificationConfigs", async () => {
  const original = fs.readFileSync(
    path.join(__dirname, "files", "NotificationConfig.bytes")
  );

  const handler = new ProtobufHandler("READ", original);
  handler.process();

  const json = handler.parseProto(NotificationConfigProto);

  const built = await new ProtobufHandler("WRITE").writeProto(
    json,
    NotificationConfigProto
  );

  expect(original).toEqual(built);
});
