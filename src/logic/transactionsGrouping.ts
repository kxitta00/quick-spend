import { type Transaction, type DateGroup } from "../types";
import { formatThaiDateTwoPosition } from "../utils/formatters";


//ฟังก์ชันรายงาน รายการตามวัน ex วันนี้ -> เมื่อวาน -> 15 -> 14
export function groupTransactionsByDate(transaction: Transaction[]): DateGroup[] {

  const groups: { [key: string]: DateGroup } = {};

  const sortedTrans = [...transaction].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  })

  for (const item of sortedTrans) {

    const dateKey = new Date(item.createdAt).toDateString()
    const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);

    let dateLabel: string = "";
    if (dateKey === new Date().toDateString()) {
      dateLabel = 'วันนี้';
    } else if (dateKey === yesterday.toDateString()) {
      dateLabel = 'เมื่อวาน';
    } else {
      dateLabel = formatThaiDateTwoPosition(new Date(item.createdAt));
    }

    if (!groups[dateKey]) {
      groups[dateKey] = {
        dateLabel: dateLabel,
        dayTotal: 0,
        items: []
      }
    }
    groups[dateKey].items.push(item)
    if (item.type === 'expense') {
      groups[dateKey].dayTotal -= item.amount
    } else {
      groups[dateKey].dayTotal += item.amount
    }
  }
  return Object.values(groups)
}