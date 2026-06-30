import { Injectable } from '@nestjs/common';
import { Product } from '../interfaces/product.interface';
import { ProductsRepository } from './products.repository';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class InMemoryProductsRepository extends ProductsRepository {
  private products: Product[] = [];
  private currentId = 1;

  create(product: CreateProductDto): Promise<Product> {
    const newProduct = { ...product, id: this.currentId++ };
    this.products.push(newProduct);
    return Promise.resolve(newProduct);
  }

  findAll(): Promise<Product[]> {
    return Promise.resolve(this.products);
  }

  findById(id: number): Promise<Product | null> {
    const product = this.products.find((product) => product.id === id);
    return Promise.resolve(product || null);
  }

  update(id: number, product: UpdateProductDto): Promise<Product | null> {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) return Promise.resolve(null);
    this.products[index] = { ...this.products[index], ...product, id };
    return Promise.resolve(this.products[index]);
  }

  delete(id: number): Promise<boolean> {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) return Promise.resolve(false);
    this.products.splice(index, 1);
    return Promise.resolve(true);
  }
}
