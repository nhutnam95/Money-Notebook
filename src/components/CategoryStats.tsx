import type { Expense } from '../types/expense';
import { categoryLabels, categoryColors } from '../types/expense';
import './CategoryStats.css';

interface CategoryStatsProps {
  expenses: Expense[];
}

export default function CategoryStats({ expenses }: CategoryStatsProps) {
  // Filter to show only current month's expenses
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  
  const currentMonthExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date + 'T00:00:00');
    return expenseDate.getFullYear() === currentYear && expenseDate.getMonth() === currentMonth;
  });

  const categories = ['food', 'transport', 'entertainment', 'shopping', 'utilities', 'other'] as const;
  
  const stats = categories.map((category) => {
    const categoryExpenses = currentMonthExpenses.filter((e) => e.category === category);
    const total = categoryExpenses.reduce((sum, e) => sum + e.amount, 0);
    return {
      category,
      total,
      count: categoryExpenses.length,
    };
  }).filter((stat) => stat.total > 0);

  const grandTotal = stats.reduce((sum, stat) => sum + stat.total, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  if (stats.length === 0) {
    return null;
  }

  return (
    <div className="category-stats">
      <h2>Thống kê theo loại chi tiêu</h2>
      <div className="stats-container">
        {stats.map((stat) => {
          const percentage = (stat.total / grandTotal) * 100;
          return (
            <div key={stat.category} className="stat-item">
              <div className="stat-header">
                <span className="category-label">{categoryLabels[stat.category]}</span>
                <span className="stat-amount">{formatCurrency(stat.total)}</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: categoryColors[stat.category],
                  }}
                ></div>
              </div>
              <div className="stat-footer">
                <span>{percentage.toFixed(1)}%</span>
                <span>{stat.count} giao dịch</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
