import { type MonthlyBarData, type Transaction } from "../types";


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