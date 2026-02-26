export interface Seller {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviews: number;
  joinedDate: string;
  description: string;
  response_rate?: number;
  response_time?: string;
  verified: boolean;
}

export interface Item {
  id: string;
  name: string;
  price: string;
  category: string;
  image: string;
  description: string;
  fullDescription?: string;
  distance?: string;
  address?: string;
  delivery?: boolean;
  paymentMethods?: {
    card: boolean;
    cash: boolean;
    online?: boolean;
  };
  features?: string[];
  seller: Seller;
}

export const SELLERS: Record<string, Seller> = {
  'anna': {
    id: 'anna',
    name: 'Anna Lee',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 4.8,
    reviews: 127,
    joinedDate: 'March 2022',
    description: 'Sell high-quality items. I personally check each item before selling it. I respond to messages quickly.',
    response_rate: 98,
    response_time: 'Hour',
    verified: true
  },
  'dmitry': {
    id: 'dmitry',
    name: 'Dmitry Volkov',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 4.5,
    reviews: 83,
    joinedDate: 'November 2023',
    description: 'I sell electronics. All products are new and come with a warranty. I am officially registered.',
    response_rate: 95,
    response_time: '2 hours',
    verified: true
  },
  'elena': {
    id: 'elena',
    name: 'Helena Jestkovic',
    avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
    rating: 4.9,
    reviews: 215,
    joinedDate: 'January 2018',
    description: 'Interior designer, selling furniture and decor. I help with selection and delivery.',
    response_rate: 100,
    response_time: '30 min',
    verified: true
  },
  'alexey': {
    id: 'alexey',
    name: 'Geek Center',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    rating: 4.2,
    reviews: 42,
    joinedDate: 'August 2024',
    description: 'I sell bicycles and sports equipment. I am a cycling enthusiast myself and can advise you on your choice.',
    response_rate: 88,
    response_time: 'During the day',
    verified: false
  }
};

export const ITEMS: Item[] = [
  {
    id: '1',
    name: 'Apartments with panoramic views near Central Park',
    price: '194 176 $',
    category: 'Estate',
    image: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop&auto=format',
    description: 'Two-room apartment with designer renovation, 55 m²',
    fullDescription: 'A spacious two-bedroom apartment in the heart of the city. Modern designer renovation using premium materials. Panoramic windows overlook the park. Heated floors in all rooms. Air conditioning. Built-in kitchen. Viewing is possible at any time. An excellent option for a family or an investment. Well-developed infrastructure nearby: schools, kindergartens, shops. Transportation accessibility is excellent.',
    distance: '500 meters from you',
    address: 'Central Street, Building 15, Apt. 42',
    delivery: false,
    paymentMethods: {
      card: true,
      cash: false,
      online: false
    },
    features: ['2 rooms', '55 m²', '3 floor', 'Panoramic windows', 'Clean renovation'],
    seller: SELLERS['anna']
  },
  {
    id: '2',
    name: 'iPhone 15 Pro Max 256GB Titanium',
    price: '999 $',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=300&fit=crop&auto=format',
    description: 'New, 1 year warranty, 256GB, titan',
    fullDescription: 'Original iPhone 15 Pro Max in a titanium case. Natural Titanium color. A17 Pro processor, 8GB of RAM, 256GB of storage. 48MP main camera with 5x optical zoom. Dynamic Focus Island. USB-C port. Includes phone, cable, and documentation. One-year warranty from an authorized service center. Negotiable. Inspect before purchase.',
    distance: '20 kilometers from you',
    address: 'MEGA Shopping Center, 2nd floor, iStore',
    delivery: true,
    paymentMethods: {
      card: true,
      cash: true,
      online: true
    },
    features: ['256GB', 'Titanium', 'A17 Pro', '48MP camera', 'USB-C'],
    seller: SELLERS['dmitry']
  },
  {
    id: '3',
    name: 'Mountain Bike Trek',
    price: '300 $',
    category: 'Sport',
    image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=400&h=300&fit=crop&auto=format',
    description: 'Trek, 27.5 wheel, hydraulic brakes',
    fullDescription: 'This is a great Trek mountain bike. Aluminum frame, size M (for heights 170-185 cm). 27.5-inch wheels. Shimano hydraulic disc brakes. Front fork with lockout. 24-speed. The bike is in good condition; it was serviced this season. Suitable for city riding and light off-roading. Pickup available. Please inspect on site.',
    distance: '5.5 kilometers from you',
    address: 'Jow St., Building 5, Entrance 2',
    delivery: false,
    paymentMethods: {
      card: false,
      cash: true,
      online: false
    },
    features: ['27.5"', 'Hydraulic', 'Aluminum', '24 speeds', 'Trek'],
    seller: SELLERS['alexey']
  },
  {
    id: '4',
    name: 'Velour corner sofa',
    price: '1400 $',
    category: 'Furniture',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop&auto=format',
    description: 'New, velur premium, bedge',
    fullDescription: 'New corner sofa in film. Material: premium velour, beige. Filling: high-density polyurethane foam (doesnt sag). Includes 4 decorative pillows. Linen drawer. Metal Eurobook mechanism (very reliable). Dimensions: 280 x 170 cm. Delivery within the city is 1 000 rubles. Free delivery to your floor. Available in 3 colors.',
    distance: '600 meters from you',
    address: 'Furniture center, warehouse No. 7',
    delivery: true,
    paymentMethods: {
      card: true,
      cash: true,
      online: true
    },
    features: ['Velour', 'Angular', 'Pillows', 'Linen box', 'Eurobook'],
    seller: SELLERS['elena']
  },
  {
    id: '5',
    name: 'MacBook Pro M3 14" Space Black',
    price: '1800 $',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop&auto=format',
    description: '14", 16GB RAM, 512GB SSD, Space Black',
    fullDescription: 'New MacBook Pro with M3 chip. 14-inch, Liquid Retina XDR display. 16GB of memory, 512GB SSD. Space Black finish. 3 Thunderbolt 4 ports, HDMI, SD card slot. Backlit keyboard. Touch ID. Up to 15 hours of battery life. Original, sealed. Includes receipt and 1-year Apple warranty. Payment by installments available.',
    distance: '14 kilometers from you',
    address: 'Lazy Shopping Center, 3rd floor, re:Store',
    delivery: true,
    paymentMethods: {
      card: true,
      cash: true,
      online: true
    },
    features: ['M3', '16GB', '512GB', '14"', 'Space Black'],
    seller: SELLERS['dmitry']
  },
];
