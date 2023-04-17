export class Item{
  id!: string;
  name!: string;
  price!: number;
  tags?: string[];
  category!: string;
  favorite!: boolean;
  imageUrl!: string[];
  origins?: string[];
  description!: string;
}

export interface Cover {
  imageUrl: string,
  quote: string,
  author: string
}
