import { Injectable, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/modules/user/models/user.model';
import { UserRoles } from 'src/modules/user/enums/user-roles.enum';
import { Category } from 'src/modules/category/models/category.model';
import { Brand } from 'src/modules/brand/models/brand.model';
import { Color } from 'src/modules/color/models/color.model';
import { Product } from 'src/modules/product/models/product.model';
import { Banner } from 'src/modules/banner/model/banner.model';
import { ProductItem } from 'src/modules/product_item/models/product_item.entity';
import { Variation } from 'src/modules/variation/models/variation.entity';
import { VariationOption } from 'src/modules/variation_option/models/variation_option.model';
import { ProductConfiguration } from 'src/modules/product_configuration/models/product_configuration.model';

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
    await this.seedVariation();
    await this.seedVariationOption();
    await this.seedProductConfiguration();
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
        {
          name: 'Kiryuvish mashinalari',
          image: '/kiryuvish_mashinasi.png',
          icon: '/kiryuvish_mashinasi.svg',
        },
        {
          name: 'Noutbuklar',
          image: '/noutbuklar.png',
          icon: '/noutbuklar.svg',
        },
        {
          name: 'Televizorlar',
          image: '/televizor.png',
          icon: '/televizor.svg',
        },
        {
          name: 'Muzlatkichlar',
          image: '/muzlakich.png',
          icon: '/muzlakich.svg',
        },
        {
          name: 'Konditsiyonerlar',
          image: '/konditsiyoner.png',
          icon: '/konditsiyoner.svg',
        },
        {
          name: 'Smartfonlar',
          image: '/smartfonlar.png',
          icon: '/smartfonlar.svg',
        },
        {
          name: 'Chang yutkichlar',
          image: '/changyutkich.jpg',
          icon: '/changyutkich.svg',
        },
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
    const productCount = await productRepo.count();

    if (productCount === 0) {
      const products = [
        {
          name: 'Смартфон Xiaomi 12 Lite 8/128Gb Қора kamera 48/68 px',
          category: { id: 2 },
          description:
            'Xiaomi 12 Lite – zamonaviy dizayn va kuchli kameraga ega smartfon.',
          nasiya: '6 oy',
          summary: 'Engil va kuchli smartfon, 120Hz AMOLED displey bilan.',
          price: 6999,
          rating: 5,
          is_aksiya: true,
          brand: { id: 4 },
          image: '/xiamo12lite.png',
          is_liked: false,
        },
        {
          name: 'Samsung Galaxy S25 Ultra',
          category: { id: 2 },
          description:
            'Samsung Galaxy S25 Ultra - yuqori sifatli kamera va kuchli protsessor bilan.',
          nasiya: '12 oy',
          summary:
            'Snapdragon 8 Gen 3 protsessor, 200 MP kamera va AMOLED 2X displey.',
          price: 11999,
          rating: 5,
          is_aksiya: false,
          brand: { id: 2 },
          image: '/s25ultra.png',
          is_liked: false,
        },
        {
          name: 'MacBook Pro M2 14-inch',
          category: { id: 3 },
          description:
            'Apple MacBook Pro M2 kuchli ishlash va uzoq batareya quvvati bilan ajralib turadi.',
          nasiya: '6 oy',
          summary:
            'Apple M2 chip, 14-inch Retina displey, 16GB RAM, 512GB SSD.',
          price: 19999,
          rating: 5,
          is_aksiya: true,
          brand: { id: 5 },
          image: '/macbookprom2.png',
          is_liked: false,
        },
        {
          name: 'AirPods Pro 2',
          category: { id: 4 },
          description:
            'Apple AirPods Pro 2 - faollikni bostirish funksiyasi bilan mukammal eshitish tajribasi.',
          nasiya: '6 oy',
          summary:
            'Active Noise Cancellation, Spatial Audio, va uzun batareya muddati.',
          price: 2499,
          rating: 4,
          is_aksiya: false,
          brand: { id: 5 },
          image: '/airpodspro2.png',
          is_liked: false,
        },
        {
          name: 'Play Station 5',
          category: { id: 4 },
          description: "Sony Play Station 5 osez kayp qib o'ynesiz.",
          nasiya: '12 oy',
          summary: 'Siz uchun 2 ta pult bonus',
          price: 599,
          rating: 4,
          is_aksiya: true,
          brand: { id: 5 },
          image: '/ps5.png',
          is_liked: false,
        },
        {
          name: 'Dell XPS 15 Laptop',
          category: { id: 3 },
          description:
            'Dell XPS 15 kuchli ishlash va mukammal ekran bilan eng yaxshi tanlov.',
          nasiya: '3 oy',
          summary: 'Intel Core i9, 32GB RAM, 1TB SSD, NVIDIA RTX 3050 Ti.',
          price: 17999,
          rating: 5,
          is_aksiya: true,
          brand: { id: 1 },
          image: '/dellxps5.png',
          is_liked: false,
        },
        {
          name: 'iPad Pro 12.9-inch (2023)',
          category: { id: 3 },
          description:
            'iPad Pro 12.9-inch kuchli Apple M2 chip va Liquid Retina XDR displey bilan.',
          nasiya: '12 oy',
          summary: 'Apple Pencil qo‘llab-quvvatlashi, 5G va Face ID.',
          price: 13999,
          rating: 5,
          is_aksiya: true,
          brand: { id: 5 },
          image: '/ipad12.png',
          is_liked: false,
        },
        {
          name: 'Bose QuietComfort 45',
          category: { id: 4 },
          description:
            'Bose QC 45 – aktiv shovqin kamaytirish bilan mukammal naushnik.',
          nasiya: '6 oy',
          summary: 'Bluetooth 5.1, 24 soat batareya muddati, USB-C zaryadlash.',
          price: 29999,
          rating: 3,
          is_aksiya: false,
          brand: { id: 6 },
          image: '/boseque.png',
          is_liked: false,
        },
        {
          name: 'Logitech MX Master 3S',
          category: { id: 7 },
          description:
            'Logitech MX Master 3S - eng yaxshi ergonomik sichqoncha.',
          nasiya: '3 oy',
          summary:
            'Uzoq batareya, ultra tez skroll, Bluetooth va USB-C zaryadlash.',
          price: 999,
          rating: 5,
          is_aksiya: true,
          brand: { id: 7 },
          image: '/logitech.png',
          is_liked: false,
        },
        {
          name: 'Canon EOS R5 Camera',
          category: { id: 6 },
          description:
            'Canon EOS R5 - professional 8K video yozish imkoniyati bilan kamera.',
          nasiya: '6 oy',
          summary: '45MP sensor, 8K video, Dual Pixel AF II.',
          price: 2399,
          rating: 5,
          is_aksiya: false,
          brand: { id: 6 },
          image: '/canon.png',
          is_liked: false,
        },
      ];

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
          description:
            "Orginallik va qulay narxni o'zida jamlagan Xiaomi 12 Mi Lite siz uchun eng yaxshi takliflarimizdan biridir!",
          image: 'banner_image1.png',
          name: 'Siz kutgan Xiaomi 12 Mi Lite',
        },
        {
          product: { id: 2 },
          description:
            'Samsung Galaxy S25 Ultra – yuqori sifatli kamera va kuchli protsessor bilan sizga ajoyib tajriba taqdim etadi.',
          image: 's25ultra.png',
          name: 'Samsung Galaxy S25 Ultra yangiliklari',
        },
        {
          product: { id: 3 },
          description:
            'MacBook Pro M2 bilan samaradorlik va kreativlikni birlashtiring. 14-inch Retina displey va M2 chip.',
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
      console.error(
        '❌ Error: No products found. Cannot insert product items.',
      );
      return;
    }

    if (productItemCount === 0) {
      const items = [
        {
          price: 2999999,
          image: 'xiamo12lite.png',
          product: { id: 1 },
          color: { id: 1 },
        },
        {
          price: 3499999,
          image: 's25ultra.png',
          product: { id: 2 },
          color: { id: 2 },
        },
        {
          price: 3999999,
          image: 'macbookprom2.png',
          product: { id: 3 },
          color: { id: 3 },
        },
        {
          price: 4499999,
          image: 'airpodspro2.png',
          product: { id: 4 },
          color: { id: 4 },
        },
        {
          price: 4999999,
          image: 'ps5.png',
          product: { id: 5 },
          color: { id: 5 },
        },
        {
          price: 5499999,
          image: 'dellxps5.png',
          product: { id: 6 },
          color: { id: 1 },
        },
        {
          price: 5999999,
          image: 'ipad12.png',
          product: { id: 7 },
          color: { id: 2 },
        },
        {
          price: 6499999,
          image: 'boseque.png',
          product: { id: 8 },
          color: { id: 3 },
        },
        {
          price: 6999999,
          image: 'logitech.png',
          product: { id: 9 },
          color: { id: 4 },
        },
        {
          price: 7499999,
          image: 'canon.png',
          product: { id: 9 },
          color: { id: 5 },
        },
      ];

      await productItemRepo.save(productItemRepo.create(items));
    }
  }

  async seedVariation(): Promise<void> {
    const variationRepo = this.dataSource.getRepository(Variation);
    const variationCount = await variationRepo.count();

    if (variationCount === 0) {
      const variations = [
        { name: 'Hajmi', category: { id: 1 } },
        { name: 'RAM', category: { id: 2 } },
        { name: 'Hotira', category: { id: 2 } },
        { name: 'Ekran hajmi', category: { id: 2 } },
        { name: 'Ekran hajmi', category: { id: 3 } },
        { name: "Umumiy og'irlik", category: { id: 4 } },
        { name: 'BTU', category: { id: 5 } },
        { name: 'RAM', category: { id: 6 } },
        { name: 'Hotira', category: { id: 6 } },
        { name: 'Ekran hajmi', category: { id: 6 } },
      ];

      await variationRepo.save(variationRepo.create(variations));
    }
  }

  async seedVariationOption(): Promise<void> {
    const variationOptionRepo = this.dataSource.getRepository(VariationOption);
    const variationOptionCount = await variationOptionRepo.count();

    if (variationOptionCount === 0) {
      const options = [
        { value: '15 Kg', variation: { id: 1 } },
        { value: '8 GB', variation: { id: 2 } },
        { value: '1 TB', variation: { id: 3 } },
        { value: '13.3-inch', variation: { id: 4 } },
        { value: '42', variation: { id: 1 } },
        { value: '180000', variation: { id: 7 } },
        { value: '12', variation: { id: 6 } },
        { value: '16 GB', variation: { id: 8 } },
        { value: '256', variation: { id: 9 } },
        { value: '5.9-inch', variation: { id: 10 } },
      ];

      await variationOptionRepo.save(variationOptionRepo.create(options));
    }
  }

  async seedProductConfiguration(): Promise<void> {
  const productConfigurationRepo = this.dataSource.getRepository(ProductConfiguration);

  const productConfigurationCount = await productConfigurationRepo.count();

  if (productConfigurationCount === 0) {
    const data = [
      { product_item_id: 3, variation_option_id: 2 },
      { product_item_id: 3, variation_option_id: 3 },
      { product_item_id: 3, variation_option_id: 4 },
      { product_item_id: 1, variation_option_id: 8 },
      { product_item_id: 1, variation_option_id: 9 },
      { product_item_id: 1, variation_option_id: 10 },
      { product_item_id: 2, variation_option_id: 8 },
      { product_item_id: 2, variation_option_id: 9 },
      { product_item_id: 2, variation_option_id: 10 },
    ];

    await productConfigurationRepo.save(data);
  }
}



}
