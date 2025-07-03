import { CheckAuthGuard, CheckRoleGuard } from '@guards';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { appConfig, databaseConfig, jwtConfig } from '@config';
import { User } from './modules/user/models/user.model';
import { Like } from './modules/like/models/like.model';
import { Comment } from './modules/comment/models/comment.model';
import { Cart } from './modules/cart/models/cart.model';
import { CartItem } from './modules/cart_item/models/cart_item.model';
import { Order } from './modules/order/models/order.model';
import { OrderItems } from './modules/order_items/models/order_item.entity';
import { ProductConfiguration } from './modules/product_configuration/models/product_configuration.model';
import { ProductItem } from './modules/product_item/models/product_item.entity';
import { Variation } from './modules/variation/models/variation.entity';
import { VariationOption } from './modules/variation_option/models/variation_option.model';
import { Region } from './modules/region/entity/region.entity';
import { Product } from './modules/product/models/product.model';
import { Category } from './modules/category/models/category.model';
import { Brand } from './modules/brand/models/brand.model';
import { Contact } from './modules/contact/models/contact.model';
import { Banner } from './modules/banner/model/banner.model';
import { Address } from './modules/address/entity/address.entity';
import { Color } from './modules/color/models/color.model';
import { UserModule } from './modules/user/user.module';
import { RegionModule } from './modules/region/region.module';
import { AuthModule } from './modules/auth/auth.module';
import { FileModule } from './modules/file/file.module';
import { LikeModule } from './modules/like/like.module';
import { CommentModule } from './modules/comment/comment.module';
import { CartModule } from './modules/cart/cart.module';
import { CartItemModule } from './modules/cart_item/cart_item.module';
import { OrderModule } from './modules/order/order.module';
import { OrderItemsModule } from './modules/order_items/order_items.module';
import { ProductConfigurationModule } from './modules/product_configuration/product_configuration.module';
import { ProductItemModule } from './modules/product_item/product_item.module';
import { VariationModule } from './modules/variation/variation.module';
import { VariationOptionModule } from './modules/variation_option/variation_option.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
import { BrandModule } from './modules/brand/brand.module';
import { SeedsModule } from './seeds/seeds.module';
import { AddressModule } from './modules/address/address.module';
import { BannerModule } from './modules/banner/banner.module';
import { ColorModule } from './modules/color/color.module';
import { ContactModule } from './modules/contact/contact.module';
import { TelegramModule } from './modules/telegram/telegram.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, jwtConfig],
    }),
    ServeStaticModule.forRoot({
      serveRoot: '/uploads',
      rootPath: './uploads',
    }),
    JwtModule.register({
      secret: 'ashyosite',
      global: true,
      signOptions: {
        expiresIn: 60 * 15,
      },
    }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (config: ConfigService) => {
    //     try {
    //       return {
    //         type: 'postgres',
    //         host: config.get<string>('databaseConfig.host'),
    //         port: config.get<number>('databaseConfig.port'),
    //         username: config.get<string>('databaseConfig.user'),
    //         password: config.get<string>('databaseConfig.password'),
    //         database: config.get<string>('databaseConfig.dbname'),
    //         entities: [
    //           User,
    //           Like,
    //           Comment,
    //           Cart,
    //           CartItem,
    //           Order,
    //           OrderItems,
    //           ProductConfiguration,
    //           ProductItem,
    //           Variation,
    //           VariationOption,
    //           Region,
    //           Product,
    //           Category,
    //           Brand,
    //           Contact,
    //           Banner,
    //           Address,
    //           Color
    //         ],
    //         // synchronize: true,
    //         logging: true,
    //       };
    //     } catch (error) {
    //       console.error('Error occurred while connecting to the database', error);
    //       throw error;
    //     }
    //   },
    // }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const url = config.get<string>('databaseConfig.url');

        if (!url) {
          throw new Error(
            'DATABASE_URL is not defined in the environment variables',
          );
        }

        return {
          type: 'postgres',
          url, // URL orqali ulanish
          entities: [
            User,
            Like,
            Comment,
            Cart,
            CartItem,
            Order,
            OrderItems,
            ProductConfiguration,
            ProductItem,
            Variation,
            VariationOption,
            Region,
            Product,
            Category,
            Brand,
            Contact,
            Banner,
            Address,
            Color,
          ],
          autoLoadEntities: true,
          synchronize: true,
          logging: true,

          // Agar kerak bo‘lsa quyidagilarni qo‘shish mumkin:
          // ssl: {
          //   rejectUnauthorized: false,
          // },

          dropSchema: false,
          // dropSchema: true,
        };
      },
    }),
    UserModule,
    RegionModule,
    AuthModule,
    FileModule,
    LikeModule,
    CommentModule,
    CartModule,
    CartItemModule,
    OrderModule,
    OrderItemsModule,
    ProductConfigurationModule,
    ProductItemModule,
    VariationModule,
    VariationOptionModule,
    CategoryModule,
    ProductModule,
    BrandModule,
    SeedsModule,
    AddressModule,
    BannerModule,
    ColorModule,
    ContactModule,
    TelegramModule,
  ],
  controllers: [],
  providers: [
    //  {
    //    useClass: CheckAuthGuard,
    //    provide: APP_GUARD,
    //  },
    //  {
    //    useClass: CheckRoleGuard,
    //    provide: APP_GUARD,
    //  },
  ],
})
export class AppModule {}
