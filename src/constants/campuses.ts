export interface CampusInfo {
  id: string;
  name: string;
  province: string;
  address: string;
}

export const OFFICIAL_CAMPUSES: CampusInfo[] = [
  {
    id: 'bryanston',
    name: 'Bryanston',
    province: 'Gauteng',
    address: 'Main Road & Bryanston Drive, Sandton, Johannesburg',
  },
  {
    id: 'newtown',
    name: 'Newtown Junction',
    province: 'Gauteng',
    address: 'Miriam Makeba St, Newtown Junction, Johannesburg',
  },
  {
    id: 'pretoria',
    name: 'Pretoria',
    province: 'Gauteng',
    address: '220 Du Toit St, Pretoria Central, Pretoria',
  },
  {
    id: 'centurion',
    name: 'Centurion',
    province: 'Gauteng',
    address: '1004 Lenchen Ave North, Centurion, Pretoria',
  },
  {
    id: 'umhlanga',
    name: 'Umhlanga',
    province: 'KwaZulu-Natal',
    address: 'Umhlanga Ridge, Durban North, KwaZulu-Natal',
  },
  {
    id: 'musgrave',
    name: 'Musgrave',
    province: 'KwaZulu-Natal',
    address: 'Musgrave Road, Berea, Durban, KwaZulu-Natal',
  },
  {
    id: 'capetown',
    name: 'Cape Town CBD',
    province: 'Western Cape',
    address: '43 Adderley Street, Cape Town CBD, Western Cape',
  },
  {
    id: 'polokwane',
    name: 'Polokwane',
    province: 'Limpopo',
    address: '54 Grobler Street, Polokwane, Limpopo',
  },
];

export const CAMPUS_NAMES = OFFICIAL_CAMPUSES.map((c) => c.name);
