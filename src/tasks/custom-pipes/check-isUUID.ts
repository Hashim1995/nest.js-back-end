import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
// gloval middleware for if uuis is valid
const UUID_REGULAR_EXPRESSION =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[4][0-9a-fA-F]{3}-[89AB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/i;

export class CheckIsUUID implements PipeTransform<string, string> {
  transform(value: string, metadata: ArgumentMetadata): string {
    if (!UUID_REGULAR_EXPRESSION.test(value)) {
      throw new BadRequestException(['Invalid UUID format']);
    }
    return value;
  }
}
