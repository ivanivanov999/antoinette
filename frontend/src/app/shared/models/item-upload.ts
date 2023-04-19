export class ItemUpload{
  name!: string;
  price!: number;
  tags?: string[];
  category!: string;
  favorite!: boolean;
  origin?: string;
  description!: string;
  images!: File[];
}
