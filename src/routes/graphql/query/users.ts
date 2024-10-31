import { GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLList } from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { profileType } from './profiles.js';
import { postType } from './posts.js';
import { Context } from '../types/context.js';

export const userType: GraphQLObjectType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },

    name: { type: new GraphQLNonNull(GraphQLString) },

    balance: { type: new GraphQLNonNull(GraphQLFloat) },

    profile: {
      type: profileType,
      resolve: async ({ id }: { id: string }, _, context: Context) => {
        const profile = await context.prisma.profile.findUnique({
          where: {
            userId: id,
          },
        });
        return profile;
      },
    },

    posts: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(postType))),
      resolve: async ({ id }: { id: string }, _, context: Context) => {
        return await context.prisma.post.findMany({
          where: {
            authorId: id,
          },
        });
      },
    },

    userSubscribedTo: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(userType))),
      resolve: async ({ id }: { id: string }, _, context: Context) => {
        return await context.prisma.user.findMany({
          where: {
            subscribedToUser: {
              some: {
                subscriberId: id,
              },
            },
          },
        });
      },
    },

    subscribedToUser: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(userType))),
      resolve: async ({ id }: { id: string }, _, context: Context) => {
        return await context.prisma.user.findMany({
          where: {
            userSubscribedTo: {
              some: {
                authorId: id,
              },
            },
          },
        });
      },
    },
  }),
});
