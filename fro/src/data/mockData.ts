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
