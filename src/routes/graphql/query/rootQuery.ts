import { GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLResolveInfo } from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { MemberType, MemberTypeId } from './memberTypes.js';
import { PostType } from './posts.js';
import { ProfileType } from './profiles.js';
import { UserType } from './users.js';
import { Context } from '../types/context.js';
import { parseResolveInfo, ResolveTree } from 'graphql-parse-resolve-info';

export const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    memberTypes: {
      type: new GraphQLNonNull(new GraphQLList(MemberType)),
      resolve: async (_, __, context: Context) => {
        return context.prisma.memberType.findMany();
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
      resolve: async (_, __, context: Context, info: GraphQLResolveInfo) => {
        const parsedInfo = parseResolveInfo(info) as ResolveTree;
        const fields = parsedInfo.fieldsByTypeName.UserType;
        const includeUserSubscribeTo = fields.userSubscribedTo?.name === 'userSubscribedTo';
        const includeSubscribeToUser = fields.subscribedToUser?.name === 'subscribedToUser';

        if (includeUserSubscribeTo && includeSubscribeToUser) {
          const users = await context.prisma.user.findMany({
            include: {
              subscribedToUser: true,
              userSubscribedTo: true,
            },
          });
          users.forEach((user) => context.loaders.userLoader.prime(user.id, user));
          return users;
        }

        if (includeUserSubscribeTo) {
          const users = await context.prisma.user.findMany({
            include: {
              userSubscribedTo: true,
            },
          });

          users.forEach((user) => {
            context.loaders.userLoader.prime(user.id, user);
          });

          return users;
        }

        if (includeSubscribeToUser) {
          const users = await context.prisma.user.findMany({
            include: {
              subscribedToUser: true,
            },
          });

          users.forEach((user) => {
            context.loaders.userLoader.prime(user.id, user);
          });

          return users;
        }

        const users = await context.prisma.user.findMany();
        users.forEach((user) => {
          context.loaders.userLoader.prime(user.id, user);
        });
        return users;
      },
    },

    user: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, {id}: {id: string}, context: Context) => {
        return context.prisma.user.findUnique({
          where: {
            id,
          },
        });
      },
    },

    posts: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(PostType))),
      resolve: async (_, __, context: Context) => {
        return context.prisma.post.findMany();
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
        return context.prisma.profile.findMany();
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
