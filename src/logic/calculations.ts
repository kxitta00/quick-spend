import { type Transaction } from "../types.ts";


//ฟังก์ชันรวมยอดเงินที่เหลือทั้งหมด 
export function calculateTotalIncome(transactions: Transaction[]): number {
  const totalIncome: number = transactions.reduce((acc, curr) => {
    return curr.type === 'income' ? acc + curr.amount : acc;
  }, 0)
  return totalIncome
}

//ฟังก์ชันรวมยอดเงินใช้จ่ายทั้งหมด 
export function calculateTotalExpense(transactions: Transaction[]): number {
  const totalExpense: number = transactions.reduce((acc, curr) => {
    return curr.type === 'expense' ? acc + curr.amount : acc;
  }, 0)
  return totalExpense
}

//ฟังก์ชันยอดเงินคงเหลือใน Hero Card
export function calculateBalance(transactions: Transaction[]): number {
  const totalIn: number = calculateTotalIncome(transactions);
  const totalEx: number = calculateTotalExpense(transactions);
  return totalIn - totalEx

}

//ฟังก์ชัน ผลรวมเฉพาะรายจ่ายเดือนปัจจุบัน
export function calculateMonthlyExpense(transactions: Transaction[]): number {
  const now = new Date();

  return transactions.reduce((acc, curr) => {
    const itemDate = new Date(curr.createdAt);
    if (itemDate.getMonth() === now.getMonth() && itemDate.getFullYear() === now.getFullYear()) {
      if (curr.type === 'expense') { return acc + curr.amount };
    }
    return acc
  }, 0)
}

//ฟังก์ชัน ผลรวมเฉพาะรายจ่ายวันนี้
export function calculateTodayExpense(transactions: Transaction[]): number {
  const now = new Date();

  return transactions.reduce((acc, curr) => {
    const itemDate = new Date(curr.createdAt);
    if (itemDate.getDate() === now.getDate() && itemDate.getMonth() === now.getMonth() && itemDate.getFullYear() === now.getFullYear()) {
      if (curr.type === 'expense') { return acc + curr.amount };
    }
    return acc
  }, 0)
}


//ฟังก์ชัน นับจำนวนรายการที่บันทึกวันนี้
export function calculateTodayCount(transactions: Transaction[]): number {
  const now = new Date();
  return transactions.filter((item) => {
    const itemDate = new Date(item.createdAt);
    return (
      item.type === 'expense' &&
      itemDate.getDate() === now.getDate() &&
      itemDate.getMonth() === now.getMonth() &&
      itemDate.getFullYear() === now.getFullYear()
    );
  }).length;
}
