import {
  GraphQLEnumType,
  GraphQLObjectType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLNonNull,
} from 'graphql';

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
    id: { type: new GraphQLNonNull(memberTypeId) },
    discount: { type: new GraphQLNonNull(GraphQLFloat) },
    postsLimitPerMonth: { type: new GraphQLNonNull(GraphQLInt) },
  },
});
