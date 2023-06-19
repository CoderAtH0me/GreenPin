import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

import prisma from "@/lib/prismadb";

import { Session } from "next-auth";

export async function getSession() {
  const session = await getServerSession(authOptions);

  return session as Session;
}

export async function getUser() {
  try {
    const session = (await getSession()) as Session;

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (e: any) {
    return null;
  }
}
