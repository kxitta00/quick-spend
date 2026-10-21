
//** type ธุรกรรมการเงิน เพิ่ม/ลบเงิน */
export type Transaction = {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: Catagory;
  note?: string;
  createdAt: string;
}

//** type หมวดหมู่รายการ */
export type Catagory = {
  id: string;
  name: string;
  icon: string;
};


/** type การตั้งค่าระบบ */
export type Settings = {
  monthlyBudget: number;
  theme: 'light' | 'dark'
}