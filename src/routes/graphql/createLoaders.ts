import { PrismaClient, Post } from "@prisma/client";
import DataLoader from "dataloader";
import { Loaders } from "./types/loaders.js";

export const createLoaders = (prisma: PrismaClient): Loaders => {
  return {
    memberTypeLoader: new DataLoader(async (keys: readonly string[]) => {
      const memberTypesData = await prisma.memberType.findMany({
        where: {
          id: { in: keys as string[] },
        },
      });
      return keys.map((key) =>
        memberTypesData.find((memberType) => memberType.id === key),
      );
    }),

    userLoader: new DataLoader(async (keys: readonly string[]) => {
      const userData = await prisma.user.findMany({
        where: {
          id: { in: keys as string[] },
        },
      });
      return keys.map((key) => userData.find((user) => user.id === key));
    }),

    postLoader: new DataLoader(async (keys: readonly string[]) => {
      const postData = await prisma.post.findMany({
        where: {
          authorId: { in: keys as string[] },
        },
      });

      const posts = new Map<string, Post[]>();
      postData.forEach((post) => {
        const postList = posts.get(post.authorId) || [];
        postList.push(post);
        posts.set(post.authorId, postList);
      });

      return keys.map((key) => posts.get(key) || []);
    }),

    profileLoader: new DataLoader(async (keys: readonly string[]) => {
      const profileData = await prisma.profile.findMany({
        where: {
          userId: { in: keys as string[] },
        },
      });
      return keys.map((key) => profileData.find((profile) => profile.userId === key));
    }),
  };
};
