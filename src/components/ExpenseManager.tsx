import { useState, useEffect } from 'react';
import type { Expense, CategoryType } from '../types/expense';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import CategoryStats from './CategoryStats';
import './ExpenseManager.css';

export default function ExpenseManager() {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem('expenses');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const handleAddExpense = (
    description: string,
    amount: number,
    category: CategoryType,
    date: string
  ) => {
    const newExpense: Expense = {
      id: Date.now().toString(),
      description,
      amount,
      category,
      date,
    };
    setExpenses([...expenses, newExpense]);
  };

  const handleDeleteExpense = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa chi tiêu này?')) {
      setExpenses(expenses.filter((e) => e.id !== id));
    }
  };

  const handleEditExpense = (expense: Expense) => {
    // Remove the old expense and user can re-add it
    handleDeleteExpense(expense.id);
  };

  return (
    <div className="expense-manager">
      <header className="app-header">
        <h1>📊 Quản Lý Chi Tiêu</h1>
        <p>Theo dõi và quản lý chi tiêu cá nhân của bạn</p>
      </header>

      <main className="app-main">
        <div className="form-section">
          <ExpenseForm onAddExpense={handleAddExpense} />
        </div>

        <div className="content-section">
          <div className="left-column">
            <ExpenseList
              expenses={expenses}
              onDeleteExpense={handleDeleteExpense}
              onEditExpense={handleEditExpense}
            />
          </div>

          <div className="right-column">
            <CategoryStats expenses={expenses} />
          </div>
        </div>
      </main>
    </div>
  );
}
