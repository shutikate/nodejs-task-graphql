import { GraphQLBoolean, GraphQLNonNull, GraphQLInt, GraphQLObjectType } from 'graphql';
import { MemberType } from './memberTypes.js';
import { UUIDType } from '../types/uuid.js';
import { Context } from '../types/context.js';

export const ProfileType = new GraphQLObjectType({
  name: 'ProfileType',
  fields: {

    id: { type: new GraphQLNonNull(UUIDType) },

    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },

    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },

    memberType: {
      type: new GraphQLNonNull(MemberType),
      resolve: async ({ memberTypeId }: {memberTypeId: string}, _, context: Context) => {
        return context.loaders.memberTypeLoader.load(memberTypeId);
      },
    },
  },
});
