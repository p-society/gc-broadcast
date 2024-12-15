export enum PresenceSocketEvents {
  ONLINE = 'online',
  OFFLINE = 'offline',

  IN_CLIENT_CONNECTED = 'in:client:connected',
  IN_CLIENT_DISCONNECTED = 'in:client:disconnected',

  PUBLIC_STATUS_CHANGE = 'pub:status:change',

  HEARTBEAT = 'heartbeat',
}
