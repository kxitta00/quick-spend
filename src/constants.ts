import { type Catagory } from "./types";

//หมวดหมู่เงินออก
export const EXPENSE_CATEGORIES: Catagory[] = [
  { id: 'food', name: 'อาหาร', icon: 'utensils' },
  { id: 'transport', name: 'เดินทาง', icon: 'car' },
  { id: 'shopping', name: 'ช้อปปิ้ง', icon: 'shopping-bag' },
  { id: 'entertainment', name: 'บันเทิง', icon: 'film' },
  { id: 'bill', name: 'บิล', icon: 'receipt' },
  { id: 'other', name: 'อื่น ๆ', icon: 'more-horizontal' },
]

//หมวดหมู่เงินเข้า
export const INCOME_CATEGORIES: Catagory[] = [
  { id: 'salary', name: 'เงินเดือน', icon: 'banknote' },
  { id: 'freelance', name: 'ฟรีแลนซ์', icon: 'laptop' },
  { id: 'gift', name: 'ของขวัญ', icon: 'gift' },
  { id: 'other', name: 'อื่น ๆ', icon: 'more-horizontal' },
]

//Key LocalStorage
export const STORAGE_KEY_ACTIVEVIEW: string = 'quickspend_active_view';
export const STORAGE_KEY_TRANSACTIONS: string = 'quick_spend_transactions';
export const DEFAULT_MONTHLY_BUDGET = 6000;
// STORAGE_KEY_SETTINGS หลังจาก MVP เสร็จ