import type { Brew } from "./brew";

export type BeanStats = {
  brewCount: number;
  averageRating: number;
  bestBrew: Brew | null;
};