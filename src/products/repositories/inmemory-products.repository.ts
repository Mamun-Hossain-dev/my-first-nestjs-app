import { Injectable } from "@nestjs/common";
import { Product } from "../interfaces/product.interface";
import { ProductsRepository } from "./products.repository";
import { CreateProductDto } from "../dto/create-product.dto";
import { UpdateProductDto } from "../dto/update-product.dto";

@Injectable()
export class InMemoryProductsRepository extends ProductsRepository {
  private products: Product[] = [];
  private currentId = 1;

  async create(product: CreateProductDto ): Promise<Product> {
    const newProduct = { ...product, id: this.currentId++ };
    this.products.push(newProduct);
    return newProduct;
  }

  async findAll(): Promise<Product[]> {
    return this.products;
  }

  async findById(id: number): Promise<Product | null> {
    return this.products.find(product => product.id === id) || null;
  }

  async update(id: number, product: UpdateProductDto): Promise<Product | null> {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) return null;
    this.products[index] = { ...this.products[index], ...product, id };
    return this.products[index];
  }

  async delete(id: number): Promise<boolean> {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) return false;
    this.products.splice(index, 1);
    return true;
  }
}
