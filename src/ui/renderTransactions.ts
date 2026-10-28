import { groupTransactionsByDate } from "../logic/transactionsGrouping";
import { getTransactions } from "../storage/transactionStorage";
import type { DateGroup, Transaction } from "../types";
import { formatThaiTimeWithDate, formatThaiMonthYear, formatCurrency, escapeHtml } from "../utils/formatters";
import { dom } from "./domElements";
import { createIcons, icons } from "lucide";

//ฟังก์ชันรอวาดจอในส่วนรายงาน รายการต่างๆ
export function renderTransactions(transactions?: Transaction[]): void {
  const rawList: Transaction[] = transactions ?? getTransactions()
  const tranGrop: DateGroup[] = groupTransactionsByDate(rawList);
  let html: string = '';

  if (rawList.length === 0 || tranGrop.length === 0) {
    dom.transactionsContainer.innerHTML = `
     <div class="empty-state" style="text-align: center; padding: 24px 0; color: var(--text-secondary);">
      ยังไม่มีรายการบันทึก
    </div>
    `;
    return
  }
  for (const item of tranGrop) {
    html += `
    <div class="group-header">
          <span class="group-date">${item.dateLabel}</span>
          <span class="group-total">${formatCurrency(item.dayTotal)}</span>
        </div>
    `
    for (const list of item.items) {
      const typeList = list.type === 'expense' ? `-${formatCurrency(list.amount)}` : `+${formatCurrency(list.amount)}`;
      html += `
  <div class="transaction-item">
          <div class="transaction-item-left">
            <div class="category-icon-box"><i data-lucide="${list.category.icon}"></i></div>
            <div class="item-note-time">
              <span class="item-title">${escapeHtml(list.note || list.category.name)}</span>
              <time class="item-time">${formatThaiTimeWithDate(new Date(list.createdAt))}</time>
            </div>
          </div>
          <div class="transaction-item-right">
            <span class="item-amount">${typeList}</span>
            <button class="btn-delete" type="button" data-id="${list.id}"><i data-lucide="trash-2"></i></button>
          </div>
        </div>
    `
    }
  }
  dom.transactionsContainer.innerHTML = html;
  createIcons({ icons });
}


//ฟังก์ชันในการกรองเดือนตามที่ผู้ใช้เลือกหรือเดือนปัจจุบัน
export function updateTransactionsView(selectedMonth: Date): void {
  dom.currentMonthDisplay.textContent = formatThaiMonthYear(selectedMonth);

  const monthFiltered: Transaction[] = getTransactions().filter(item => {
    const d = new Date(item.createdAt);
    return d.getMonth() === selectedMonth.getMonth() &&
      d.getFullYear() === selectedMonth.getFullYear();
  });

  const keyword = dom.searchInputPage2.value.trim().toLowerCase();
  const finalFiltered = keyword ? monthFiltered.filter(item => item.note?.toLowerCase().includes(keyword) || item.category.name.toLowerCase().includes(keyword)) : monthFiltered;

  renderTransactions(finalFiltered)
}