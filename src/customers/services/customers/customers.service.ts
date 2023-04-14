import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from 'src/customers/dtos/CreateCustomer.dto';
import { Customer } from 'src/customers/types/Customer';

@Injectable()
export class CustomersService {
  private customers: Customer[] = [
    {
      id: 1,
      email: 'ankit@gmail.com',
      name: 'ankit',
    },
    {
      id: 2,
      email: 'chauhan@gmail.com',
      name: 'chauhan',
    },
    {
      id: 3,
      email: 'raj@gmail.com',
      name: 'raj',
    },
  ];

  findCustomerById(id: number) {
    return this.customers.find((customer) => customer.id === id);
  }

  getCustomers() {
    return this.customers;
  }

  createCustomer(customerDto: CreateCustomerDto) {
    this.customers.push(customerDto);
  }
}
