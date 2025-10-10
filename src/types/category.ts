export interface Product {
  id: number;
  category: "internet" | "game" | "ewallet" | "pulsa";
  provider: string;
  name: string;
  price: number;
  desc: string;
  logo: string;
  popular?: boolean;
  discount?: number;
}

export interface CategoryData {
  id: string;
  name: string;
  icon: string;
  description: string;
  subcategories: SubcategoryData[];
}

export interface SubcategoryData {
  id: string;
  name: string;
  provider: string;
  icon: string;
  products: Product[];
}

export type NavigationState = {
  view: "home" | "category" | "subcategory";
  categoryId?: string;
  subcategoryId?: string;
};
