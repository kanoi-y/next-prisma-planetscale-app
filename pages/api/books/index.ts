import type { NextApiRequest, NextApiResponse } from 'next';
import { prismaBookFindMany } from '../../../prisma/apis/books';
import type { Book } from '../../../src/type';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Book[]>,
) {
  const books = await prismaBookFindMany();
  res.status(200).json(books);
}
