import { useState } from 'react';
import type { CategoryType } from '../types/expense';
import { categoryLabels } from '../types/expense';
import './ExpenseForm.css';

interface ExpenseFormProps {
  onAddExpense: (description: string, amount: number, category: CategoryType, date: string) => void;
}

export default function ExpenseForm({ onAddExpense }: ExpenseFormProps) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<CategoryType>('food');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description.trim() || !amount) {
      alert('Vui lòng điền đầy đủ thông tin');
      return;
    }

    const numAmount = parseFloat(amount);
    if (numAmount <= 0) {
      alert('Số tiền phải lớn hơn 0');
      return;
    }

    onAddExpense(description, numAmount, category, date);
    setDescription('');
    setAmount('');
    setCategory('food');
    setDate(new Date().toISOString().split('T')[0]);
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <h2>Thêm chi tiêu mới</h2>
      
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
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0"
          min="0"
          step="1000"
        />
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

      <button type="submit" className="submit-btn">Thêm chi tiêu</button>
    </form>
  );
}
