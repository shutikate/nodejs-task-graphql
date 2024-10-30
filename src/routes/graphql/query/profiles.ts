import { GraphQLBoolean, GraphQLNonNull, GraphQLInt, GraphQLObjectType } from 'graphql';
import { memberType } from './memberTypes.js';
import { UUIDType } from '../types/uuid.js';

export const profileType = new GraphQLObjectType({
  name: 'ProfileType',
  fields: {
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    // userId: { type: new GraphQLNonNull(UUIDType) },
    memberType: { type: new GraphQLNonNull(memberType) },
  },
});
