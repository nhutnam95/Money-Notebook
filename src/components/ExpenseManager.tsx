import { useState, useEffect } from 'react';
import type { Expense, CategoryType } from '../types/expense';
import { 
  initializeAuth, 
  addExpenseToDb, 
  deleteExpenseFromDb,
  subscribeToExpenses,
} from '../services/firebase';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import CategoryStats from './CategoryStats';
import InstallPrompt from './InstallPrompt';
import './ExpenseManager.css';

export default function ExpenseManager() {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem('expenses');
    return saved ? JSON.parse(saved) : [];
  });
  const [isOnline, setIsOnline] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

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
      console.log('Expense added:', id);
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const handleDeleteExpense = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa chi tiêu này?')) return;

    try {
      await deleteExpenseFromDb(id);
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const handleEditExpense = async (expense: Expense) => {
    if (!confirm('Bạn có chắc chắn muốn chỉnh sửa chi tiêu này?')) return;

    try {
      await deleteExpenseFromDb(expense.id);
    } catch (error) {
      console.error('Error updating:', error);
    }
  };

  return (
    <div className="expense-manager">
      <InstallPrompt />
      
      {/* Offline indicator */}
      {!isOnline && (
        <div className="offline-banner">
          <span>📡 Chế độ offline</span>
        </div>
      )}

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
      </main>
    </div>
  );
}
