import { BadRequestException } from '@nestjs/common';

export class ProductExistsException extends BadRequestException {
  constructor() {
    super('Product already exists');
  }
}
