
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

/** type สรุปยอดและรายการเงินต่างๆ */
export type ReportTransactions = {
  totalBalance: number,
  totalIncome: number,
  totalExpense: number,
  totalMonthlyExpense: number,
  totalMonthlyIncome: number,
  totalTodayExpense: number,
  totalTodayCount: number
}


//type สลับโหมดหน้าจอ
export type ViewType = 'view-overview' | 'view-transactions' | 'view-reports' | 'view-settings';

//type รายการในหน้ารายงาน
export type DateGroup = {
  dateLabel: string;
  dayTotal: number;
  items: Transaction[];
}

//type กราฟแท่ง
export type MonthlyBarData = {
  monthLabel: string;
  amount: number;
  percent: number;
  isActive: boolean;
}

//type รายงานหมวดหมู่
export type CategoryReportData = {
  category: Catagory;
  amount: number;
  percent: number;
};