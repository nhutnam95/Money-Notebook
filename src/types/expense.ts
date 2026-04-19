export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: 'food' | 'transport' | 'entertainment' | 'shopping' | 'utilities' | 'other';
  date: string;
}

export type CategoryType = Expense['category'];

export const categoryLabels: Record<CategoryType, string> = {
  food: '🍔 Ăn uống',
  transport: '🚗 Giao thông',
  entertainment: '🎬 Giải trí',
  shopping: '🛍️ Mua sắm',
  utilities: '💡 Tiện ích',
  other: '❓ Khác',
};

export const categoryColors: Record<CategoryType, string> = {
  food: '#ff6b6b',
  transport: '#4ecdc4',
  entertainment: '#45b7d1',
  shopping: '#f7b731',
  utilities: '#5f27cd',
  other: '#95a5a6',
};
