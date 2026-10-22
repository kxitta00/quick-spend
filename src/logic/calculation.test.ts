import { test, expect } from "bun:test";
import { calculateBalance, calculateTotalIncome, calculateTotalExpense, calculateMonthlyExpense } from "./calculations";
import { type Transaction } from "../types";

test("calculateBalance: คำนวณรายรับลบรายจ่ายถูกต้อง", () => {

  const mockData: Transaction[] = [
    { id: "1", type: "income", amount: 1000, category: { id: "1", name: "เงินเดือน", icon: "banknote" }, createdAt: "2026-10-22" },
    { id: "2", type: "expense", amount: 300, category: { id: "2", name: "อาหาร", icon: "utensils" }, createdAt: "2026-10-22" },
  ];

  const monthMock: Transaction[] = [
    { id: "1", type: "expense", amount: 500, category: { id: "1", name: "เงินเดือน", icon: "banknote" }, createdAt: new Date().toISOString() },
    { id: "2", type: "expense", amount: 200, category: { id: "1", name: "เงินเดือน", icon: "banknote" }, createdAt: "2025-01-01T00:00:00" }
  ];

  expect(calculateMonthlyExpense(monthMock)).toBe(500)
  expect(calculateBalance([])).toBe(0)
  expect(calculateTotalIncome(mockData)).toBe(1000)
  expect(calculateTotalExpense(mockData)).toBe(300)
  expect(calculateBalance(mockData)).toBe(700);
});