import { Author, Book, User } from '@prisma/client';
type Book = Book;

type Author = Author;

type User = User;

type BookWithAuthor = Book & { author: Author };

type CartItem = BookWithAuthor & { quantity: number };
