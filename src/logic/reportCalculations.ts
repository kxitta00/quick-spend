import { type MonthlyBarData, type Transaction, type CategoryReportData, type Catagory } from "../types";


//ฟังชันหารายจ่ายเฉลี่ยนต่อวันโดยนับจากทั้งเดือน
export function calculateDailyAverage(monthExpense: number, target: Date): number {
  const now = new Date();
  const itemDate = new Date(target);
  if (monthExpense <= 0 || !monthExpense || isNaN(Number(monthExpense))) {
    return 0
  }
  let days: number = 0;
  if (itemDate.getMonth() === now.getMonth() && itemDate.getFullYear() === now.getFullYear()) {
    days = now.getDate();
  } else {
    days = new Date(itemDate.getFullYear(), itemDate.getMonth() + 1, 0).getDate()
  }

  return Math.round(monthExpense / days)
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

//ฟังก์ชันคำณวนแยกหมวดหมู่สรุปยอดรายจ่ายในเดือนนั้น
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