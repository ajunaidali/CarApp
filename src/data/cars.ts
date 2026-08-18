export type Car = {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  images: string[];
  mileage: string;
  fuel: string;
  transmission: string;
  engine: string;
  color: string;
  bodyType: string;
  horsepower: number;
  features: string[];
  description: string;
  category: string;
  dealer: {
    name: string;
    location: string;
    phone: string;
  };
};

export const cars: Car[] = [
  {
    id: 'car-1',
    brand: 'BMW',
    model: 'M3 Competition',
    year: 2024,
    price: 89000,
    images: [
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=900&q=80',
    ],
    mileage: '12,400 mi',
    fuel: 'Petrol',
    transmission: 'Automatic',
    engine: '3.0L Twin-Turbo I6',
    color: 'Alpine White',
    bodyType: 'Coupe',
    horsepower: 503,
    category: 'Coupe',
    features: ['Apple CarPlay', 'Android Auto', 'Parking Sensors', 'Rear Camera', 'Sunroof', 'Leather Seats', 'Bluetooth', 'Cruise Control'],
    description: 'A performance-focused coupe blending dynamics and everyday comfort with a refined cabin and unmistakable BMW character.',
    dealer: {
      name: 'Velvet Motors',
      location: 'Downtown Los Angeles',
      phone: '+1 (310) 555-2020',
    },
  },
  {
    id: 'car-2',
    brand: 'Mercedes-Benz',
    model: 'C 300 AMG Line',
    year: 2023,
    price: 76000,
    images: [
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80',
    ],
    mileage: '9,800 mi',
    fuel: 'Hybrid',
    transmission: 'Automatic',
    engine: '2.0L Turbo Hybrid',
    color: 'Obsidian Black',
    bodyType: 'Sedan',
    horsepower: 255,
    category: 'Sedan',
    features: ['Apple CarPlay', 'Parking Sensors', 'Rear Camera', 'Leather Seats', 'Bluetooth', 'Cruise Control'],
    description: 'Elegant luxury with a strong road presence, premium cabin detailing, and smooth efficiency for city and highway travel.',
    dealer: {
      name: 'Silverline Auto',
      location: 'Beverly Hills',
      phone: '+1 (323) 555-2041',
    },
  },
  {
    id: 'car-3',
    brand: 'Audi',
    model: 'Q7 Prestige',
    year: 2024,
    price: 95000,
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=80',
    ],
    mileage: '13,500 mi',
    fuel: 'Petrol',
    transmission: 'Automatic',
    engine: '3.0L V6',
    color: 'Nardo Gray',
    bodyType: 'SUV',
    horsepower: 335,
    category: 'SUV',
    features: ['Apple CarPlay', 'Android Auto', 'Parking Sensors', 'Rear Camera', 'Sunroof', 'Leather Seats', 'Bluetooth', 'Cruise Control'],
    description: 'Commanding SUV styling, spacious three-row comfort, and premium technology for growing families and road trips.',
    dealer: {
      name: 'Apex Luxury Group',
      location: 'West Hollywood',
      phone: '+1 (424) 555-3210',
    },
  },
  {
    id: 'car-4',
    brand: 'Toyota',
    model: 'Corolla GR Sport',
    year: 2023,
    price: 42000,
    images: [
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=900&q=80',
    ],
    mileage: '18,200 mi',
    fuel: 'Petrol',
    transmission: 'Manual',
    engine: '2.0L Inline-4',
    color: 'Supersonic Red',
    bodyType: 'Hatchback',
    horsepower: 169,
    category: 'Hatchback',
    features: ['Apple CarPlay', 'Bluetooth', 'Rear Camera', 'Cruise Control', 'Parking Sensors'],
    description: 'Compact, efficient, and confident with sharp handling and everyday practicality designed for modern drivers.',
    dealer: {
      name: 'Northside Auto',
      location: 'Santa Monica',
      phone: '+1 (310) 555-1114',
    },
  },
  {
    id: 'car-5',
    brand: 'Honda',
    model: 'e:Ny1',
    year: 2024,
    price: 47000,
    images: [
      'https://images.unsplash.com/photo-1593941707882-a5bac6861d75?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=900&q=80',
    ],
    mileage: '6,400 mi',
    fuel: 'Electric',
    transmission: 'Automatic',
    engine: 'Electric Motor',
    color: 'Pearl Silver',
    bodyType: 'SUV',
    horsepower: 201,
    category: 'Electric',
    features: ['Apple CarPlay', 'Android Auto', 'Rear Camera', 'Bluetooth', 'Cruise Control', 'Parking Sensors'],
    description: 'An efficient EV with a refined cabin, instant torque delivery, and a clean connected driving experience.',
    dealer: {
      name: 'Electric Avenue',
      location: 'San Fernando Valley',
      phone: '+1 (818) 555-7772',
    },
  },
  {
    id: 'car-6',
    brand: 'Mercedes-Benz',
    model: 'GLE 350',
    year: 2022,
    price: 71000,
    images: [
      'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=900&q=80',
    ],
    mileage: '22,900 mi',
    fuel: 'Diesel',
    transmission: 'Automatic',
    engine: '2.0L Diesel',
    color: 'Graphite Gray',
    bodyType: 'SUV',
    horsepower: 255,
    category: 'SUV',
    features: ['Apple CarPlay', 'Parking Sensors', 'Rear Camera', 'Sunroof', 'Leather Seats', 'Bluetooth', 'Cruise Control'],
    description: 'A premium SUV designed for versatile family life with luxury details, safety richness, and a composed ride.',
    dealer: {
      name: 'Imperial Motorworks',
      location: 'Pasadena',
      phone: '+1 (626) 555-4321',
    },
  },
];

export const categories = ['SUV', 'Sedan', 'Coupe', 'Hatchback', 'Electric'];

export const brands = ['BMW', 'Mercedes-Benz', 'Audi', 'Toyota', 'Honda'];
