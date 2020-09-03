import React, { Component } from "react";
import { MessageHandler } from "../message.handler";
import { ServerElbowshake } from "../../common/messages/elbowshake.server";
import { listen } from "../../common/decorators/listen.decorator";

interface ViewerProps {
  socket: SocketIOClient.Socket;
}

export class Viewer extends Component<ViewerProps> {
  handler: MessageHandler;

  constructor(props: Readonly<ViewerProps>) {
    super(props);

    this.handler = new MessageHandler(this, props.socket);
  }

  @listen(ServerElbowshake)
  onElbowshake() {}

  render() {
    return <h1>Viewer!</h1>;
  }
}