import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Author } from '../../../src/type';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Author[]>,
) {
  /* 著者リストを取得 */
  const authors = await prisma.author.findMany();
  res.status(200).json(authors);
}
