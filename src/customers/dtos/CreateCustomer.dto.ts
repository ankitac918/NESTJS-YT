import {
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsNumberString,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateAddressDto } from './CreateAddressDto';
import { Type } from 'class-transformer';

export class CreateCustomerDto {
  @IsEmail()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateNested()
  @Type(() => CreateAddressDto)
  // @IsNotEmptyObject()    //we have to add address if we add this validatin
  address: CreateAddressDto;
}
