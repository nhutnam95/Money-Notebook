import { useState, useEffect } from 'react';
import type { Expense, CategoryType } from '../types/expense';
import { 
  initializeAuth, 
  addExpenseToDb, 
  deleteExpenseFromDb,
  subscribeToExpenses,
} from '../services/firebase';
import { useToast } from '../hooks/useToast';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import CategoryStats from './CategoryStats';
import MonthlyStats from './MonthlyStats';
import InstallPrompt from './InstallPrompt';
import Toast from './Toast';
import './ExpenseManager.css';

export default function ExpenseManager() {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem('expenses');
    return saved ? JSON.parse(saved) : [];
  });
  const [isOnline, setIsOnline] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const { toasts, addToast, removeToast } = useToast();

  // Initialize and load expenses
  useEffect(() => {
    const init = async () => {
      try {
        await initializeAuth();
        
        // Load expenses
        const unsubscribe = subscribeToExpenses(
          (loadedExpenses) => {
            setExpenses(loadedExpenses);
            setIsLoading(false);
          },
          (error) => {
            console.warn('Load error:', error);
            setIsLoading(false);
          }
        );

        return unsubscribe;
      } catch (error) {
        console.warn('Initialization error:', error);
        setIsLoading(false);
      }
    };

    const unsubscribe = init();
    return () => {
      unsubscribe?.then(unsub => unsub?.());
    };
  }, []);

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleAddExpense = async (
    description: string,
    amount: number,
    category: CategoryType,
    date: string
  ) => {
    const newExpense: Omit<Expense, 'id'> = {
      description,
      amount,
      category,
      date,
    };

    try {
      const id = await addExpenseToDb(newExpense);
      // Immediately update state with new expense
      const fullExpense: Expense = { id, ...newExpense };
      setExpenses([fullExpense, ...expenses]);
      console.log('Expense added:', id);
    } catch (error) {
      console.error('Error adding expense:', error);
      addToast('Lỗi khi thêm chi tiêu', 'error');
    }
  };

  const handleEditExpense = (expense: Expense) => {
    // Load expense data into form
    setEditingExpense(expense);
  };

  const handleSaveEdit = async (
    id: string,
    description: string,
    amount: number,
    category: CategoryType,
    date: string
  ) => {
    try {
      const updatedExpense: Omit<Expense, 'id'> = {
        description,
        amount,
        category,
        date,
      };

      // Create new expense with same ID
      const fullExpense: Expense = { id, ...updatedExpense };

      // Immediately update state
      setExpenses(expenses.map(e => e.id === id ? fullExpense : e));
      setEditingExpense(null);

      // Save to db - delete old and add new
      await deleteExpenseFromDb(id);
      await addExpenseToDb(updatedExpense);
      
      addToast('Chi tiêu đã được cập nhật', 'edit');
      console.log('Expense updated:', id);
    } catch (error) {
      console.error('Error updating expense:', error);
      // Revert state on error
      const saved = localStorage.getItem('expenses');
      if (saved) setExpenses(JSON.parse(saved));
      addToast('Lỗi khi cập nhật chi tiêu', 'error');
    }
  };

  const handleCancelEdit = () => {
    setEditingExpense(null);
  };

  const handleDeleteExpense = async (id: string) => {
    try {
      // Immediately update state
      setExpenses(expenses.filter(e => e.id !== id));
      await deleteExpenseFromDb(id);
      addToast('Chi tiêu đã được xóa', 'delete');
    } catch (error) {
      console.error('Error deleting expense:', error);
      // Revert state on error
      const saved = localStorage.getItem('expenses');
      if (saved) setExpenses(JSON.parse(saved));
      addToast('Lỗi khi xóa chi tiêu', 'error');
    }
  };

  return (
    <div className="expense-manager">
      <InstallPrompt />
      
      {/* Toast notifications */}
      <Toast toasts={toasts} onRemove={removeToast} />
      
      {/* Offline indicator */}
      {!isOnline && (
        <div className="offline-banner">
          <span>📡 Chế độ offline</span>
        </div>
      )}

      <header className="app-header">
        <h1>📊 Money Notebook</h1>
        <p>Theo dõi và quản lý chi tiêu cá nhân của bạn</p>
      </header>

      <main className="app-main">
        <div className="form-section">
          <ExpenseForm 
            onAddExpense={handleAddExpense}
            onEditExpense={handleSaveEdit}
            editingExpense={editingExpense}
            onCancelEdit={handleCancelEdit}
            onSuccess={(msg) => addToast(msg, editingExpense ? 'edit' : 'success')}
          />
        </div>

        <div className="content-section">
          <div className="left-column">
            {isLoading ? (
              <div className="loading">
                <p>Đang tải dữ liệu...</p>
              </div>
            ) : (
              <ExpenseList
                expenses={expenses}
                onDeleteExpense={handleDeleteExpense}
                onEditExpense={handleEditExpense}
              />
            )}
          </div>

          <div className="right-column">
            <CategoryStats expenses={expenses} />
          </div>
        </div>

        <div className="monthly-section">
          <MonthlyStats expenses={expenses} />
        </div>
      </main>
    </div>
  );
}
