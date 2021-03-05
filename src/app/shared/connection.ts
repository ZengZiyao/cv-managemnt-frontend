export class Connection {
  id: string;
  username: string;
  followerUsername: string;
  updateTime: Date;
}

export enum ConnectionStatus {
  ACCEPTED,
  REJECTED,
  PENDING,
  CANCELED,
}
