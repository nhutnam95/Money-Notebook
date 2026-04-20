import type { Expense } from '../types/expense';
import { categoryLabels, categoryColors } from '../types/expense';
import './ExpenseList.css';

interface ExpenseListProps {
  expenses: Expense[];
  onDeleteExpense: (id: string) => void;
  onEditExpense: (expense: Expense) => void;
}

export default function ExpenseList({ expenses, onDeleteExpense, onEditExpense }: ExpenseListProps) {
  // Filter to show only current month's expenses
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  
  const currentMonthExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date + 'T00:00:00');
    return expenseDate.getFullYear() === currentYear && expenseDate.getMonth() === currentMonth;
  });

  const totalAmount = currentMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  const groupedByDate = currentMonthExpenses.reduce(
    (acc, expense) => {
      if (!acc[expense.date]) {
        acc[expense.date] = [];
      }
      acc[expense.date].push(expense);
      return acc;
    },
    {} as Record<string, Expense[]>
  );

  const sortedDates = Object.keys(groupedByDate).sort().reverse();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00');
    return new Intl.DateTimeFormat('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  if (currentMonthExpenses.length === 0) {
    return (
      <div className="expense-list">
        <h2>Danh sách chi tiêu</h2>
        <div className="empty-state">
          <p>Chưa có chi tiêu nào trong tháng này. Hãy thêm chi tiêu đầu tiên!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="expense-list">
      <h2>Danh sách chi tiêu</h2>
      
      <div className="summary">
        <div className="total">
          <span>Tổng chi tiêu:</span>
          <strong>{formatCurrency(totalAmount)}</strong>
        </div>
        <div className="count">
          <span>Số giao dịch:</span>
          <strong>{currentMonthExpenses.length}</strong>
        </div>
      </div>

      {sortedDates.map((date) => (
        <div key={date} className="date-group">
          <h3 className="date-header">{formatDate(date)}</h3>
          <div className="expenses-for-date">
            {groupedByDate[date].map((expense) => (
              <div
                key={expense.id}
                className="expense-item"
                style={{ borderLeftColor: categoryColors[expense.category] }}
              >
                <div className="expense-info">
                  <div className="expense-header">
                    <span className="category-badge">
                      {categoryLabels[expense.category]}
                    </span>
                    <span className="description">{expense.description}</span>
                  </div>
                  <span className="amount">{formatCurrency(expense.amount)}</span>
                </div>
                <div className="expense-actions">
                  <button
                    className="edit-btn"
                    onClick={() => onEditExpense(expense)}
                    title="Chỉnh sửa"
                  >
                    ✏️
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => onDeleteExpense(expense.id)}
                    title="Xóa"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
