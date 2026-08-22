import accommodation1 from "../assets/images/accommodation-1-1.jpg";
import accommodation1Image2 from "../assets/images/accommodation-1-2.jpg";
import accommodation1Image3 from "../assets/images/accommodation-1-3.jpg";
import accommodation1Image4 from "../assets/images/accommodation-1-4.jpg";
import accommodation1Image5 from "../assets/images/accommodation-1-5.jpg";
import accommodation2 from "../assets/images/accommodation-2-1.jpg";
import accommodation2Image2 from "../assets/images/accommodation-2-2.jpg";
import accommodation2Image3 from "../assets/images/accommodation-2-3.jpg";
import accommodation2Image4 from "../assets/images/accommodation-2-4.jpg";
import accommodation2Image5 from "../assets/images/accommodation-2-5.jpg";
import accommodation3 from "../assets/images/accommodation-31.jpg";
import accommodation3Image2 from "../assets/images/accommodation-3-2.jpg";
import accommodation3Image3 from "../assets/images/accommodation-3-3.jpg";
import accommodation3Image4 from "../assets/images/accommodation-3-4.jpg";
import accommodation3Image5 from "../assets/images/accommodation-3-5.jpg";
import accommodation4 from "../assets/images/accommodation-4-1.jpg";
import accommodation4Image2 from "../assets/images/accommodation-4-2.jpg";
import accommodation4Image3 from "../assets/images/accommodation-4-3.jpg";
import accommodation4Image4 from "../assets/images/accommodation-4-4.jpg";
import accommodation4Image5 from "../assets/images/accommodation-4-5.jpg";

const accommodations = [
  {
    id: 1,
    type: "Luxury 2 bed with Elevated City Views | Apt1413",
    title: "Entire rental unit in Cape Town, South Africa",
    location: "Cape Town",
    amenities: ["Wifi", "Kitchen", "Free parking"],
    rating: 4.8,
    reviews: 124,
    price: 1850,
    image: accommodation1,
    images: [
      accommodation1,
      accommodation1Image2,
      accommodation1Image3,
      accommodation1Image4,
      accommodation1Image5,
    ],
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    host: "Sarah",
    hostDescription:
      "Sarah has been hosting guests in Cape Town for four years and enjoys sharing local recommendations.",
    description:
      "Enjoy elevated views of Cape Town from this modern two-bedroom apartment. The space includes a comfortable living area, fully equipped kitchen, free parking and fast Wi-Fi, making it ideal for couples, families or business travellers.",
    enhancedCleaning: true,
    selfCheckIn: true,
    weeklyDiscount: 10,
cleaningFee: 450,
serviceFee: 300,
occupancyTaxes: 250,
  },
  {
    id: 2,
    type: "Entire rental unit in Sandton, South Africa",
    title: "Morningside Two Bedroom Apartment",
    location: "Johannesburg",
    amenities: ["Wifi", "Pool", "Kitchen"],
    rating: 4.6,
    reviews: 89,
    price: 1450,
    image: accommodation2,
    images: [
      accommodation2,
      accommodation2Image2,
      accommodation2Image3,
      accommodation2Image4,
      accommodation2Image5,
    ],
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    host: "Stacy",
    hostDescription:
      "Stacy is a Johannesburg host who helps guests enjoy a comfortable stay close to Sandton.",
    description: "Stay in a spacious two-bedroom apartment in Morningside, close to Sandton’s restaurants, shops and business district. Guests can enjoy a fully equipped kitchen, reliable Wi-Fi and access to the shared swimming pool.",
    enhancedCleaning: true,
    selfCheckIn: true,
    weeklyDiscount: 10,
cleaningFee: 450,
serviceFee: 300,
occupancyTaxes: 250,
  },
  {
    id: 3,
    type: "Beachfront apartment",
    title: "Ocean-view apartment near the beach",
    location: "Durban",
    amenities: ["Bay view", "Wifi", "Beach access"],
    rating: 4.9,
    reviews: 203,
    price: 2100,
    image: accommodation3,
    images: [
      accommodation3,
      accommodation3Image2,
      accommodation3Image3,
      accommodation3Image4,
      accommodation3Image5,
    ],
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    host: "Mike",
    hostDescription:
      "Mike is a Durban local who enjoys helping visitors discover the city and its beaches.",
    description: "Wake up to beautiful bay views from this beachfront apartment in Durban. The apartment offers direct beach access, comfortable bedrooms and fast Wi-Fi, making it a relaxing choice for families and small groups.",
    enhancedCleaning: true,
    selfCheckIn: false,
    weeklyDiscount: 10,
cleaningFee: 450,
serviceFee: 300,
occupancyTaxes: 250,
  },
  {
    id: 4,
    type: "Entire guest suite",
    title: "Quiet guest suite in the city",
    location: "Pretoria",
    amenities: ["Wifi", "Workspace", "Free parking"],
    rating: 4.7,
    reviews: 67,
    price: 1100,
    image: accommodation4,
    images: [
      accommodation4,
      accommodation4Image2,
      accommodation4Image3,
      accommodation4Image4,
      accommodation4Image5,
    ],
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    host: "Lethabo",
    hostDescription:
      "Lethabo provides guests with a quiet, private stay and helpful recommendations for exploring Pretoria.",
    description: "Relax in this peaceful private guest suite in Pretoria. The suite includes a dedicated workspace, fast Wi-Fi and free parking, making it suitable for solo travellers, couples and guests visiting for work.",
    enhancedCleaning: true,
    selfCheckIn: true,
    weeklyDiscount: 10,
cleaningFee: 450,
serviceFee: 300,
occupancyTaxes: 250,
  },
];

export default accommodations;
