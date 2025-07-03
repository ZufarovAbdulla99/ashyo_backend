import { Region } from "./entity/region.entity";

export const regionSeedData: Partial<Region>[] = [
  {
    name: 'Toshkent Viloyati',
    type: 'REGION',
    parent: null,
  },
  {
    name: 'Toshkent shahri',
    type: 'CITY',
    parent: null,
  },
  {
    name: 'Uchtepa tumani',
    type: 'DISTRICT',
    parent: { id: 2 } as Region, // TypeORM expects object for relation
  },
  {
    name: 'Chilonzor tumani',
    type: 'DISTRICT',
    parent: { id: 2 } as Region,
  },
];
