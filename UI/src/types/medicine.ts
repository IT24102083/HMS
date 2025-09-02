export interface Medicine {
  id: string;
  name: string;
  genericName: string;
  brand: string;
  category: string;
  dosage: string;
  form: string; // tablet, capsule, syrup, injection, etc.
  price: number;
  stock: number;
  description: string;
  sideEffects: string[];
  contraindications: string[];
  manufacturer: string;
  expiryDate: string;
  prescriptionRequired: boolean;
  image?: string;
}

export interface CartItem {
  medicine: Medicine;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}