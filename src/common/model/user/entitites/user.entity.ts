import { Prisma, Role } from '@prisma/client';
export class User implements Prisma.UserUncheckedCreateInput {
  id: string;
  email: string;
  password: string;
  address?: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  role?: Role;
}
