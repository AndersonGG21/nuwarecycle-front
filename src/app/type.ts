export interface Product {
  idProd?: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  brand: string;
  rating: number;
  amount?: number;
  comments?: Comment[];
};

export interface Comment {
  id?: number;
  comment: string,
  date?: string,
  product: any,
  user : any,  
};

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  registrationDate: string;
  profileImage: string;
  role: string;
}

