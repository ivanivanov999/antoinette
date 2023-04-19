export class Item{
  id!: string;
  name!: string;
  price!: number;
  tags?: string[];
  category!: string;
  favorite!: boolean;
  imageUrl!: string[];
  origin?: string;
  description!: string;
  thumbnail!: string;
}

export interface Cover {
  imageUrl: string,
  quote: string,
  author: string
}
