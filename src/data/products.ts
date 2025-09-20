export interface Product {
  id: number;
  category: 'internet' | 'game';
  provider: string;
  name: string;
  price: number;
  desc: string;
  logo: string;
}

export const PRODUCTS: Product[] = [
  // INTERNET PACKAGES
  // Axis
  { id: 1, category: 'internet', provider: 'Axis', name: 'Kuota 1.5GB', price: 7000, desc: 'Bronet 1.5GB 1 hari', logo: '/assets/logos/axis.png' },
  { id: 2, category: 'internet', provider: 'Axis', name: 'Kuota 2.5GB', price: 9000, desc: 'Bronet 2.5GB 1 hari', logo: '/assets/logos/axis.png' },
  { id: 3, category: 'internet', provider: 'Axis', name: 'Kuota 2GB', price: 11000, desc: 'Bronet 2GB 3 hari', logo: '/assets/logos/axis.png' },
  { id: 4, category: 'internet', provider: 'Axis', name: 'Kuota 4GB', price: 13000, desc: 'Bronet 4GB 3 hari', logo: '/assets/logos/axis.png' },
  { id: 5, category: 'internet', provider: 'Axis', name: 'Kuota 500MB', price: 6000, desc: 'Data 500MB All 30 hari', logo: '/assets/logos/axis.png' },
  { id: 6, category: 'internet', provider: 'Axis', name: 'Kuota 1GB', price: 9000, desc: 'Data 1GB All 30 hari', logo: '/assets/logos/axis.png' },
  { id: 7, category: 'internet', provider: 'Axis', name: 'Kuota 2GB', price: 17000, desc: 'Bronet 2GB 28 hari', logo: '/assets/logos/axis.png' },
  
  // Indosat
  { id: 8, category: 'internet', provider: 'Indosat', name: 'Kuota 1.5GB', price: 7000, desc: '1.5GB 1 hari', logo: '/assets/logos/indosat.png' },
  { id: 9, category: 'internet', provider: 'Indosat', name: 'Kuota 1GB', price: 8000, desc: '1GB 2 hari', logo: '/assets/logos/indosat.png' },
  { id: 10, category: 'internet', provider: 'Indosat', name: 'Kuota 3GB', price: 9000, desc: '3GB 1 hari', logo: '/assets/logos/indosat.png' },
  { id: 11, category: 'internet', provider: 'Indosat', name: 'Kuota 5GB', price: 11000, desc: '5GB 2 hari', logo: '/assets/logos/indosat.png' },
  { id: 12, category: 'internet', provider: 'Indosat', name: 'Kuota 3GB', price: 14000, desc: '3GB 3 hari', logo: '/assets/logos/indosat.png' },
  { id: 13, category: 'internet', provider: 'Indosat', name: 'Kuota 2.5GB', price: 15000, desc: '2.5GB 5 hari', logo: '/assets/logos/indosat.png' },
  { id: 14, category: 'internet', provider: 'Indosat', name: 'Kuota 5GB', price: 15000, desc: '5GB 3 hari', logo: '/assets/logos/indosat.png' },
  { id: 15, category: 'internet', provider: 'Indosat', name: 'Kuota 3.5GB', price: 16000, desc: '3.5GB 5 hari', logo: '/assets/logos/indosat.png' },

  // Smartfren
  { id: 16, category: 'internet', provider: 'Smartfren', name: 'Kuota Smartfren 1GB', price: 7000, desc: 'Smart 1GB All 3 hari', logo: '/assets/logos/smartfren.png' },
  { id: 17, category: 'internet', provider: 'Smartfren', name: 'Kuota Smartfren 2GB', price: 11000, desc: 'Smart 2GB All 3 hari', logo: '/assets/logos/smartfren.png' },
  { id: 18, category: 'internet', provider: 'Smartfren', name: 'Kuota Smartfren 1GB', price: 12000, desc: 'Smart 1GB All 7 hari', logo: '/assets/logos/smartfren.png' },
  { id: 19, category: 'internet', provider: 'Smartfren', name: 'Kuota Smartfren 1.5GB', price: 14000, desc: 'Smart 1.5GB All 7 hari', logo: '/assets/logos/smartfren.png' },
  { id: 20, category: 'internet', provider: 'Smartfren', name: 'Kuota Smartfren 3GB', price: 14000, desc: 'Smart 3GB All 5 hari', logo: '/assets/logos/smartfren.png' },
  { id: 21, category: 'internet', provider: 'Smartfren', name: 'Kuota Smartfren 4GB', price: 18000, desc: 'Smart 4GB + Unli App 14 hari', logo: '/assets/logos/smartfren.png' },

  // By.U
  { id: 22, category: 'internet', provider: 'ByU', name: 'Kuota ByU 3GB', price: 11000, desc: 'By.U 3GB All 7 hari', logo: '/assets/logos/byU.png' },
  { id: 23, category: 'internet', provider: 'ByU', name: 'Kuota ByU 2.5GB', price: 11000, desc: 'By.U 2.5GB All 5 hari', logo: '/assets/logos/byU.png' },
  { id: 24, category: 'internet', provider: 'ByU', name: 'Kuota ByU 3GB', price: 13000, desc: 'By.U 3GB All 14 hari', logo: '/assets/logos/byU.png' },
  { id: 25, category: 'internet', provider: 'ByU', name: 'Kuota ByU 7GB', price: 18000, desc: 'By.U 7GB All 30 hari', logo: '/assets/logos/byU.png' },
  { id: 26, category: 'internet', provider: 'ByU', name: 'Kuota ByU 4GB', price: 21000, desc: 'By.U 4GB All 30 hari', logo: '/assets/logos/byU.png' },
  { id: 27, category: 'internet', provider: 'ByU', name: 'Kuota ByU 6GB', price: 18000, desc: 'By.U 6GB All 30 hari', logo: '/assets/logos/byU.png' },
  
  // Tri
  { id: 28, category: 'internet', provider: 'Tri', name: 'Kuota Tri 1GB', price: 9000, desc: 'Tri 1GB 5 hari', logo: '/assets/logos/tri.png' },
  { id: 29, category: 'internet', provider: 'Tri', name: 'Kuota Tri 1.5GB', price: 11000, desc: 'Tri 1.5GB 11 hari', logo: '/assets/logos/tri.png' },
  { id: 30, category: 'internet', provider: 'Tri', name: 'Kuota Tri 1.5GB', price: 12000, desc: 'Tri 1.5GB 7 hari', logo: '/assets/logos/tri.png' },
  { id: 31, category: 'internet', provider: 'Tri', name: 'Kuota Tri 1.5GB', price: 12000, desc: 'Tri 1.5GB 5 hari', logo: '/assets/logos/tri.png' },
  { id: 32, category: 'internet', provider: 'Tri', name: 'Kuota Tri 2GB', price: 13000, desc: 'Tri 2GB 5 hari', logo: '/assets/logos/tri.png' },
  { id: 33, category: 'internet', provider: 'Tri', name: 'Kuota Tri 2.75GB', price: 14000, desc: 'Tri 2.75GB All Jaringan 3 hari', logo: '/assets/logos/tri.png' },
  
  // XL
  { id: 34, category: 'internet', provider: 'XL', name: 'Kuota XL 1GB', price: 7000, desc: 'XL 1GB All Jaringan 2 hari', logo: '/assets/logos/xl.png' },
  { id: 34, category: 'internet', provider: 'XL', name: 'Kuota XL 3GB', price: 12000, desc: 'XL 3GB All Jaringan 2 hari', logo: '/assets/logos/xl.png' },

  // GAME VOUCHERS
  // Mobile Legends
  { id: 101, category: 'game', provider: 'MOBILE LEGENDS', name: 'Diamond 3', price: 3000, desc: '3 Diamonds', logo: '/assets/logos/mobile-legends.png' },
  { id: 102, category: 'game', provider: 'MOBILE LEGENDS', name: 'Diamond 5', price: 4000, desc: '5 Diamonds', logo: '/assets/logos/mobile-legends.png' },
  { id: 103, category: 'game', provider: 'MOBILE LEGENDS', name: 'Diamond 12', price: 6000, desc: '12 Diamonds', logo: '/assets/logos/mobile-legends.png' },
  { id: 104, category: 'game', provider: 'MOBILE LEGENDS', name: 'Diamond 19', price: 8000, desc: '19 Diamonds', logo: '/assets/logos/mobile-legends.png' },
  { id: 105, category: 'game', provider: 'MOBILE LEGENDS', name: 'Diamond 28', price: 10000, desc: '28 Diamonds', logo: '/assets/logos/mobile-legends.png' },
  { id: 106, category: 'game', provider: 'MOBILE LEGENDS', name: 'Diamond 36', price: 12000, desc: '36 Diamonds', logo: '/assets/logos/mobile-legends.png' },
  { id: 107, category: 'game', provider: 'MOBILE LEGENDS', name: 'Diamond 44', price: 14000, desc: '44 Diamonds', logo: '/assets/logos/mobile-legends.png' },
  { id: 108, category: 'game', provider: 'MOBILE LEGENDS', name: 'Diamond 56', price: 18000, desc: '56 Diamonds', logo: '/assets/logos/mobile-legends.png' },
  { id: 109, category: 'game', provider: 'MOBILE LEGENDS', name: 'Diamond 59', price: 18500, desc: '59 Diamonds', logo: '/assets/logos/mobile-legends.png' },
  { id: 110, category: 'game', provider: 'MOBILE LEGENDS', name: 'Diamond 74', price: 22000, desc: '74 Diamonds', logo: '/assets/logos/mobile-legends.png' },
  { id: 111, category: 'game', provider: 'MOBILE LEGENDS', name: 'Diamond 100', price: 28000, desc: '100 Diamonds', logo: '/assets/logos/mobile-legends.png' },
  { id: 112, category: 'game', provider: 'MOBILE LEGENDS', name: 'Weekly Diamond', price: 28000, desc: '220 Diamonds', logo: '/assets/logos/mobile-legends.png' },

  // Free Fire
  { id: 201, category: 'game', provider: 'FREE FIRE', name: 'Diamond 5', price: 3000, desc: '5 Diamonds', logo: '/assets/logos/free-fire.png' },
  { id: 202, category: 'game', provider: 'FREE FIRE', name: 'Diamond 12', price: 4000, desc: '12 Diamonds', logo: '/assets/logos/free-fire.png' },
  { id: 203, category: 'game', provider: 'FREE FIRE', name: 'Diamond 50', price: 9000, desc: '50 Diamonds', logo: '/assets/logos/free-fire.png' },
  { id: 204, category: 'game', provider: 'FREE FIRE', name: 'Diamond 70', price: 12000, desc: '70 Diamonds', logo: '/assets/logos/free-fire.png' },
  { id: 205, category: 'game', provider: 'FREE FIRE', name: 'Diamond 100', price: 15000, desc: '100 Diamonds', logo: '/assets/logos/free-fire.png' },
  { id: 206, category: 'game', provider: 'FREE FIRE', name: 'Diamond 140', price: 20000, desc: '140 Diamonds', logo: '/assets/logos/free-fire.png' },
  { id: 208, category: 'game', provider: 'FREE FIRE', name: 'Level Up Pass', price: 7000, desc: 'Memebership Level up Pass 6', logo: '/assets/logos/free-fire.png' },
  { id: 207, category: 'game', provider: 'FREE FIRE', name: 'Level Up Pass', price: 11000, desc: 'Memebership Level up Pass 10', logo: '/assets/logos/free-fire.png' },
  { id: 209, category: 'game', provider: 'FREE FIRE', name: 'Level Up Pass', price: 11000, desc: 'Memebership Level up Pass 15', logo: '/assets/logos/free-fire.png' },
  { id: 210, category: 'game', provider: 'FREE FIRE', name: 'Level Up Pass', price: 11000, desc: 'Memebership Level up Pass 20', logo: '/assets/logos/free-fire.png' },
  { id: 211, category: 'game', provider: 'FREE FIRE', name: 'Level Up Pass', price: 11000, desc: 'Memebership Level up Pass 25', logo: '/assets/logos/free-fire.png' },
  { id: 212, category: 'game', provider: 'FREE FIRE', name: 'Level Up Pass', price: 15000, desc: 'Memebership Level up Pass 30', logo: '/assets/logos/free-fire.png' },
  { id: 213, category: 'game', provider: 'FREE FIRE', name: 'Level Up Pass', price: 17000, desc: 'Memebership Level up Pass FF', logo: '/assets/logos/free-fire.png' },

  // Pubg
  { id: 301, category: 'game', provider: 'PUBG MOBILE', name: '15 UC', price: 10000, desc: 'Pubg Mobile 15 UC', logo: '/assets/logos/pubg.png' },
  { id: 302, category: 'game', provider: 'PUBG MOBILE', name: '25 UC', price: 11000, desc: 'Pubg Mobile 25 UC', logo: '/assets/logos/pubg.png' },
  { id: 303, category: 'game', provider: 'PUBG MOBILE', name: 'WDP', price: 14000, desc: 'Weekly Deal Pack 1', logo: '/assets/logos/pubg.png' },
  { id: 304, category: 'game', provider: 'PUBG MOBILE', name: '60 UC', price: 17000, desc: 'Pubg Mobile 60 UC', logo: '/assets/logos/pubg.png' },
  { id: 305, category: 'game', provider: 'PUBG MOBILE', name: '50 UC', price: 17000, desc: 'Pubg Mobile 50 UC', logo: '/assets/logos/pubg.png' },
  { id: 306, category: 'game', provider: 'PUBG MOBILE', name: '35 UC', price: 17000, desc: 'Pubg Mobile 35 UC', logo: '/assets/logos/pubg.png' },
  { id: 307, category: 'game', provider: 'PUBG MOBILE', name: '70 UC', price: 26000, desc: 'Pubg Mobile 70 UC', logo: '/assets/logos/pubg.png' },
  { id: 308, category: 'game', provider: 'PUBG MOBILE', name: '100 UC', price: 33000, desc: 'Pubg Mobile 33 UC', logo: '/assets/logos/pubg.png' },
];

export const CLASS_OPTIONS = (() => {
  const grades = ['10', '11', '12'];
  const majors = ['TKJ', 'Ph', 'OTKP', 'TBSM', 'MIA', 'MIPA'];
  const groups = [1, 2, 3];
  const list: string[] = [];
  grades.forEach(g => {
    majors.forEach(m => {
      groups.forEach(n => {
        list.push(`${g} ${m} ${n}`);
      });
    });
  });
  return list;
})();

export const formatRupiah = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export const Telepon_Admin = '6285782580079';