
type Book = {
  id: number;
  stripe_product_id?: string;
  stripe_price_id?: string;
  title: string;
  description: string;
  authorId: number;
  price: number;
};

type Author = {
  id: number;
  name: string;
};

type User = {
  uid: string;
  stripe_customer_id?: string;
  name: string;
  email: string;
  plan: 'free' | 'pro';
};
