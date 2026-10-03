export type DashboardStats = {
  totalBeans: number;
  totalBrews: number;
  averageBrewRating: number;
  highestRatedBean: {
    id: number;
    name: string;
    roaster: string;
    rating: number;
  } | null;
};