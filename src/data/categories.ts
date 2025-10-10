import { PRODUCTS } from "./products";
import { CategoryData } from "../types/category";

export const CATEGORIES: CategoryData[] = [
  {
    id: "internet",
    name: "Paket Internet",
    icon: "📱",
    description: "Beli paket internet untuk semua operator",
    subcategories: [
      {
        id: "axis",
        name: "Axis",
        provider: "Axis",
        icon: "/assets/icon/axis-icon.svg",
        products: PRODUCTS.filter(
          (p) => p.provider === "Axis" && p.category === "internet"
        ),
      },
      {
        id: "indosat",
        name: "Indosat",
        provider: "Indosat",
        icon: "/assets/icon/im3-icon.svg",
        products: PRODUCTS.filter(
          (p) => p.provider === "Indosat" && p.category === "internet"
        ),
      },
      {
        id: "smartfren",
        name: "Smartfren",
        provider: "Smartfren",
        icon: "/assets/icon/smartfren-icon.png",
        products: PRODUCTS.filter(
          (p) => p.provider === "Smartfren" && p.category === "internet"
        ),
      },
      {
        id: "byu",
        name: "By.U",
        provider: "ByU",
        icon: "/assets/icon/byu-icon.png",
        products: PRODUCTS.filter(
          (p) => p.provider === "ByU" && p.category === "internet"
        ),
      },
      {
        id: "xl",
        name: "XL",
        provider: "XL",
        icon: "/assets/icon/xl-icon.png",
        products: PRODUCTS.filter(
          (p) => p.provider === "XL" && p.category === "internet"
        ),
      },
      {
        id: "telkomsel",
        name: "Telkomsel",
        provider: "Telkomsel",
        icon: "/assets/icon/telkomsel-icon.png",
        products: PRODUCTS.filter(
          (p) => p.provider === "Telkomsel" && p.category === "internet"
        ),
      },
      {
        id: "tri",
        name: "Tri",
        provider: "Tri",
        icon: "/assets/icon/tri-icon.png",
        products: PRODUCTS.filter(
          (p) => p.provider === "Tri" && p.category === "internet"
        ),
      },
    ],
  },
  {
    id: "game",
    name: "Voucher Game",
    icon: "🎮",
    description: "Top up diamond dan voucher game favorit kamu",
    subcategories: [
      {
        id: "mobile-legends",
        name: "Mobile Legends",
        provider: "Mobile Legends",
        icon: "/assets/icon/mobile-legends-icon.png",
        products: PRODUCTS.filter((p) => p.provider === "Mobile Legends"),
      },
      {
        id: "free-fire",
        name: "Free Fire",
        provider: "Free Fire",
        icon: "/assets/icon/free-fire-icon.png",
        products: PRODUCTS.filter((p) => p.provider === "Free Fire"),
      },
      {
        id: "genshin-impact",
        name: "Genshin Impact",
        provider: "Genshin Impact",
        icon: "/assets/icon/genshin_impact-icon.png",
        products: PRODUCTS.filter((p) => p.provider === "Genshin Impact"),
      },
      {
        id: "roblox",
        name: "Roblox",
        provider: "Roblox",
        icon: "/assets/icon/roblox-icon.png",
        products: PRODUCTS.filter((p) => p.provider === "Roblox"),
      },
      {
        id: "arena-breakout",
        name: "Arena Breakout",
        provider: "Arena Breakout",
        icon: "/assets/icon/arena_breakout.png",
        products: PRODUCTS.filter((p) => p.provider === "Arena Breakout"),
      },
      {
        id: "8-ball-pool",
        name: "8 Ball Pool",
        provider: "8 Ball Pool",
        icon: "/assets/icon/8ball.png",
        products: PRODUCTS.filter((p) => p.provider === "8 Ball Pool"),
      },
      {
        id: "pubg-mobile",
        name: "PUBG Mobile",
        provider: "PUBG Mobile",
        icon: "/assets/icon/pubg-icon.png",
        products: PRODUCTS.filter((p) => p.provider === "PUBG Mobile"),
      },
    ],
  },
  {
    id: "pulsa",
    name: "Pulsa",
    icon: "📞",
    description: "Beli pulsa semua operator",
    subcategories: [
      {
        id: "axis-pulsa",
        name: "Axis",
        provider: "Axis",
        icon: "/assets/icon/axis-icon.svg",
        products: PRODUCTS.filter(
          (p) => p.provider === "Axis" && p.category === "pulsa"
        ),
      },
      {
        id: "indosat-pulsa",
        name: "Indosat",
        provider: "Indosat",
        icon: "/assets/icon/im3-icon.svg",
        products: PRODUCTS.filter(
          (p) => p.provider === "Indosat" && p.category === "pulsa"
        ),
      },
      {
        id: "smartfren-pulsa",
        name: "Smartfren",
        provider: "Smartfren",
        icon: "/assets/icon/smartfren-icon.png",
        products: PRODUCTS.filter(
          (p) => p.provider === "Smartfren" && p.category === "pulsa"
        ),
      },
      {
        id: "byu-pulsa",
        name: "By.U",
        provider: "ByU",
        icon: "/assets/icon/byu-icon.png",
        products: PRODUCTS.filter(
          (p) => p.provider === "ByU" && p.category === "pulsa"
        ),
      },
      {
        id: "xl-pulsa",
        name: "XL",
        provider: "XL",
        icon: "/assets/icon/xl-icon.png",
        products: PRODUCTS.filter(
          (p) => p.provider === "XL" && p.category === "pulsa"
        ),
      },
      {
        id: "telkomsel-pulsa",
        name: "Telkomsel",
        provider: "Telkomsel",
        icon: "/assets/icon/telkomsel-icon.png",
        products: PRODUCTS.filter(
          (p) => p.provider === "Telkomsel" && p.category === "pulsa"
        ),
      },
      {
        id: "tri-pulsa",
        name: "Tri",
        provider: "Tri",
        icon: "/assets/icon/tri-icon.png",
        products: PRODUCTS.filter(
          (p) => p.provider === "Tri" && p.category === "pulsa"
        ),
      },
    ],
  },
  {
    id: "ewallet",
    name: "E-Wallet",
    icon: "💳",
    description: "Top up saldo e-wallet dengan mudah",
    subcategories: [
      {
        id: "gopay",
        name: "GoPay",
        provider: "GoPay",
        icon: "/assets/icon/gopay-icon.png",
        products: PRODUCTS.filter((p) => p.provider === "GoPay"),
      },
      {
        id: "dana",
        name: "DANA",
        provider: "DANA",
        icon: "/assets/icon/dana-icon.png",
        products: PRODUCTS.filter((p) => p.provider === "DANA"),
      },
      {
        id: "shopeepay",
        name: "ShopeePay",
        provider: "ShopeePay",
        icon: "/assets/icon/shope_pay-icon.png",
        products: PRODUCTS.filter((p) => p.provider === "ShopeePay"),
      },
    ],
  },
];

export const getCategoryById = (id: string) =>
  CATEGORIES.find((c) => c.id === id);

export const getSubcategoryById = (
  categoryId: string,
  subcategoryId: string
) => {
  const category = getCategoryById(categoryId);
  return category?.subcategories.find((s) => s.id === subcategoryId);
};
