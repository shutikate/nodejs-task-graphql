import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "../types/uuid.js";

export const postType = new GraphQLObjectType({
  name: 'PostType',
  fields: {
    id: { type: new GraphQLNonNull (UUIDType) },
    title: { type: new GraphQLNonNull (GraphQLString) },
    content: { type: new GraphQLNonNull (GraphQLString) },
    authorId: { type: new GraphQLNonNull (UUIDType) },
  },
});
