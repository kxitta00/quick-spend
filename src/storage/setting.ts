import { SETTING_MONTHLY_BUDGET, DEFAULT_MONTHLY_BUDGET } from "../constants";

//บันทึกเงินจากการเซ็ทเงินผ่านหน้าตั้งค่า
export function saveMonthlyBudget(amount: number): void {
  try {
    localStorage.setItem(SETTING_MONTHLY_BUDGET, JSON.stringify(amount))
  } catch (error) {
    console.error(`เซฟธุรกรรมในคีย์ "${SETTING_MONTHLY_BUDGET}" ไม่สำเร็จ!`, error);
  }
}

//ดึงจำนวนเงินที่บันทึกไปวาดจอ
export function getMonthlyBudget(): number {
  try {
    const raw = localStorage.getItem(SETTING_MONTHLY_BUDGET);
    if (raw) {
      const parsed = JSON.parse(raw)
      return parsed;
    }
  } catch (error) {
    console.error("ข้อมูลใน LocalStorage เสียหาย!", error)
  }
  return DEFAULT_MONTHLY_BUDGET;
}
