import { HttpErrors } from "@fastify/sensible/lib/httpError.js";
import { PrismaClient } from "@prisma/client";

export interface Context {
  prisma: PrismaClient;
  httpErrors: HttpErrors;
}