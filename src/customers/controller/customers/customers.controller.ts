import {
  Controller,
  ParseIntPipe,
  Get,
  Param,
  HttpException,
  HttpStatus,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Delete,
} from '@nestjs/common';
import { CustomersService } from 'src/customers/services/customers/customers.service';
import { CreateCustomerDto } from '../../dtos/CreateCustomer.dto';
// import { create } from 'domain';

@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}
  @Get('/search/:id')
  getCustomer(@Param('id', ParseIntPipe) id: number) {
    const customer = this.customersService.findCustomerById(id);
    if (customer) return customer;
    else throw new HttpException('customer not found', HttpStatus.BAD_REQUEST);
  }

  @Get('')
  getAllCustomers() {
    return this.customersService.getCustomers();
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  createCustomer(@Body() dto: CreateCustomerDto) {
    // console.log(dto);
    this.customersService.createCustomer(dto);
  }
}
