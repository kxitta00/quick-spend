import { dom } from "./domElements";
import { getTransactions } from "../storage/transactionStorage"
import { type Transaction, type ReportTransactions } from "../types";
import { calculateBalance, calculateTotalIncome, calculateTotalExpense, calculateMonthlyExpense, calculateMonthlyIncome, calculateTodayExpense, calculateTodayCount } from "../logic/calculations";
import { formatCurrency, formatCurrencyZeroDecimals } from "../utils/formatters";
import { DEFAULT_MONTHLY_BUDGET } from "../constants";

//ฟังก์ชัน render การ์ดหลัก 3 ใบ Hero, Card Row
export function renderSummaryCards(): void {
  const rawTrans: Transaction[] = getTransactions()
  const sumTransactions: ReportTransactions = {
    totalBalance: calculateBalance(rawTrans),
    totalExpense: calculateTotalExpense(rawTrans),
    totalIncome: calculateTotalIncome(rawTrans),
    totalMonthlyExpense: calculateMonthlyExpense(rawTrans),
    totalMonthlyIncome: calculateMonthlyIncome(rawTrans),
    totalTodayExpense: calculateTodayExpense(rawTrans),
    totalTodayCount: calculateTodayCount(rawTrans)
  }

  const monthlyBudget: number = DEFAULT_MONTHLY_BUDGET;
  const percent: number = monthlyBudget > 0 ? Math.round((sumTransactions.totalMonthlyExpense / monthlyBudget) * 100) : 0;
  const remaining = Math.max(0, monthlyBudget - sumTransactions.totalMonthlyExpense);

  //Hero Card
  dom.balanceAmount.textContent = formatCurrency(sumTransactions.totalBalance);
  dom.balanceSubtitle.textContent = `รายรับ ${formatCurrencyZeroDecimals(sumTransactions.totalIncome)} - รายจ่าย ${formatCurrencyZeroDecimals(sumTransactions.totalExpense)} `

  //Row Card 1
  dom.budgetPercent.textContent = `${percent}%`
  dom.monthlyExpense.textContent = formatCurrencyZeroDecimals(sumTransactions.totalMonthlyExpense);
  dom.monthlyBudget.textContent = `/${formatCurrencyZeroDecimals(monthlyBudget)}`;
  dom.budgetProgressFill.style.width = `${Math.min(100, percent)}%`
  dom.budgetRemaining.textContent = `เหลือ ${formatCurrencyZeroDecimals(remaining)}`

  //Row Card 2
  dom.todayExpense.textContent = `-${formatCurrency(sumTransactions.totalTodayExpense)}`
  dom.todayCount.textContent = `${sumTransactions.totalTodayCount} รายการ`


}