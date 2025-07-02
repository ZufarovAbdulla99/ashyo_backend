import {
  Banner,
  Brand,
  Category,
  Color,
  Product,
  ProductItem,
  User,
  UserRoles,
} from '@modules';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedsService implements OnModuleInit {
  constructor(private dataSource: DataSource) {}

  async onModuleInit() {
    await this.seedUsers();
    await this.seedCategory();
    await this.seedBrand();
    await this.seedColor();
    await this.seedProduct();
    await this.seedBanner();
    await this.seedProductItem();
  }

  async seedUsers(): Promise<void> {
    const userRepo = this.dataSource.getRepository(User);
    const usersCount = await userRepo.count();

    if (usersCount === 0) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      await userRepo.save(
        userRepo.create({
          fullname: 'Abdulla Zufarov',
          email: 'zufarovabdulla08@gmail.com',
          phone_number: '+998000010000',
          image: '/ahmad_aka.jpg_6f5b92c6-44a8-47ae-9101-972a2c8982b4.jpg',
          password: hashedPassword,
          is_verified: true,
          role: UserRoles.admin,
        }),
      );
    }
  }

  async seedCategory(): Promise<void> {
    const categoryRepo = this.dataSource.getRepository(Category);
    const categoryCount = await categoryRepo.count();

    if (categoryCount === 0) {
      const categories = [
        { name: 'Kiryuvish mashinalari', image: '/kiryuvish_mashinasi.png', icon: '/kiryuvish_mashinasi.svg' },
        { name: 'Noutbuklar', image: '/noutbuklar.png', icon: '/noutbuklar.svg' },
        { name: 'Televizorlar', image: '/televizor.png', icon: '/televizor.svg' },
        { name: 'Muzlatkichlar', image: '/muzlakich.png', icon: '/muzlakich.svg' },
        { name: 'Konditsiyonerlar', image: '/konditsiyoner.png', icon: '/konditsiyoner.svg' },
        { name: 'Smartfonlar', image: '/smartfonlar.png', icon: '/smartfonlar.svg' },
        { name: 'Chang yutkichlar', image: '/changyutkich.jpg', icon: '/changyutkich.svg' },
      ];
      await categoryRepo.save(categoryRepo.create(categories));
    }
  }

  async seedBrand(): Promise<void> {
    const brandRepo = this.dataSource.getRepository(Brand);
    const count = await brandRepo.count();

    if (count === 0) {
      const brands = [
        { name: 'Artel', image: '/artel.png' },
        { name: 'Samsung', image: '/samsung_brand.png' },
        { name: 'Nokia', image: '/nokia.png' },
        { name: 'Mi', image: '/mi.png' },
        { name: 'Apple', image: '/apple.png' },
        { name: 'Vivo', image: '/vivo.png' },
        { name: 'Huwavei', image: '/huwavei.png' },
      ];
      await brandRepo.save(brandRepo.create(brands));
    }
  }

  async seedColor(): Promise<void> {
    const colorRepo = this.dataSource.getRepository(Color);
    const count = await colorRepo.count();

    if (count === 0) {
      const colors = [
        { name: 'Red', color_code: '#FF0000' },
        { name: 'Blue', color_code: '#0000FF' },
        { name: 'Green', color_code: '#008000' },
        { name: 'Black', color_code: '#000000' },
        { name: 'White', color_code: '#FFFFFF' },
      ];
      await colorRepo.save(colorRepo.create(colors));
    }
  }

  async seedProduct(): Promise<void> {
    const productRepo = this.dataSource.getRepository(Product);
    const count = await productRepo.count();

    if (count === 0) {
      const products = [/* barcha productlar obj sifatida shu yerga joylashadi */];
      await productRepo.save(productRepo.create(products));
    }
  }

  async seedBanner(): Promise<void> {
    const bannerRepo = this.dataSource.getRepository(Banner);
    const count = await bannerRepo.count();

    if (count === 0) {
      const banners = [
        {
          product: { id: 1 }, // or `product_id: 1` if foreign key is stored like this
          description: "Orginallik va qulay narxni o'zida jamlagan Xiaomi 12 Mi Lite siz uchun eng yaxshi takliflarimizdan biridir!",
          image: 'banner_image1.png',
          name: 'Siz kutgan Xiaomi 12 Mi Lite',
        },
        {
          product: { id: 2 },
          description: 'Samsung Galaxy S25 Ultra – yuqori sifatli kamera va kuchli protsessor bilan sizga ajoyib tajriba taqdim etadi.',
          image: 's25ultra.png',
          name: 'Samsung Galaxy S25 Ultra yangiliklari',
        },
        {
          product: { id: 3 },
          description: 'MacBook Pro M2 bilan samaradorlik va kreativlikni birlashtiring. 14-inch Retina displey va M2 chip.',
          image: 'macbookprom2.png',
          name: 'MacBook Pro M2 – Kuchli va Ishonchli',
        },
      ];
      await bannerRepo.save(bannerRepo.create(banners));
    }
  }

  async seedProductItem(): Promise<void> {
    const productItemRepo = this.dataSource.getRepository(ProductItem);
    const productRepo = this.dataSource.getRepository(Product);

    const productCount = await productRepo.count();
    const productItemCount = await productItemRepo.count();

    if (productCount === 0) {
      console.error('❌ Error: No products found. Cannot insert product items.');
      return;
    }

    if (productItemCount === 0) {
      const items = [
        { price: 2999999, image: 'xiamo12lite.png', product: { id: 1 }, color: { id: 1 } },
        { price: 3499999, image: 's25ultra.png', product: { id: 2 }, color: { id: 2 } },
        { price: 3999999, image: 'macbookprom2.png', product: { id: 3 }, color: { id: 3 } },
        { price: 4499999, image: 'airpodspro2.png', product: { id: 4 }, color: { id: 4 } },
        { price: 4999999, image: 'ps5.png', product: { id: 5 }, color: { id: 5 } },
        { price: 5499999, image: 'dellxps5.png', product: { id: 6 }, color: { id: 1 } },
        { price: 5999999, image: 'ipad12.png', product: { id: 7 }, color: { id: 2 } },
        { price: 6499999, image: 'boseque.png', product: { id: 8 }, color: { id: 3 } },
        { price: 6999999, image: 'logitech.png', product: { id: 9 }, color: { id: 4 } },
        { price: 7499999, image: 'canon.png', product: { id: 9 }, color: { id: 5 } },
      ];

      await productItemRepo.save(productItemRepo.create(items));
    }
  }
}
