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
import prisma from "../website/beatstar/src/lib/prisma";

export class UserService extends BaseService {
  name = "userservice";

  async handlePacket(packet: Packet, client: Client) {
    const payload = packet.parsePayload(AllInOneLoginReq);
    if (payload.reqAllInOneLogin === undefined) {
      Logger.error("Undefined reqAllInOneLogin");
      Logger.error(packet.buffer.toString("hex"));
      Logger.error(JSON.stringify(payload));
      return;
    }

    // blank cintas are allowed here since we need to pass CMSService handling to
    // receive the new error codes from LangConfig so we can show the user what they've
    // done incorrectly
    let cinta = payload.reqAllInOneLogin.cinta ?? "";
    if (cinta !== "") {
      Logger.saveClientInfo("Received a cinta", { cinta }, cinta);
    }
    cinta = cinta.trim();

    if (cinta !== "{clide}") {
      const user = await prisma.user.findUnique({
        select: {
          id: true,
        },
        where: {
          uuid: cinta,
        },
      });

      Logger.saveClientInfo("Found a user", { user }, cinta);

      client.setUser(user?.id, cinta);
    }

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
