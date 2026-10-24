import './style.css'
import { dom } from "./ui/domElements";
import { renderSummaryCards } from "./ui/renderSummary";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "./constants";
import { type Catagory, type Transaction, type ViewType } from "./types";
import { saveTransactions, getTransactions, deleteTransaction } from "./storage/transactionStorage";
import { renderCategoryButtons } from "./ui/renderCategories";
import { formatThaiDate, formatThaiMonthYear, formatThaiTime } from "./utils/formatters";
import { switchPage } from "./ui/switchPage";
import { updateTransactionsView } from './ui/renderTransactions';

import { createIcons, icons } from "lucide";
createIcons({ icons });


//ตัวแปรคุม state
let selectedCategoryId = '';
let toggleCategory: 'expense' | 'income' = 'expense';
let currentSelectedMonth = new Date();

//ปุ่มหมวดหมู่
dom.categoryGrid.addEventListener('click', (event) => {
  const btn = (event.target as HTMLElement).closest('.category-btn') as HTMLButtonElement | null;
  if (!btn) return;
  dom.categoryGrid.querySelectorAll('.category-btn').forEach((b) => b.classList.remove('active'))
  btn.classList.add('active')
  const raw = btn.dataset.category
  selectedCategoryId = String(raw)
})


//ปุ่มสลับโหมด toggle
//โหมดใช้จ่าย
dom.btnExpense.addEventListener('click', () => {
  selectedCategoryId = ''
  dom.amountInput.value = ''
  toggleCategory = 'expense'
  dom.btnExpense.classList.add('active')
  dom.btnIncome.classList.remove('active')
  renderCategoryButtons(EXPENSE_CATEGORIES)
  dom.symbol.textContent = "฿"
})
//โหมดรายรับ
dom.btnIncome.addEventListener('click', () => {
  selectedCategoryId = ''
  dom.amountInput.value = ''
  toggleCategory = 'income'
  dom.btnIncome.classList.add('active')
  dom.btnExpense.classList.remove('active')
  renderCategoryButtons(INCOME_CATEGORIES)
  dom.symbol.textContent = "+฿"
})

//ฟรอม
dom.form.addEventListener('submit', (e) => {
  e.preventDefault();
  let transCategorys: Catagory[] = [];
  let rawNumber = dom.amountInput.value.trim();
  let rawNote = dom.noteInput.value.trim();
  let selecCateId = selectedCategoryId;
  let selecTogCate = toggleCategory;
  const now = new Date().toISOString();
  if (rawNumber === '' && !selecCateId) {
    alert('กรุณากรอกข้อมูลก่อนบันทึกรายการ!')
    return
  }
  if (rawNumber === '') {
    alert('กรุณากรอกจำนวนเงิน!!');
    return
  }
  if (isNaN(Number(rawNumber)) || Number(rawNumber) <= 0) {
    alert('ข้อมูลไม่ถูกต้องกรุณากรอกใหม่!!')
    return
  }
  if (!selecCateId) {
    alert('กรุณาเลือกหมวดหมู่ที่จะบันทึกรายการ!!')
    return
  }

  if (selecTogCate === 'expense') {
    transCategorys = EXPENSE_CATEGORIES
  } else {
    transCategorys = INCOME_CATEGORIES
  }
  const target: Catagory = transCategorys.find((item) => { return item.id === selecCateId }) || transCategorys[0];

  const newTransaction: Transaction = {
    id: crypto.randomUUID(),
    type: selecTogCate,
    amount: Number(rawNumber),
    category: target,
    note: rawNote.trim(),
    createdAt: now
  }

  const oldTransactions: Transaction[] = getTransactions();
  saveTransactions([newTransaction, ...oldTransactions]);

  dom.form.reset()
  selectedCategoryId = ''
  dom.categoryGrid.querySelectorAll('.category-btn').forEach((b) => b.classList.remove('active'))
  renderSummaryCards()
  updateTransactionsView(currentSelectedMonth)
})



//nav
dom.navButtons.addEventListener('click', (event) => {
  const navBtn = (event.target as HTMLElement).closest('.nav-item') as HTMLButtonElement | null;
  if (!navBtn) return;
  dom.navButtons.querySelectorAll('.nav-item').forEach((b) => b.classList.remove('active'))
  navBtn.classList.add('active')
  let diaplayType = navBtn.dataset.view;
  if (!diaplayType) return;
  switchPage(diaplayType as ViewType)
})

//delete transactionPage2
dom.transactionsContainer.addEventListener('click', (event) => {
  const btn = (event.target as HTMLElement).closest('.btn-delete') as HTMLButtonElement | null;
  if (!btn) { return };
  const id = btn.dataset.id;
  if (!confirm('ต้องการลบรายการนี้ใช่มั้ย?')) return;
  deleteTransaction(id!)
  renderSummaryCards()
  updateTransactionsView(currentSelectedMonth)
})

//searchInputPage2 ค้นหารายการ
dom.searchInputPage2.addEventListener('input', () => {
  updateTransactionsView(currentSelectedMonth)
})

//SelectedMonthPage2
//PrevMonth
dom.btnPrevMonth.addEventListener('click', () => {
  currentSelectedMonth.setDate(1);
  currentSelectedMonth.setMonth(currentSelectedMonth.getMonth() - 1);
  dom.currentMonthDisplay.textContent = `${formatThaiMonthYear(currentSelectedMonth)}`
  updateTransactionsView(currentSelectedMonth)
})

//nextMonth
dom.btnNextMonth.addEventListener('click', () => {
  currentSelectedMonth.setDate(1);
  currentSelectedMonth.setMonth(currentSelectedMonth.getMonth() + 1);
  dom.currentMonthDisplay.textContent = `${formatThaiMonthYear(currentSelectedMonth)}`
  updateTransactionsView(currentSelectedMonth)
})

//สั่งวาดจอตอนเปิดเว็บครั้งแรก
updateTransactionsView(currentSelectedMonth)
dom.displayTitle.textContent = 'ภาพรวม'
dom.symbol.textContent = "฿"
switchPage('view-overview');
dom.formTimeDisplay.textContent = `บันทึกวันและเวลาให้อัตโนมัติ · วันนี้ ${formatThaiTime()}`
dom.overviewTimeDisplay.textContent = formatThaiDate()
renderCategoryButtons(EXPENSE_CATEGORIES)
renderSummaryCards()

