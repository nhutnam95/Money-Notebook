// Local Storage Service
// Simple localStorage-based persistence for expenses

import type { Expense } from '../types/expense';

const STORAGE_KEY = 'expenses';

// Initialize - load all expenses from localStorage
export const initializeAuth = async (): Promise<void> => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  }
};

// Add expense to localStorage
export const addExpenseToDb = async (expense: Omit<Expense, 'id'>): Promise<string> => {
  const id = Date.now().toString();
  const fullExpense: Expense = { id, ...expense };

  const saved = localStorage.getItem(STORAGE_KEY);
  const expenses = saved ? JSON.parse(saved) : [];
  expenses.unshift(fullExpense);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));

  return id;
};

// Delete expense from localStorage
export const deleteExpenseFromDb = async (expenseId: string): Promise<void> => {
  const saved = localStorage.getItem(STORAGE_KEY);
  const expenses = saved ? JSON.parse(saved) : [];
  const filtered = expenses.filter((e: Expense) => e.id !== expenseId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

// Get all expenses
export const getExpenses = async (): Promise<Expense[]> => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
};

// Subscribe to expenses (immediately call callback)
export const subscribeToExpenses = (
  callback: (expenses: Expense[]) => void,
  onError?: (error: Error) => void
): (() => void) => {
  getExpenses()
    .then(callback)
    .catch((error) => onError?.(error as Error));

  // Return no-op unsubscribe function
  return () => {};
};

