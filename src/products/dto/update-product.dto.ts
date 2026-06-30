import { IsNumber, IsString } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  title?: string;

  @IsNumber()
  price?: number;

  @IsNumber()
  quantity?: number;
}
