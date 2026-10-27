import { STORAGE_KEY_MONTHLYBUDGET, DEFAULT_MONTHLY_BUDGET, STORAGE_KEY_THEME, STORAGE_KEY_ONBOARDING_SEEN } from "../constants";

//Budget
//บันทึกเงินจากการเซ็ทเงินผ่านหน้าตั้งค่า
export function saveMonthlyBudget(amount: number): void {
  try {
    localStorage.setItem(STORAGE_KEY_MONTHLYBUDGET, JSON.stringify(amount))
  } catch (error) {
    console.error(`เซฟงบประมาณคีย์ "${STORAGE_KEY_MONTHLYBUDGET}" ไม่สำเร็จ!`, error);
  }
}

//ดึงจำนวนเงินที่บันทึกไปวาดจอ
export function getMonthlyBudget(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_MONTHLYBUDGET);
    if (raw) {
      const parsed = JSON.parse(raw)
      return parsed;
    }
  } catch (error) {
    console.error("ข้อมูลใน LocalStorage เสียหาย!", error)
  }
  return DEFAULT_MONTHLY_BUDGET;
}

//Theme
//บันทึกโหมดธีมจากการเซ็ทผ่านหน้าตั้งค่า
export function saveTheme(theme: 'light' | 'dark'): void {
  try {
    localStorage.setItem(STORAGE_KEY_THEME, theme)
  } catch (error) {
    console.error(`เซฟโหมดสีหน้าจอคีย์ "${STORAGE_KEY_THEME}" ไม่สำเร็จ!`, error);
  }
}

//ดึงโหมดที่บันทึกไว้ไปวาดจอ
export function getTheme(): 'light' | 'dark' {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_THEME);
    if (raw) {
      return raw as 'light' | 'dark';
    }
  } catch (error) {
    console.error("ข้อมูลใน LocalStorage เสียหาย!", error)
  }
  return 'light';
}

//เช็คว่าผู้ใช้เคยดู popup หรือมั้ย
export function getOnboardingSeen(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ONBOARDING_SEEN);
    if (raw) {
      return true
    }
  } catch (error) {
    console.error("ข้อมูลใน LocalStorage เสียหาย!", error)
  }
  return false;
}

//บันทึกว่าเคยดู popup
export function saveOnboardingSeen(): void {
  try {
    localStorage.setItem(STORAGE_KEY_ONBOARDING_SEEN, 'true')
  } catch (error) {
    console.error(`เซฟคีย์ "${STORAGE_KEY_ONBOARDING_SEEN}" ไม่สำเร็จ!`, error);
  }
}