import { STORAGE_KEY_ACTIVEVIEW } from "../constants";
import { type ViewType } from "../types";

export function saveActiveView(activeView: ViewType): void {
  try {
    localStorage.setItem(STORAGE_KEY_ACTIVEVIEW, activeView)
  } catch (error) {
    console.error(`เกิดข้อผิดพลาดเซฟคีย์ "${STORAGE_KEY_ACTIVEVIEW}" ไม่สำเร็จ!`, error);
  }
}

export function getActiveView(): ViewType {
  try {
    const viewType = localStorage.getItem(STORAGE_KEY_ACTIVEVIEW) as ViewType | null;
    if (viewType) {
      return viewType
    }
  } catch (error) {
    console.error("ข้อมูลใน LocalStorage เสียหาย!", error)
  }
  return 'view-overview';
}