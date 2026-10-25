import { type MonthlyBarData, type Transaction, type CategoryReportData, type Catagory } from "../types";
import { calculateTotalExpense } from "./calculations";


//ฟังชันหารายจ่ายเฉลี่ยนต่อวันโดยนับจากทั้งเดือนที่บันทึกรายการ
export function calculateDailyAverage(currentMonthTransactions: Transaction[]): number {
  const totalExpense: number = calculateTotalExpense(currentMonthTransactions);

  const expenseDates: string[] = currentMonthTransactions
    .filter((item => item.type === 'expense'))
    .map((item) => new Date(item.createdAt).toDateString())

  const uniqueDays = new Set(expenseDates).size;
  if (uniqueDays === 0) return 0;
  return Math.round(totalExpense / uniqueDays);
}

//ฟังก์ชันหากราฟแท่ง 3 เดือน
export function calculateLast3MonthsExpense(transactions: Transaction[], selectedDate: Date): MonthlyBarData[] {
  const result: MonthlyBarData[] = [];
  for (let i = 2; i >= 0; i--) {
    let months: Date = new Date(selectedDate.getFullYear(), selectedDate.getMonth() - i, 1);
    let thaiDate: string = new Intl.DateTimeFormat('th-TH', { month: 'short' }).format(months)
    let amount: number = transactions.reduce((acc, curr) => {
      const itemDate = new Date(curr.createdAt);
      if (itemDate.getMonth() === months.getMonth() && itemDate.getFullYear() === months.getFullYear()) {
        return curr.type === 'expense' ? acc + curr.amount : acc;
      }
      return acc
    }, 0)
    result.push({
      monthLabel: thaiDate,
      amount: amount,
      percent: 0,
      isActive: i === 0 ? true : false,
    })
  }
  const maxAmount: number = Math.max(...result.map((item) => item.amount));
  result.forEach((item) => {
    if (maxAmount > 0) {
      item.percent = Math.round((item.amount / maxAmount) * 100)
    } else {
      item.percent = item.percent = 0
    }
  })
  return result;
}

//ฟังก์ชันคำณวนแยกหมวดหมู่สรุปยอดรายจ่ายในเดือนนั้นๆ
export function calculateCategoryBreakdown(transactions: Transaction[], selectedDate: Date): CategoryReportData[] {
  if (transactions.length === 0) {
    return []
  }
  const categoryMap = transactions.reduce((acc, curr) => {
    const itemDate = new Date(curr.createdAt);
    if (curr.type === 'expense' &&
      itemDate.getMonth() === new Date(selectedDate).getMonth() &&
      itemDate.getFullYear() === new Date(selectedDate).getFullYear()
    ) {
      const catId: string = curr.category.id;
      if (!acc[catId]) {
        acc[catId] = { category: curr.category, amount: 0, percent: 0 }
      }
      acc[catId].amount += curr.amount;
    }
    return acc
  }, {} as { [key: string]: { category: Catagory; amount: number; percent: number } })

  const totalMonthExpense = Object.values(categoryMap).reduce((acc, curr) => {
    return acc + curr.amount
  }, 0)
  if (totalMonthExpense === 0) {
    return [];
  }
  const categoryList = Object.values(categoryMap);
  categoryList.forEach((item) => {
    item.percent = Math.round((item.amount / totalMonthExpense) * 100);
  })
  categoryList.sort((a, b) => b.amount - a.amount)

  return categoryList
}