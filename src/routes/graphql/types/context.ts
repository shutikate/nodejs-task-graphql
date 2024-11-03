import { PrismaClient } from "@prisma/client";
import { Loaders } from "./loaders.js";

export interface Context {
  prisma: PrismaClient;
  loaders: Loaders;
}
