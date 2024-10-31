import { GraphQLObjectType, GraphQLList, GraphQLNonNull } from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { MemberType, MemberTypeId } from './memberTypes.js';
import { PostType } from './posts.js';
import { ProfileType } from './profiles.js';
import { UserType } from './users.js';
import { Context } from '../types/context.js';

export const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    memberTypes: {
      type: new GraphQLNonNull(new GraphQLList(MemberType)),
      resolve: async (_, __, context: Context) => {
        return await context.prisma.memberType.findMany();
      },
    },

    memberType: {
      type: MemberType,
      args: {
        id: { type: new GraphQLNonNull(MemberTypeId) },
      },
      resolve: async (_, { id }: { id: string }, context: Context) => {
        const memberType = await context.prisma.memberType.findUnique({
          where: {
            id,
          },
        });
        return memberType;
      },
    },

    users: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
      resolve: async (_, __, context: Context) => {
        return await context.prisma.user.findMany();
      },
    },

    user: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, { id }: { id: string }, context: Context) => {
        const user = await context.prisma.user.findUnique({
          where: {
            id,
          },
        });
        return user;
      },
    },

    posts: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(PostType))),
      resolve: async (_, __, context: Context) => {
        return await context.prisma.post.findMany();
      },
    },

    post: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, { id }: { id: string }, context: Context) => {
        const post = await context.prisma.post.findUnique({
          where: {
            id,
          },
        });
        return post;
      },
    },

    profiles: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ProfileType))),
      resolve: async (_, __, context: Context) => {
        return await context.prisma.profile.findMany();
      },
    },

    profile: {
      type: ProfileType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, { id }: { id: string }, context: Context) => {
        const profile = await context.prisma.profile.findUnique({
          where: {
            id,
          },
        });
        return profile;
      },
    },
  },
});
