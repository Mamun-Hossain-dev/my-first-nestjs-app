import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../interfaces/user.interface';

export abstract class UserRepository {
  abstract create(user: CreateUserDto): Promise<User>;
  abstract findAll(): Promise<User[]>;
  abstract findById(id: number): Promise<User | null>;
  abstract update(id: number, user: UpdateUserDto): Promise<User | null>;
  abstract delete(id: number): Promise<boolean>;
}
