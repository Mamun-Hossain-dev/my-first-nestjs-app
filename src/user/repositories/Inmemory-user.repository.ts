import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from '../interfaces/user.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class InMemoryUserRepository extends UserRepository {
  private users: User[] = [];
  private currentId = 1;

  create(user: CreateUserDto): Promise<User> {
    const newUser = { ...user, id: this.currentId++ };
    this.users.push(newUser);
    return Promise.resolve(newUser);
  }

  findAll(): Promise<User[]> {
    return Promise.resolve(this.users);
  }

  findById(id: number): Promise<User | null> {
    const user = this.users.find((user) => user.id === id);
    return Promise.resolve(user || null);
  }

  update(id: number, user: UpdateUserDto): Promise<User | null> {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) return Promise.resolve(null);
    this.users[index] = { ...this.users[index], ...user, id };
    return Promise.resolve(this.users[index]);
  }

  delete(id: number): Promise<boolean> {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) return Promise.resolve(false);
    this.users.splice(index, 1);
    return Promise.resolve(true);
  }
}
