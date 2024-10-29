import { GraphQLEnumType, GraphQLObjectType, GraphQLInputObjectType,  GraphQLFloat, GraphQLInt } from 'graphql';

export const memberTypeId = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    BASIC: { value: 'BASIC' },
    BUSINESS: { value: 'BUSINESS' },
  },
});

export const memberType = new GraphQLObjectType({
  name: 'MemberTypeFields',
  fields: {
    id: { type: memberTypeId },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
  },
});

export const getMemberTypeByIdSchema = new GraphQLInputObjectType({
  name: 'GetMemberTypeByIdSchema',
  fields: {
    memberTypeId: { type: memberTypeId },
  },
});
