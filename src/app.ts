import { CheckAuthGuard, CheckRoleGuard } from '@guards';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { appConfig, databaseConfig, jwtConfig } from '@config';
import { SeedsModule } from '@seeds';
import {
  Brand,
  BrandModule,
  Address,
  AddressModule,
  Cart,
  CartItem,
  CartItemModule,
  CartModule,
  Category,
  CategoryModule,
  Comment,
  CommentModule,
  FileModule,
  Like,
  LikeModule,
  Order,
  OrderItems,
  OrderItemsModule,
  OrderModule,
  Product,
  ProductConfiguration,
  ProductConfigurationModule,
  ProductItem,
  ProductItemModule,
  ProductModule,
  Region,
  User,
  UserModule,
  Variation,
  VariationModule,
  VariationOption,
  VariationOptionModule,
  Color,
  ColorModule,
  Contact,
  ContactModule,
  TelegramModule,
  Banner,
  BannerModule,
  RegionModule,
  AuthModule,
} from '@modules';

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
          // synchronize: true,
          logging: true,

          // Agar kerak bo‘lsa quyidagilarni qo‘shish mumkin:
          // ssl: {
          //   rejectUnauthorized: false,
          // },

          dropSchema: true,
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
