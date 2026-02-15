export interface School {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  plan?: string;        // e.g., "Premium"
  code?: string;        // e.g., "GHS-2024"
  createdAt?: string;
  updatedAt?: string;
}
