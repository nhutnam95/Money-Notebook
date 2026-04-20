import { useState, useEffect } from 'react';
import type { Expense, CategoryType } from '../types/expense';
import { categoryLabels } from '../types/expense';
import './ExpenseForm.css';

interface ExpenseFormProps {
  onAddExpense: (description: string, amount: number, category: CategoryType, date: string) => void;
  onEditExpense?: (id: string, description: string, amount: number, category: CategoryType, date: string) => void;
  editingExpense?: Expense | null;
  onCancelEdit?: () => void;
  onSuccess?: (message: string) => void;
}

export default function ExpenseForm({ onAddExpense, onEditExpense, editingExpense, onCancelEdit, onSuccess }: ExpenseFormProps) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<CategoryType>('food');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [errors, setErrors] = useState<{ amount?: string; description?: string }>({});

  // Populate form when editing
  useEffect(() => {
    if (editingExpense) {
      setDescription(editingExpense.description);
      setAmount(formatAmountDisplay(editingExpense.amount));
      setCategory(editingExpense.category);
      setDate(editingExpense.date);
    } else {
      resetForm();
    }
  }, [editingExpense]);

  const resetForm = () => {
    setDescription('');
    setAmount('');
    setCategory('food');
    setDate(new Date().toISOString().split('T')[0]);
  };

  // Format amount with commas for display
  const formatAmountDisplay = (value: number | string) => {
    const numValue = typeof value === 'string' ? value.replace(/,/g, '') : value.toString();
    return numValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // Remove commas from amount for calculation
  const parseAmount = (value: string) => {
    return parseFloat(value.replace(/,/g, ''));
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    if (!value || /^\d+$/.test(value)) {
      setAmount(formatAmountDisplay(value));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: typeof errors = {};
    
    if (!amount) {
      newErrors.amount = 'Vui lòng nhập số tiền';
    }

    const numAmount = parseAmount(amount);
    if (amount && numAmount <= 0) {
      newErrors.amount = 'Số tiền phải lớn hơn 0';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    if (editingExpense && onEditExpense) {
      // Edit mode
      onEditExpense(editingExpense.id, description, numAmount, category, date);
      onSuccess?.('Cập nhật chi tiêu thành công ✓');
    } else {
      // Add mode
      onAddExpense(description, numAmount, category, date);
      onSuccess?.('Thêm chi tiêu thành công ✓');
    }

    resetForm();
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2>{editingExpense ? '✏️ Chỉnh sửa chi tiêu' : 'Thêm chi tiêu mới'}</h2>
        {editingExpense && onCancelEdit && (
          <button type="button" className="cancel-btn" onClick={onCancelEdit}>
            ✕
          </button>
        )}
      </div>
      
      <div className="form-group">
        <label htmlFor="description">Mô tả</label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Ví dụ: Ăn trưa"
        />
      </div>

      <div className="form-group">
        <label htmlFor="amount">Số tiền (VNĐ)</label>
        <input
          id="amount"
          type="text"
          value={amount}
          onChange={handleAmountChange}
          placeholder="0"
          inputMode="numeric"
          className={errors.amount ? 'input-error' : ''}
        />
        {errors.amount && <span className="error-message">{errors.amount}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="category">Loại chi tiêu</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value as CategoryType)}
        >
          {(Object.entries(categoryLabels) as Array<[CategoryType, string]>).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="date">Ngày</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="submit-btn">
          {editingExpense ? '💾 Lưu lại' : 'Thêm chi tiêu'}
        </button>
        {editingExpense && onCancelEdit && (
          <button type="button" className="cancel-btn-secondary" onClick={onCancelEdit}>
            Hủy
          </button>
        )}
      </div>
    </form>
  );
}
