import { GraphQLBoolean, GraphQLNonNull, GraphQLInt, GraphQLObjectType } from 'graphql';
import { memberType, memberTypeId } from './memberTypes.js';
import { UUIDType } from '../types/uuid.js';
import { Context } from '../types/context.js';

export const profileType = new GraphQLObjectType({
  name: 'ProfileType',
  fields: {
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    userId: { type: new GraphQLNonNull(UUIDType) },
    memberTypeId: { type: new GraphQLNonNull(memberTypeId) },
    memberType: {
      type: new GraphQLNonNull(memberType),
      resolve: async ({ memberTypeId }: {memberTypeId: string}, _, context: Context) => {
        return await context.prisma.memberType.findUnique({
          where: {
            id: memberTypeId,
          },
        });
      },
    },
  },
});
