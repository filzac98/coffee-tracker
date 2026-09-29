export type Brew = {
  id: number;
  brewMethod: string;
  machine: string;
  coffeeDose: number;
  yield: number;
  brewTime: number;
  grindSize: string;
  waterTemp: number | null;
  rating: number;
  notes: string | null;
  createdAt: string;
  bean?: {
    id: number;
    name: string;
  };
};