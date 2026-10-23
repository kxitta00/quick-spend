import type { Catagory as Category } from "../types";
import { dom } from "../ui/domElements";
import { createIcons, icons } from "lucide";

//ฟังก์ชัน Render ปุ่มหมวดหมู่
export function renderCategoryButtons(categories: Category[]): void {
  dom.categoryGrid.innerHTML = categories.map((item) => {
    const id = item.id;
    const name = item.name;
    const icon = item.icon;
    return `
      <button type="button" class="category-btn" data-category="${id}"><i data-lucide="${icon}"></i><span
              class="category-title">${name}</span></button>
    `;
  }).join("");
  createIcons({ icons });
}
