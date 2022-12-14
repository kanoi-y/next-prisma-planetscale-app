import { Button, Card, Loader } from '@mantine/core';
import type { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useBooks } from '../src/hooks/api/useBooks';
import { useCart } from '../src/hooks/useCart';

const Home: NextPage = () => {
  const router = useRouter();
  const { cart, addCart, totalQuantity } = useCart();
  const { data: books, isLoading } = useBooks();

  const purchaseBook = async (priceId: string | null) => {
    if (!priceId) return;
    const response = await fetch('/api/stripe/checkout-sessions', {
      method: 'POST',
      body: JSON.stringify({
        items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
      }),
    });

    const session = await response.json();

    router.push(session.url);
  };

  return (
    <div>
      <header className='px-8 py-4 shadow-md flex justify-between'>
        <h1>Book nob</h1>
        <Button onClick={() => router.push('/cart')}>
          Cart (4)
        </Button>
      </header>

      <div>
        {isLoading ? (
          <div className='flex justify-center items-center h-[492px]'>
            <Loader />
          </div>
        ) : (
          <div className='flex gap-4 p-8'>
            {books.map((book) => {
              return (
                <Card key={book.id} shadow='md' className='w-80'>
                  <div className='flex justify-between items-end'>
                    <h4>{book.title}</h4>
                    <div className='text-sm'>{book.author.name}</div>
                  </div>
                  <div className='mt-3 font-bold text-xl'>¥{book.price}</div>
                  <div className='relative h-52'>
                    <Image
                      src={book.image_url || ''}
                      alt=''
                      layout='fill'
                      objectFit='contain'
                    />
                  </div>
                  <p className='text-sm min-h-[60px]'>{book.description}</p>
                  <div className='flex gap-2'>
                    <Button
                      variant='light'
                      color='grape'
                      fullWidth
                      onClick={() => purchaseBook(book.stripe_price_id)}
                    >
                      Buy now
                    </Button>
                    <Button
                      variant='light'
                      color='blue'
                      fullWidth
                      onClick={() => addCart(book)}
                    >
                      Add a cart
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
