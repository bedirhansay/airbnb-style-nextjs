"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
import prisma from "../Utils/PrismaDB";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!currentUser) null;
    return {
      ...currentUser,
      createdAt: currentUser?.createdAt.toISOString(),
      updatedAt: currentUser?.updatedAt.toISOString(),
      emailVerified: currentUser?.emailVerified?.toISOString() ?? null,
    };
  } catch (error) {
    return null;
  }
}
