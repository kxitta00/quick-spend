import { type Transaction } from "../types.ts";
import { STORAGE_KEY_TRANSACTIONS } from "../constants.ts";



//บันทึก Array ของรายการธุรกรรมลง LocalStorage
export function saveTransactions(transactions: Transaction[]): boolean {
  try {
    localStorage.setItem(STORAGE_KEY_TRANSACTIONS, JSON.stringify(transactions))
    return true
  } catch (error) {
    console.error(`เซฟรายการในคีย์ "${STORAGE_KEY_TRANSACTIONS}" ไม่สำเร็จ!`, error);
    return false
  }
}

//ดึงรายการธุรกรรมทั้งหมดออกมาจาก LocalStorage 
export function getTransactions(): Transaction[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_TRANSACTIONS);
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (error) {
    console.error("ข้อมูลธุรกรรมใน LocalStorage เสียหาย!", error)
  }
  return [];
}

//ลบรายการที่เลือกออกจาก LocalStorage
export function deleteTransaction(id: string): void {
  const tranfilter: Transaction[] = getTransactions().filter((item) => item.id !== id);
  saveTransactions(tranfilter)
}