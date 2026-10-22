export const dom = {
  //Overview Page
  //1. Display 
  //1.1Card Hero
  overviewTimeDisplay: document.getElementById('current-date') as HTMLElement,
  balanceAmount: document.getElementById('balance-amount') as HTMLElement,
  balanceSubtitle: document.getElementById('balance-subtitle') as HTMLElement,

  //1.2Card Row
  //row1
  budgetPercent: document.getElementById('budget-percent') as HTMLElement,
  monthlyExpense: document.getElementById('monthly-expense-amount') as HTMLElement,
  monthlyBudget: document.getElementById('monthly-budget-amount') as HTMLElement,
  budgetProgressFill: document.getElementById('budget-progress-fill') as HTMLElement,
  budgetRemaining: document.getElementById('budget-remaining') as HTMLElement,
  //row2
  todayExpense: document.getElementById('today-expense-amount') as HTMLElement,
  todayCount: document.getElementById('today-transaction-count') as HTMLElement,

  //2. Form 
  form: document.getElementById('quick-add-form') as HTMLFormElement,
  btnExpense: document.getElementById('btn-type-expense') as HTMLButtonElement,
  btnIncome: document.getElementById('btn-type-income') as HTMLButtonElement,
  amountInput: document.getElementById('amount-input') as HTMLInputElement,
  categoryGrid: document.querySelector('.category-grid') as HTMLElement,
  categoryButtons: document.querySelectorAll<HTMLButtonElement>('.category-btn'),
  noteInput: document.getElementById('note-input') as HTMLInputElement,
  submitBtn: document.getElementById('submit-btn') as HTMLButtonElement,
  formTimeDisplay: document.getElementById('form-timestamp') as HTMLElement

}