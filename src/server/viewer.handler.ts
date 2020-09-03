import * as mediasoup from "mediasoup";
import { MessageHandler } from "./message.handler";
import { listen } from "../common/decorators/listen.decorator";
import { ClientRequestTransport } from "../common/messages/rtc/requestTransport.client";
import { ServerRequestTransport } from "../common/messages/rtc/requestTransport.server";
import { RTCServer } from "./rtcserver";
import { ClientTransportStats } from "../common/messages/rtc/transportStats.client";
import { ServerTransportStats } from "../common/messages/rtc/transportStats.server";

export class ViewerHandler {
  private readonly handler: MessageHandler;
  private transport: mediasoup.types.WebRtcTransport;

  constructor(public readonly client: SocketIO.Socket) {
    this.handler = new MessageHandler(this, client);
  }

  @listen(ClientRequestTransport)
  async onTransportRequest(message: ClientRequestTransport) {
    const msg = new ServerRequestTransport();
    msg.rtpCapabilties = RTCServer.getRTPCapabilities();

    this.transport = await RTCServer.createRTCTransport();

    msg.id = this.transport.id;
    msg.iceCandidates = this.transport.iceCandidates;
    msg.iceParameters = this.transport.iceParameters;
    msg.dtlsParameters = this.transport.dtlsParameters;
    msg.sctpParameters = this.transport.sctpParameters;

    this.handler.send(msg);
  }

  @listen(ClientTransportStats)
  async onTransportStats(message: ClientTransportStats) {
    console.log(`[ViewerHandler] Requesting stats`);
    const stats = await this.transport.getStats();

    const msg = new ServerTransportStats();
    msg.stats = stats;
    this.handler.send(msg);
  }
}
