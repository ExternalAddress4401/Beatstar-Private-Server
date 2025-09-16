import { Client } from "../Client";
import { Packet } from "../Packet";
import { AllInOneLoginReq } from "../protobuf/protos/AllInOneLoginReq";
import { AllInOneLoginResp } from "../protobuf/protos/AllInOneLoginResp";
import { BaseService } from "./BaseService";

export class UserService extends BaseService {
  name = "userservice";

  async handlePacket(packet: Packet, client: Client) {
    const payload = packet.parsePayload(AllInOneLoginReq);

    const response = await packet.buildResponse(
      "ServerClientMessageHeader",
      "AllInOneLoginResp",
      AllInOneLoginResp,
      {
        clide: client.clide,
        respAllInOneLogin: [
          {
            clide: client.clide,
            cinta: payload.reqAllInOneLogin[0].cinta,
            expiryTime: Date.now() + 100000000,
            authenticationTicket:
              "VCS1axRWJeq4jFJdpI3RFfnaIPjAV3ksi8W3cc3VYedwSiQFozfoIZpRN663Tmn4oswsBRTRcz6r8E+aDLuhDzh6xg/vB0e6SqjD2fpd/N1oY/4ulGb8qQ4qc2cGwuS4dPAPnGFW1WjP7SZ3MRJI0WRo2iHbz5Qlg21ssolAo0MTDWYPh0dtYg==",
          },
        ],
      }
    );
    client.write(response);
  }
}
