import { STORAGE_KEY_ACTIVEVIEW } from "../constants";
import { type ViewType } from "../types";

//บันทึก page ที่ผู้ใช้เปิดนะปัจจุบัน
export function saveActiveView(activeView: ViewType): void {
  try {
    sessionStorage.setItem(STORAGE_KEY_ACTIVEVIEW, activeView)
  } catch (error) {
    console.error(`เกิดข้อผิดพลาดเซฟคีย์ "${STORAGE_KEY_ACTIVEVIEW}" ไม่สำเร็จ!`, error);
  }
}

//ดึงข้อมูล page ปัจจุบันที่ผู้ใช้เปิดไว้ไปวาดจอตอนกดรีหน้าเว็บ
export function getActiveView(): ViewType {
  try {
    const viewType = sessionStorage.getItem(STORAGE_KEY_ACTIVEVIEW) as ViewType | null;
    if (viewType) {
      return viewType
    }
  } catch (error) {
    console.error("ข้อมูลใน LocalStorage เสียหาย!", error)
  }
  return 'view-overview';
}