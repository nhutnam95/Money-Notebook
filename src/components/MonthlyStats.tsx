import { useState, useMemo } from 'react';
import type { Expense } from '../types/expense';
import { categoryLabels } from '../types/expense';
import './MonthlyStats.css';

interface MonthlySummary {
  month: string;
  year: number;
  monthNum: number;
  total: number;
  count: number;
  byCategory: Record<string, number>;
}

interface MonthlyStatsProps {
  expenses: Expense[];
}

export default function MonthlyStats({ expenses }: MonthlyStatsProps) {
  const [selectedMonth, setSelectedMonth] = useState<number>(() => {
    const now = new Date();
    return now.getMonth();
  });
  const [selectedYear, setSelectedYear] = useState<number>(() => {
    const now = new Date();
    return now.getFullYear();
  });
  const [selectedComparisonYear, setSelectedComparisonYear] = useState<number>(() => {
    const now = new Date();
    return now.getFullYear();
  });

  const getMonthlySummary = (): MonthlySummary[] => {
    const monthlyMap = new Map<string, MonthlySummary>();

    expenses.forEach((expense) => {
      const date = new Date(expense.date);
      const year = date.getFullYear();
      const monthNum = date.getMonth();
      const monthName = new Date(year, monthNum, 1).toLocaleDateString('vi-VN', {
        month: 'long',
        year: 'numeric',
      });
      const key = `${year}-${monthNum}`;

      if (!monthlyMap.has(key)) {
        monthlyMap.set(key, {
          month: monthName,
          year,
          monthNum,
          total: 0,
          count: 0,
          byCategory: {},
        });
      }

      const summary = monthlyMap.get(key)!;
      summary.total += expense.amount;
      summary.count += 1;
      summary.byCategory[expense.category] =
        (summary.byCategory[expense.category] || 0) + expense.amount;
    });

    return Array.from(monthlyMap.values()).sort(
      (a, b) => a.year - b.year || a.monthNum - b.monthNum
    );
  };

  const getSelectedMonthData = useMemo(() => {
    const filtered = expenses.filter((expense) => {
      const date = new Date(expense.date);
      return date.getFullYear() === selectedYear && date.getMonth() === selectedMonth;
    });

    const byCategory: Record<string, number> = {};
    filtered.forEach((expense) => {
      byCategory[expense.category] = (byCategory[expense.category] || 0) + expense.amount;
    });

    return {
      total: filtered.reduce((sum, e) => sum + e.amount, 0),
      count: filtered.length,
      byCategory,
    };
  }, [expenses, selectedMonth, selectedYear]);

  const getAvailableYears = (): number[] => {
    const years = new Set<number>();
    expenses.forEach((expense) => {
      years.add(new Date(expense.date).getFullYear());
    });
    return Array.from(years).sort((a, b) => b - a);
  };

  const formatCurrency = (value: number): string => {
    return value.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  const monthlySummary = getMonthlySummary();

  if (monthlySummary.length === 0) {
    return (
      <div className="monthly-stats">
        <h3>📅 Thống Kê Theo Tháng</h3>
        <p className="empty-state">Chưa có dữ liệu để hiển thị</p>
      </div>
    );
  }

  const monthNames = [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ];
  const availableYears = getAvailableYears();

  return (
    <div className="monthly-stats">
      <h3>📅 Thống Kê Theo Tháng</h3>

      {/* Filter Section */}
      <div className="filter-section">
        <div className="filter-group">
          <label htmlFor="month-select">Chọn tháng:</label>
          <select
            id="month-select"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="filter-select"
          >
            {monthNames.map((month, index) => (
              <option key={index} value={index}>
                {month}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="year-select">Chọn năm:</label>
          <select
            id="year-select"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="filter-select"
          >
            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Selected Month Summary */}
      <div className="monthly-summary-card">
        <div className="summary-item">
          <span className="label">Tháng được chọn:</span>
          <span className="value">
            {monthNames[selectedMonth]} {selectedYear}
          </span>
        </div>
        <div className="summary-item">
          <span className="label">Tổng chi tiêu:</span>
          <span className="value">{formatCurrency(getSelectedMonthData.total)}</span>
        </div>
        <div className="summary-item">
          <span className="label">Số giao dịch:</span>
          <span className="value">{getSelectedMonthData.count}</span>
        </div>
      </div>

      {/* Selected Month Details */}
      {getSelectedMonthData.count === 0 ? (
        <p className="empty-state">
          Không có chi tiêu trong {monthNames[selectedMonth]} {selectedYear}
        </p>
      ) : (
        <div className="monthly-details">
          <h4>Chi tiết {monthNames[selectedMonth]} {selectedYear}:</h4>
          <div className="category-breakdown">
            {Object.entries(getSelectedMonthData.byCategory)
              .sort((a, b) => b[1] - a[1])
              .map(([category, amount]) => (
                <div key={category} className="category-item">
                  <span className="category-name">{categoryLabels[category as keyof typeof categoryLabels]}</span>
                  <span className="category-amount">{formatCurrency(amount)}</span>
                  <div className="category-bar">
                    <div
                      className="category-bar-fill"
                      style={{
                        width: `${
                          getSelectedMonthData.total > 0
                            ? (amount / getSelectedMonthData.total) * 100
                            : 0
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* All Months Comparison Table */}
      <div className="monthly-details">
        <h4>Thống kê theo năm:</h4>
        
        {/* Year Filter for Comparison Table */}
        <div className="comparison-filter">
          <label htmlFor="comparison-year-select">Chọn năm:</label>
          <select
            id="comparison-year-select"
            value={selectedComparisonYear}
            onChange={(e) => setSelectedComparisonYear(Number(e.target.value))}
            className="filter-select"
          >
            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="monthly-table-container">
          <table className="monthly-table">
            <thead>
              <tr>
                <th>Tháng</th>
                <th>Số lần</th>
                <th>Tổng chi tiêu</th>
                <th title="So sánh phần trăm chi tiêu với tháng trước">Xu hướng (% so với tháng trước)</th>
              </tr>
            </thead>
            <tbody>
              {monthlySummary
                .filter((summary) => summary.year === selectedComparisonYear)
                .map((summary, index, filteredSummary) => {
                  const prevMonth = filteredSummary[index - 1];
                  const trend = prevMonth
                    ? ((summary.total - prevMonth.total) / prevMonth.total) * 100
                    : 0;
                  const trendIcon = trend > 5 ? '📈' : trend < -5 ? '📉' : '➡️';
                  const trendClass = trend > 5 ? 'up' : trend < -5 ? 'down' : 'neutral';

                  return (
                    <tr
                      key={`${summary.year}-${summary.monthNum}`}
                      className={
                        summary.year === selectedYear && summary.monthNum === selectedMonth
                          ? 'highlight-row'
                          : ''
                      }
                    >
                      <td className="month-name">{summary.month}</td>
                    <td className="count">{summary.count}</td>
                    <td className="total">{formatCurrency(summary.total)}</td>
                    <td
                      className={`trend ${trendClass}`}
                      title={
                        prevMonth
                          ? `${trend > 0 ? 'Tăng' : 'Giảm'} ${Math.abs(trend).toFixed(1)}% so với tháng trước`
                          : 'Không có tháng trước để so sánh'
                      }
                    >
                      {prevMonth ? (
                        <>
                          <span className="trend-icon">{trendIcon}</span>
                          <span className="trend-value">{Math.abs(trend).toFixed(1)}%</span>
                        </>
                      ) : (
                        '-'
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
