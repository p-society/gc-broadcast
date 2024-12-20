import {
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ReactionService } from '../../apis/reactions/reactions.service';
import { Logger } from '@nestjs/common';
import { processReaction } from '../../apis/reactions/reaction.helper';
import { PresenceGateway } from '../presence/presence.gateway';

/**
 * Constants for event names to avoid hardcoding.
 */
const EVENTS = {
  SEND_REACTION: 'sendReaction',
  ERROR: 'error',
  RECEIVE_REACTION: (sport: string) => `receiveReaction_${sport}`,
};

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
  namespace: '/reactions',
})
export class ReactionGateway {
  private readonly logger = new Logger(ReactionGateway.name);

  constructor(
    private readonly reactionService: ReactionService,
    private readonly presenceGateway: PresenceGateway,
  ) {}

  /**
   * Triggered when the gateway is initialized.
   */
  afterInit() {
    this.logInfo('WebSocket Gateway Initialized');
  }

  /**
   * Handles incoming reactions sent by a client.
   * @param body - The reaction payload (emoji and sport).
   * @param client - The connected client socket.
   */
  // @SubscribeMessage(EVENTS.SEND_REACTION)
  // handleReaction(
  //   @MessageBody() body: { emoji: string; sport: string },
  //   @ConnectedSocket() client: Socket,
  // ): void {
  //   this.logInfo(`Received raw message: ${JSON.stringify(body)}`);

  //   try {
  //     const processedReaction = processReaction(body);

  //     // Broadcast to the sport-specific channel
  //     const broadcastChannel = EVENTS.RECEIVE_REACTION(processedReaction.sport);
  //     this.presenceGateway.server.emit(broadcastChannel, {
  //       emoji: processedReaction.emoji,
  //       sport: processedReaction.sport,
  //       by: client.id,
  //     });

  //     this.logInfo(
  //       `Reaction broadcasted to sport channel: ${broadcastChannel}`,
  //     );
  //   } catch (error) {
  //     const errorMessage =
  //       error instanceof Error ? error.message : 'An unknown error occurred';
  //     this.handleError(client, errorMessage);
  //   }
  // }

  /**
   * Sends a standardized error response to the client.
   * @param client - The client socket.
   * @param errorMessage - The error message to send.
   */
  private handleError(client: Socket, errorMessage: string): void {
    this.logError(errorMessage);
    client.emit(EVENTS.ERROR, { message: errorMessage });
  }

  /**
   * Logs informational messages with a consistent format.
   * @param message - The message to log.
   */
  private logInfo(message: string): void {
    this.logger.log(`[INFO]: ${message}`);
  }

  /**
   * Logs error messages with a consistent format.
   * @param message - The message to log.
   */
  private logError(message: string): void {
    this.logger.error(`[ERROR]: ${message}`);
  }
}
