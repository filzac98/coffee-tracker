import type { Brew } from "./brew";

export type Bean = {
  id: number;
  name: string;
  roaster: string;
  origin: string;
  process: string;
  roastLevel: string;
  roastDate: string;
  tastingNotes: string[];
  rating: number;
  brews?: Brew[];
};