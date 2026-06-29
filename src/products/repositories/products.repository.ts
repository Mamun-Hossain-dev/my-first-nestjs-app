import { Product } from "../interfaces/product.interface";
import { CreateProductDto } from "../dto/create-product.dto";
import { UpdateProductDto } from "../dto/update-product.dto";

export abstract class ProductsRepository {
  abstract create(product: CreateProductDto): Promise<Product>;
  abstract findAll(): Promise<Product[]>;
  abstract findById(id: number): Promise<Product | null>;
  abstract update(id: number, product: UpdateProductDto): Promise<Product | null>;
  abstract delete(id: number): Promise<boolean>;
}
