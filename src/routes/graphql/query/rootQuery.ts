import { GraphQLObjectType, GraphQLList, GraphQLNonNull } from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { memberType, memberTypeId } from './memberTypes.js';
import { postType } from './posts.js';
import { profileType } from './profiles.js';
import { userType } from './users.js';
import { Context } from '../types/context.js';

export const rootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    memberTypes: {
      type: new GraphQLNonNull(new GraphQLList(memberType)),
      resolve: async (_, __, context: Context) => {
        return await context.prisma.memberType.findMany();
      },
    },

    memberType: {
      type: memberType,
      args: {
        id: { type: new GraphQLNonNull(memberTypeId) },
      },
      resolve: async (_, { id }: { id: string }, context: Context) => {
        const memberType = await context.prisma.memberType.findUnique({
          where: {
            id,
          },
        });
        if (memberType === null) {
          throw context.httpErrors.notFound();
        }
        return memberType;
      },
    },

    users: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(userType))),
      resolve: async (_, __, context: Context) => {
        return await context.prisma.user.findMany();
      },
    },

    user: {
      type: userType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, { id }: { id: string }, context: Context) => {
        const user = await context.prisma.user.findUnique({
          where: {
            id,
          },
        });
        if (user === null) {
          throw context.httpErrors.notFound();
        }
        return user;
      },
    },

    posts: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(postType))),
      resolve: async (_, __, context: Context) => {
        return await context.prisma.post.findMany();
      },
    },

    post: {
      type: postType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, { id }: { id: string }, context: Context) => {
        const post = await context.prisma.post.findUnique({
          where: {
            id,
          },
        });
        if (post === null) {
          throw context.httpErrors.notFound();
        }
        return post;
      },
    },

    profiles: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(profileType))),
      resolve: async (_, __, context: Context) => {
        return await context.prisma.profile.findMany();
      },
    },

    profile: {
      type: profileType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, { id }: { id: string }, context: Context) => {
        const profile = await context.prisma.profile.findUnique({
          where: {
            id,
          },
        });
        if (profile === null) {
          throw context.httpErrors.notFound();
        }
        return profile;
      },
    },
  },
});
