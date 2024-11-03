import DataLoader from 'dataloader';
import { MemberType, Post, Profile } from '@prisma/client';

export enum MemberId {
  BASIC = 'BASIC',
  BUSINESS = 'BUSINESS',
}

export interface UserDataType {
  id: string;
  name: string;
  balance: number;
  userSubscribedTo?: {
    subscriberId: string;
    authorId: string;
  }[];
  subscribedToUser?: {
    subscriberId: string;
    authorId: string;
  }[];
}

export interface Loaders {
  memberTypeLoader: DataLoader<string, MemberType | undefined, string>;
  userLoader: DataLoader<string, UserDataType | undefined, string>;
  postLoader: DataLoader<string, Post[], string>;
  profileLoader: DataLoader<string, Profile | undefined, string>;
}
