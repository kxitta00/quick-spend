import './style.css'
import { dom } from "./ui/domElements";
import { renderSummaryCards } from "./ui/renderSummary";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "./constants";
import { type Catagory, type Transaction, type ViewType } from "./types";
import { saveTransactions, getTransactions } from "./storage/transactionStorage";
import { renderCategoryButtons } from "./ui/renderCategories";
import { formatThaiDate, formatThaiTime } from "./utils/formatters";
import { switchPage } from "./ui/switchPage";

import { createIcons, icons } from "lucide";
createIcons({ icons });


//ตัวแปรคุม state
let selectedCategoryId = '';
let toggleCategory: 'expense' | 'income' = 'expense';


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

})
//โหมดรายรับ
dom.btnIncome.addEventListener('click', () => {
  selectedCategoryId = ''
  dom.amountInput.value = ''
  toggleCategory = 'income'
  dom.btnIncome.classList.add('active')
  dom.btnExpense.classList.remove('active')
  renderCategoryButtons(INCOME_CATEGORIES)
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



//สั่งวาดจอตอนเปิดเว็บครั้งแรก
switchPage('view-overview');
dom.formTimeDisplay.textContent = `บันทึกวันและเวลาให้อัตโนมัติ · วันนี้ ${formatThaiTime()}`
dom.overviewTimeDisplay.textContent = formatThaiDate()
renderCategoryButtons(EXPENSE_CATEGORIES)
renderSummaryCards()

