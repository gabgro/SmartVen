import { Module } from '@nestjs/common';
import { UserModule } from './User/User.module';
import { AccountModule } from './Account/Account.module';
import { CategoryModule } from './Category/Category.module';
import { ProductModule } from './Product/Product.module';
import { SaleModule } from './Sale/Sale.module';

@Module({
  imports: [
    UserModule,
    AccountModule,
    CategoryModule,
    ProductModule,
    SaleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
