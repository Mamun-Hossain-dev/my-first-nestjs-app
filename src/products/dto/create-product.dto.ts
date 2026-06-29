import { IsNumber, isNumber, IsString, isString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  title!: string;

  @IsNumber()
  price!: number;

  @IsNumber()
  quantity!: number;
}