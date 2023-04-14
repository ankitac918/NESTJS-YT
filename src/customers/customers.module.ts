import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CustomersController } from './controller/customers/customers.controller';
import { CustomersService } from './services/customers/customers.service';
import { validateCustomerMiddleware } from './middlewares/validate-customer.middleware';
import { validateCustomerAccountMiddleware } from './middlewares/validate-customer-account.middleware';
import { NextFunction } from 'express';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        validateCustomerMiddleware,
        validateCustomerAccountMiddleware,
        (req: Request, res: Response, next: NextFunction) => {
          console.log('Last Middleware');
        },
      )
      .exclude(
        {
          path: 'customers/create',
          method: RequestMethod.POST,
        },
        {
          path: 'customers',
          method: RequestMethod.GET,
        },
      )
      .forRoutes(CustomersController);
  }
}
