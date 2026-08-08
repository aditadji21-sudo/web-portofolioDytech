import { Product } from "./constants";
import { PC_RAKITAN } from "./Pc";
import { LAPTOP } from "./Laptop";
import { AKSESORIS } from "./Aksesoris";
import { SERVIS } from "./Servis";

// Gabungkan semuanya pakai titik tiga (spread operator)
export const ALL_PRODUCTS: Product[] = [
  ...PC_RAKITAN,
  ...LAPTOP,
  ...AKSESORIS,
  ...SERVIS,
];