import { AllInOneLoginReq } from "@externaladdress4401/protobuf/protos/AllInOneLoginReq";
import { Client } from "../Client";
import { Packet } from "../Packet";
import { BaseService } from "./BaseService";
import { AllInOneLoginResp } from "@externaladdress4401/protobuf/protos/AllInOneLoginResp";
import {
  createAllInOneLoginResp,
  createServerClientMessageHeader,
} from "@externaladdress4401/protobuf/responses";
import Logger from "../lib/Logger";

export class UserService extends BaseService {
  name = "userservice";

  async handlePacket(packet: Packet, client: Client) {
    const payload = packet.parsePayload(AllInOneLoginReq);
    if (payload.reqAllInOneLogin === undefined) {
      Logger.error("Undefined reqAllInOneLogin", client.clide);
      Logger.error(packet.buffer.toString("hex"), client.clide);
      Logger.error(JSON.stringify(payload), client.clide);
      return;
    }

    const cinta = payload.reqAllInOneLogin.cinta ?? "";

    // we'll just use this to auth database requests
    client.setClide(cinta);

    const response = await packet.buildResponse(
      createServerClientMessageHeader({}),
      createAllInOneLoginResp({
        "{clide}": cinta,
        "{cinta}": cinta,
        "{expiryTime}": Date.now() + 100000000,
        "{authenticationTicket}":
          "VCS1axRWJeq4jFJdpI3RFfnaIPjAV3ksi8W3cc3VYedwSiQFozfoIZpRN663Tmn4oswsBRTRcz6r8E+aDLuhDzh6xg/vB0e6SqjD2fpd/N1oY/4ulGb8qQ4qc2cGwuS4dPAPnGFW1WjP7SZ3MRJI0WRo2iHbz5Qlg21ssolAo0MTDWYPh0dtYg==",
      }),
      AllInOneLoginResp
    );
    client.write(response);
  }
}
