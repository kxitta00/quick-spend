import { getTheme, saveTheme } from "../storage/setting";
import { STORAGE_KEY_THEME } from "../constants";
import { dom } from "../ui/domElements";

//สลับธีม สว่าง / มืด
export function applyTheme(theme: 'light' | 'dark'): void {
  document.documentElement.setAttribute('data-theme', theme)
  dom.themeToggle.classList.toggle('active', theme === 'dark')
  dom.themeStatusText.textContent = theme === 'dark' ? 'โหมดมืด' : 'โหมดสว่าง';
}