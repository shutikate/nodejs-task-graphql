import { userType } from '../query/users.js';
import { profileType } from '../query/profiles.js';
import { postType } from '../query/posts.js';
import { CreateUserInput, ChangeUserInput } from './users.js';
import { CreateProfileInput, ChangeProfileInput } from './profiles.js';
import { CreatePostInput, ChangePostInput } from './posts.js';
import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql';
import { Context } from '../types/context.js';
import { UUIDType } from '../types/uuid.js';

export const RootMutations = new GraphQLObjectType({
  name: 'RootMutations',
  fields: {
    createUser: {
      type: new GraphQLNonNull(userType),
      args: {
        dto: { type: new GraphQLNonNull(CreateUserInput) },
      },
      resolve: async (
        _,
        { dto }: { dto: { name: string; balance: number } },
        context: Context,
      ) => {
        return await context.prisma.user.create({
          data: dto,
        });
      },
    },

    createProfile: {
      type: new GraphQLNonNull(profileType),
      args: {
        dto: { type: new GraphQLNonNull(CreateProfileInput) },
      },
      resolve: async (
        _,
        {
          dto,
        }: {
          dto: {
            isMale: boolean;
            yearOfBirth: number;
            userId: string;
            memberTypeId: string;
          };
        },
        context: Context,
      ) => {
        return await context.prisma.profile.create({
          data: dto,
        });
      },
    },

    createPost: {
      type: new GraphQLNonNull(postType),
      args: {
        dto: { type: new GraphQLNonNull(CreatePostInput) },
      },
      resolve: async (
        _,
        { dto }: { dto: { title: string; content: string; authorId: string } },
        context: Context,
      ) => {
        return await context.prisma.post.create({
          data: dto,
        });
      },
    },

    changePost: {
      type: new GraphQLNonNull(postType),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: ChangePostInput },
      },
      resolve: async (
        _,
        { id, dto }: { id: string; dto: { title?: string; content?: string } },
        context: Context,
      ) => {
        return await context.prisma.post.update({
          where: { id },
          data: dto,
        });
      },
    },

    changeProfile: {
      type: new GraphQLNonNull(profileType),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangeProfileInput) },
      },
      resolve: async (
        _,
        {
          id,
          dto,
        }: {
          id: string;
          dto: {
            isMale: boolean;
            yearOfBirth: number;
            userId: string;
            memberTypeId: string;
          };
        },
        context: Context,
      ) => {
        return await context.prisma.profile.update({
          where: { id },
          data: dto,
        });
      },
    },

    changeUser: {
      type: new GraphQLNonNull(userType),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangeUserInput) },
      },
      resolve: async (
        _,
        { id, dto }: { id: string; dto: { name?: string; balance?: number } },
        context: Context,
      ) => {
        return await context.prisma.user.update({
          where: { id },
          data: dto,
        });
      },
    },

    deleteUser: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, { id }: { id: string }, context: Context) => {
        const deleteUser = await context.prisma.user.delete({
          where: { id },
        });
        return JSON.stringify(deleteUser);
      },
    },

    deletePost: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, { id }: { id: string }, context: Context) => {
        const deletePost = await context.prisma.post.delete({
          where: { id },
        });
        return JSON.stringify(deletePost);
      },
    },

    deleteProfile: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, { id }: { id: string }, context: Context) => {
        const deleteProfile = await context.prisma.profile.delete({
          where: { id },
        });
        return JSON.stringify(deleteProfile);
      },
    },

    subscribeTo: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (
        _,
        { userId, authorId }: { userId: string; authorId: string },
        context: Context,
      ) => {
        const subscribersOnAuthors = await context.prisma.subscribersOnAuthors.create({
          data: {
            subscriberId: userId,
            authorId,
          },
        });
        return JSON.stringify(subscribersOnAuthors);
      },
    },

    unsubscribeFrom: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (
        _,
        { userId, authorId }: { userId: string; authorId: string },
        context: Context,
      ) => {
        const subscribersOnAuthors =  await context.prisma.subscribersOnAuthors.delete({
          where: {
            subscriberId_authorId: {
              subscriberId: userId,
              authorId,
            },
          },
        });
        return JSON.stringify(subscribersOnAuthors);
      },
    },
  },
});
