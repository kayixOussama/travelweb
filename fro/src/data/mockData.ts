export type Destination = {
  id: number;
  title: string;
  location: string;
  image: string;
  rating: number;
  description: string;
};

export type Package = {
  id: number;
  name: string;
  price: string;
  duration: string;
  features: string[];
  recommended: boolean;
};

export const initialDestinations: Destination[] = [
  {
    id: 1,
    title: "Volcanoes National Park",
    location: "Musanze",
    image: "https://images.unsplash.com/photo-1605559911928-e03606ea0dc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGdvcmlsbGElMjByd2FuZGElMjB3aWxkbGlmZXxlbnwxfHx8fDE3NzAyMDEwODJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.9,
    description: "Home to the endangered mountain gorillas and five of the eight volcanoes of the Virunga Mountains."
  },
  {
    id: 2,
    title: "Lake Kivu",
    location: "Western Province",
    image: "https://images.unsplash.com/photo-1514547085879-968fe519da2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWtlJTIwa2l2dSUyMGJvYXQlMjBzdW5zZXR8ZW58MXx8fHwxNzcwMjAxMDg4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.8,
    description: "Rwanda's largest lake, perfect for relaxation, water sports, and enjoying stunning sunsets."
  },
  {
    id: 3,
    title: "Kigali City",
    location: "Kigali",
    image: "https://images.unsplash.com/photo-1648708511872-5426c0f29c27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWdhbGklMjBjaXR5JTIwcndhbmRhJTIwc2t5bGluZSUyMG1vZGVybiUyMGFmcmljYW4lMjBjaXR5fGVufDF8fHx8MTc3MDIwMTA4Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.7,
    description: "The vibrant capital city, known for its cleanliness, orderliness, and the poignant Genocide Memorial."
  },
  {
    id: 4,
    title: "Akagera National Park",
    location: "Eastern Province",
    image: "https://images.unsplash.com/photo-1662217134917-264a5e248581?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwc2FmYXJpJTIwamVlcCUyMHNhdmFubmFoJTIwYWR2ZW50dXJlfGVufDF8fHx8MTc3MDIwMTA4Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.8,
    description: "Central Africa's largest protected wetland and the last remaining refuge for savannah-adapted species."
  }
];

export const initialPackages: Package[] = [
  {
    id: 1,
    name: "Standard Safari",
    price: "$1,200",
    duration: "3 Days",
    features: [
      "Akagera National Park Game Drive",
      "Boat Trip on Lake Ihema",
      "Standard Accommodation",
      "Professional Guide",
      "Transport in 4x4 Safari Vehicle"
    ],
    recommended: false
  },
  {
    id: 2,
    name: "Gorilla Trekking",
    price: "$2,500",
    duration: "4 Days",
    features: [
      "Gorilla Trekking Permit Included",
      "Volcanoes National Park Visit",
      "Cultural Village Tour",
      "Luxury Eco-Lodge Stay",
      "Airport Transfers"
    ],
    recommended: true
  },
  {
    id: 3,
    name: "Complete Rwanda",
    price: "$3,800",
    duration: "10 Days",
    features: [
      "Visit all 3 National Parks",
      "Chimpaizee Tracking in Nyungwe",
      "Canopy Walk Experience",
      "Lake Kivu Relaxation",
      "All-Inclusive Meals & Drinks"
    ],
    recommended: false
  }
];
