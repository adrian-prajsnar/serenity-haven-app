import { supabaseUrl } from '../services/supabase';

const imageUrl = `${supabaseUrl}/storage/v1/object/public/cabin-images/`;

export const cabins = [
  {
    name: '001',
    maxCapacity: 2,
    regularPrice: 300,
    discount: 10,
    image: imageUrl + 'cabin-001.jpg',
    description:
      "Retreat to the core of the mystical forest and experience the pinnacle of luxury for couples in the charming wooden Cabin 001. Tucked away in a spellbinding environment, this exquisite cabin provides a secluded and romantic escape. Inside, you'll find elegant wooden interiors, a cozy seating area, a fireplace, and a fully-stocked kitchen. The sumptuous king-size bed, adorned with premium linens, promises a restful night’s sleep. Rejuvenate in the spa-inspired shower and relax on the exclusive deck featuring a hot tub, enveloped by the serene sounds of the surrounding trees.",
  },
  {
    name: '002',
    maxCapacity: 2,
    regularPrice: 400,
    discount: 0,
    image: imageUrl + 'cabin-002.jpg',
    description:
      "Immerse yourself in nature's tranquility and enjoy luxury in our charming Cabin 002. Ideal for couples, this cabin provides a private and intimate escape nestled in the heart of an enchanting forest. Inside, you'll discover welcoming, high-quality wooden interiors, a cozy living space, a fireplace, and a fully-equipped kitchen. The opulent bedroom boasts a plush king-size bed and a spa-like shower. Unwind on the private deck with a hot tub and let the forest’s magic surround you.",
  },
  {
    name: '003',
    maxCapacity: 4,
    regularPrice: 350,
    discount: 0,
    image: imageUrl + 'cabin-003.jpg',
    description:
      "Discover the enchantment of luxurious family living in our charming medium-sized Cabin 003. Ideal for families of up to four, this cabin provides a cozy and welcoming environment with all the modern comforts. Inside, you'll find inviting wooden interiors, a comfortable living area, a fireplace, and a fully-equipped kitchen. The bedrooms feature plush beds and spa-like bathrooms. The cabin also includes a private deck with a hot tub and an outdoor seating area, perfect for making cherished family memories.",
  },
  {
    name: '004',
    maxCapacity: 4,
    regularPrice: 600,
    discount: 30,
    image: imageUrl + 'cabin-004.jpg',
    description:
      'Experience the pinnacle of luxury family vacations in Cabin 004. Tailored for families of up to four, this medium-sized cabin provides an exquisite retreat for the discerning guest. Inside, you’ll find lavish interiors made from the highest quality wood, a cozy living area, a fireplace, and a fully-equipped gourmet kitchen. The bedrooms feature sumptuous beds and spa-inspired en-suite bathrooms. Step outside onto your private deck to enjoy the natural surroundings while unwinding in your own hot tub.',
  },
  {
    name: '005',
    maxCapacity: 6,
    regularPrice: 400,
    discount: 10,
    image: imageUrl + 'cabin-005.jpg',
    description:
      "Set off on a relaxing and snug escape with your group or family in our spacious Cabin 005. Accommodating up to six people, this cabin provides a private retreat immersed in nature. Inside, you'll find warm, inviting interiors crafted from high-quality wood, a living area with a fireplace, and a fully-equipped kitchen. The bedrooms offer comfort and feature en-suite bathrooms. Step outside to your private deck and enjoy the natural surroundings while unwinding in your own hot tub.",
  },
  {
    name: '006',
    maxCapacity: 6,
    regularPrice: 900,
    discount: 40,
    image: imageUrl + 'cabin-006.jpg',
    description:
      "Discover the height of luxury with your group or family in our expansive wooden Cabin 006. Accommodating up to six people, this cabin provides a sumptuous retreat nestled in nature. Inside, you'll find elegant interiors made from premium wood, a spacious living area with a fireplace, and a fully-equipped gourmet kitchen. The bedrooms feature plush beds and spa-like en-suite bathrooms. Step out onto your private deck to embrace the natural surroundings while enjoying your own hot tub.",
  },
  {
    name: '007',
    maxCapacity: 8,
    regularPrice: 700,
    discount: 50,
    image: imageUrl + 'cabin-007.jpg',
    description:
      "Host your large group or multiple families in the expansive and luxurious Wooden Cabin 007. Accommodating up to eight people, this cabin provides a private escape nestled among stunning forests and mountains. Inside, you'll find cozy and inviting interiors crafted from high-quality wood, several living areas with fireplaces, and a fully-equipped kitchen. The bedrooms offer comfort with en-suite bathrooms. Enjoy the private deck with a hot tub and outdoor seating area, ideal for soaking in the natural beauty around you.",
  },
  {
    name: '008',
    maxCapacity: 10,
    regularPrice: 1600,
    discount: 15,
    image: imageUrl + 'cabin-008.jpg',
    description:
      'Experience unparalleled luxury and grandeur with your large group or multiple families in our magnificent Cabin 008. This retreat provides a lavish escape tailored to meet all your needs and desires. The cabin showcases an opulent design with high-end finishes, intricate details, and the finest quality wood throughout. Inside, you’ll find multiple expansive living areas with fireplaces, a formal dining space, and a gourmet kitchen that’s a chef’s dream. The bedrooms are designed for supreme comfort and luxury, featuring plush beds and spa-inspired en-suite bathrooms. Step outside to your private deck and immerse yourself in nature’s beauty, complete with a luxurious hot tub and ample seating areas for ultimate relaxation and enjoyment.',
  },
];
