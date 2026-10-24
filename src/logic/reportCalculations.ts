
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
    days = new Date(itemDate.getFullYear(), itemDate.getMonth() + 1, 0).getDate() //ยังสงสัย
  }

  return Math.round(monthExpense / days)
}