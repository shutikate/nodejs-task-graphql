import { GraphQLObjectType, GraphQLList, GraphQLNonNull } from 'graphql';
import { memberType, memberTypeId } from './memberTypes.js';
import { Context } from '../types/context.js';

export const rootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    memberTypes: {
      type: new GraphQLList(memberType),
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
  },
});
