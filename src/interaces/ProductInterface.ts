export interface IProduct {
  name: string;
  description?: string;
  price: number;
  category?: string;
  inStock?: boolean;
  createdAt?: Date;
}
