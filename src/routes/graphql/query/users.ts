import { GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLList } from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { ProfileType } from './profiles.js';
import { PostType } from './posts.js';
import { Context } from '../types/context.js';

export const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },

    name: { type: new GraphQLNonNull(GraphQLString) },

    balance: { type: new GraphQLNonNull(GraphQLFloat) },

    profile: {
      type: ProfileType,
      resolve: async ({ id }: { id: string }, _, context: Context) => {
        return context.loaders.profileLoader.load(id);
      },
    },

    posts: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(PostType))),
      resolve: async ({ id }: { id: string }, _, context: Context) => {
        return context.loaders.postLoader.load(id);
      },
    },

    userSubscribedTo: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),

      resolve: async (
        { id }: { id: string },
        _,
        context: Context
      ) => {
        const cachedUser = await context.loaders.userLoader.load(id);

        if (!cachedUser?.userSubscribedTo) {
          return await context.prisma.user.findMany({
            where: {
              subscribedToUser: {
                some: {
                  subscriberId: id,
                },
              },
            },
          });
        };

        if (cachedUser?.userSubscribedTo?.length) {
          return cachedUser.userSubscribedTo.map((sub) => {
            return context.loaders.userLoader.load(sub.authorId);
          });
        } else {
          return [];
        };
      },
    },

    subscribedToUser: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
      resolve: async (
        { id }: { id: string },
        _,
        context: Context
      ) => {
        const cachedUser = await context.loaders.userLoader.load(id);

        if (!cachedUser?.subscribedToUser) {
          return await context.prisma.user.findMany({
            where: {
              userSubscribedTo: {
                some: {
                  authorId: id,
                },
              },
            },
          });
        }

        if (cachedUser?.subscribedToUser?.length) {
          return cachedUser.subscribedToUser.map((sub) => {
            return context.loaders.userLoader.load(sub.subscriberId);
          });
        } else {
          return [];
        };
      },
    },
  }),
});
