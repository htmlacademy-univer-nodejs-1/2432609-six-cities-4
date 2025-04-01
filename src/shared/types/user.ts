export enum UserType {
  Base = 'base',
  Pro = 'pro',
}

export type User = {
  userName: string;
  email: string;
  avatarPath?: string;
  password: string;
  type: UserType;
};
