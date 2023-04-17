export class ItemUpload{
  name!: string;
  price!: number;
  tags?: string[];
  category!: string;
  favorite!: boolean;
  origins?: string[];
  description!: string;
  images!: File[];
}
