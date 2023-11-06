import { BadRequestException } from '@nestjs/common';

export class CategoryExistsException extends BadRequestException {
  constructor() {
    super('Category already exists');
  }
}
