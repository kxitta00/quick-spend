import { calculateDailyAverage, calculateLast3MonthsExpense, calculateCategoryBreakdown } from "../logic/reportCalculations";
import { dom } from "../ui/domElements";
import { formatCurrencyZeroDecimals, formatThaiMonthYear } from "..//utils/formatters";
import { getTransactions } from "../storage/transactionStorage";
import type { CategoryReportData, MonthlyBarData, Transaction } from "../types";
import { calculateTotalExpense } from "../logic/calculations";
import { createIcons, icons } from "lucide";

//ฟังก์ชันวาดจอในส่วน รายงาน
export function renderReports(allTransactions: Transaction[], selectedMonth: Date): void {
  const rawList: Transaction[] = allTransactions;
  const currentList: Transaction[] = rawList.filter((item) => {
    const now = new Date(selectedMonth)
    const itemDate = new Date(item.createdAt);
    if (itemDate.getMonth() === now.getMonth()
      && itemDate.getFullYear() === now.getFullYear()) {
      return item
    }
  })
  const monthExpense = calculateTotalExpense(currentList)

  // card-row
  dom.statMonthExpense.textContent = `${formatCurrencyZeroDecimals(monthExpense)}`
  dom.statDailyExpense.textContent = `${formatCurrencyZeroDecimals(calculateDailyAverage(currentList))}`

  //chart-bar
  let htmlChart: string = '';
  const rawChart: MonthlyBarData[] = calculateLast3MonthsExpense(rawList, selectedMonth);
  for (const item of rawChart) {
    const pillarHeight = Math.round((item.percent / 100) * 140);

    htmlChart += `<div class="bar-col">
  <div class="bar-value">${formatCurrencyZeroDecimals(item.amount)}</div>
  <div class="bar-pillar ${item.isActive ? 'active' : ''}" style="height: ${pillarHeight}px;"></div>
  <div class="bar-label">${item.monthLabel}</div>
</div>`;

  }
  //Category-reports
  let htmlCat: string = '';
  const rawCat: CategoryReportData[] = calculateCategoryBreakdown(currentList, selectedMonth)
  if (rawCat.length === 0) {
    htmlCat = `<div style="text-align: center; padding: 24px 0; color: var(--text-secondary);">ไม่มีข้อมูลรายจ่ายในเดือนนี้</div>`;
  }
  for (const item of rawCat) {
    htmlCat += `
   <div class="category-stat-item">
            <div class="stat-info-header">
              <div class="stat-info-left">
                <div class="stat-info-category-icon"><i data-lucide="${item.category.icon}"></i></div>
                <span class="stat-info-title">${item.category.name}</span>
              </div>
              <div class="stat-info-right">
                <span class="stat-info-amount">${formatCurrencyZeroDecimals(item.amount)}</span>
                <span class="stat-info-percent">${item.percent}%</span>
              </div>
            </div>
            <div class="category-progress-track">
              <div class="category-progress-fill" style="width:${item.percent}%;"></div>
            </div>
          </div>`
  }
  dom.reportBarChart.innerHTML = htmlChart
  dom.reportCategoryList.innerHTML = htmlCat
  createIcons({ icons });
}

//ฟังก์ชันในการกรองเดือนตามที่ผู้ใช้เลือกหรือเดือนปัจจุบัน
export function updateReportsView(selectedMonth: Date): void {
  dom.reportMonthDisplay.textContent = formatThaiMonthYear(selectedMonth);
  const allTransactions: Transaction[] = getTransactions()
  renderReports(allTransactions, selectedMonth)
}

