import { GraphQLSchema } from 'graphql';
import { rootQuery } from './query/rootQuery.js';

export const schema = new GraphQLSchema({
  query: rootQuery,
});
