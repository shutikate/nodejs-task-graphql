import { GraphQLSchema } from 'graphql';
import { RootQuery } from './query/rootQuery.js';
import { RootMutations } from './mutation/rootMutations.js';

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutations,
});
