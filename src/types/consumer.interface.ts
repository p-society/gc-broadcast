export interface IConsumer {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  consume: (onMessage: (message: unknown) => Promise<void>) => Promise<void>;
}
