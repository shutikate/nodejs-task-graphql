import depthLimit from 'graphql-depth-limit';
import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql, validate, parse } from 'graphql';
import { schema } from './schema.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const { query, variables } = req.body;

      const documentNode = parse(query);
      const validationError = validate(schema, documentNode, [depthLimit(5)]);
      if (validationError.length > 0) {
        return { errors: validationError };
      }

      const response = await graphql({
        schema,
        source: query,
        variableValues: variables,
        contextValue: { prisma }
      });

      return response;
    },
  });
};

export default plugin;
