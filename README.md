# 💰 Quản Lý Chi Tiêu - Money Notebook

Ứng dụng web đơn giản nhưng mạnh mẽ để quản lý chi tiêu cá nhân của bạn. Dễ sử dụng, nhanh chóng và có thể cài đặt như một ứng dụng native trên điện thoại.

## ✨ Tính Năng Chính

✅ **Thêm chi tiêu** - Ghi lại mỗi giao dịch chi tiêu của bạn  
✅ **6 Loại chi tiêu** - Ăn uống, Giao thông, Giải trí, Mua sắm, Tiện ích, Khác  
✅ **Thống kê chi tiêu** - Xem biểu đồ phân bổ chi tiêu theo danh mục  
✅ **Lịch sử giao dịch** - Xem tất cả giao dịch được sắp xếp theo ngày  
✅ **Lưu dữ liệu cục bộ** - Dữ liệu được lưu trên điện thoại/máy tính của bạn  
✅ **Hoạt động offline** - Sử dụng ứng dụng ngay cả khi không có internet  
✅ **Cài đặt như ứng dụng** - Xuất hiện trên màn hình chính như ứng dụng thường  

## 📱 Cài Đặt Trên Mobile

### **Trên iPhone (iOS)**
1. Mở Safari và truy cập vào ứng dụng
2. Nhấn **Chia sẻ** (⬆️) → **Thêm vào Màn hình chính**
3. Đặt tên và nhấn **Thêm**

### **Trên Android (Chrome)**
1. Mở Chrome và truy cập vào ứng dụng
2. Nhấn **Menu** (⋮) → **Cài đặt ứng dụng**
3. Hoặc chờ banner cài đặt xuất hiện và nhấn **Cài đặt**

Xem [PWA_INSTALL_GUIDE.md](PWA_INSTALL_GUIDE.md) để có hướng dẫn chi tiết hơn.

## 🚀 Bắt Đầu

### **Yêu cầu**
- Node.js 16+ 
- npm hoặc yarn

### **Cài đặt**
```bash
npm install
```

### **Chạy ứng dụng (Development)**
```bash
npm run dev
```
Ứng dụng sẽ chạy tại `http://localhost:5173`

### **Build cho Production**
```bash
npm run build
```

### **Kiểm tra lỗi**
```bash
npm run lint
```

## 📋 Cách Sử Dụng

### **Thêm chi tiêu mới**
1. Điền **mô tả** giao dịch (ví dụ: "Ăn trưa")
2. Nhập **số tiền** (VNĐ)
3. Chọn **loại chi tiêu** từ dropdown
4. Chọn **ngày** (mặc định là hôm nay)
5. Nhấn **Thêm chi tiêu**

### **Xem danh sách chi tiêu**
- Tất cả giao dịch được sắp xếp theo ngày (mới nhất trước)
- Mỗi giao dịch hiển thị:
  - Loại chi tiêu (với emoji)
  - Mô tả
  - Số tiền
  - Nút chỉnh sửa (✏️) và xóa (🗑️)

### **Xem thống kê**
- Bên phải màn hình hiển thị biểu đồ phân bổ chi tiêu
- Xem được tỷ lệ % cho mỗi loại chi tiêu
- Xem số giao dịch cho mỗi loại

### **Chỉnh sửa / Xóa**
- Nhấn 🗑️ để xóa một giao dịch (cần xác nhận)
- Nhấn ✏️ để chỉnh sửa (xóa rồi thêm lại với dữ liệu mới)

## 💾 Lưu Trữ Dữ Liệu

Dữ liệu được lưu tự động trong **localStorage** của trình duyệt:
- ✅ Dữ liệu không bao giờ được gửi lên máy chủ
- ✅ Dữ liệu vẫn còn ngay cả sau khi đóng ứng dụng
- ❌ Xóa dữ liệu ứng dụng/cache sẽ xóa tất cả dữ liệu
- 📌 Mỗi trình duyệt/tài khoản có dữ liệu riêng

## 🛠️ Công Nghệ Sử Dụng

- **React 19** - Thư viện giao diện người dùng
- **TypeScript** - Ngôn ngữ lập trình kiểu mạnh
- **Vite** - Công cụ build nhanh
- **PWA (Progressive Web App)** - Để cài đặt như ứng dụng
- **Service Worker** - Để hoạt động offline

## 📂 Cấu Trúc Dự Án

```
money-notebook/
├── src/
│   ├── components/          # Các thành phần React
│   │   ├── ExpenseForm.tsx      # Form thêm chi tiêu
│   │   ├── ExpenseList.tsx      # Danh sách chi tiêu
│   │   ├── CategoryStats.tsx    # Thống kê theo loại
│   │   ├── ExpenseManager.tsx   # Quản lý chính
│   │   └── InstallPrompt.tsx    # Gợi ý cài đặt ứng dụng
│   ├── types/               # TypeScript types
│   │   └── expense.ts           # Định nghĩa kiểu dữ liệu
│   ├── App.tsx              # Thành phần chính
│   ├── main.tsx             # Điểm vào ứng dụng
│   └── index.css            # Stylesheet toàn cục
├── public/
│   ├── manifest.json        # Cấu hình PWA
│   └── sw.js                # Service Worker
├── index.html               # HTML chính
├── vite.config.ts           # Cấu hình Vite
├── tsconfig.json            # Cấu hình TypeScript
└── package.json             # Cấu hình npm
```

## 🎨 Thiết Kế

- **Responsive** - Hoạt động trên desktop, tablet, và mobile
- **Modern UI** - Gradient đẹp, icon emoji, animation mượt
- **Dark Mode** - Hỗ trợ chế độ tối (theo cài đặt hệ thống)
- **Accessible** - Tuân theo tiêu chuẩn a11y

## 🔧 Tùy Chỉnh

### **Thêm loại chi tiêu mới**
Chỉnh sửa [src/types/expense.ts](src/types/expense.ts):
```typescript
export const categoryLabels: Record<CategoryType, string> = {
  food: '🍔 Ăn uống',
  // Thêm loại mới ở đây...
};
```

### **Thay đổi màu sắc**
Chỉnh sửa [src/components/CategoryStats.tsx](src/components/CategoryStats.tsx):
```typescript
export const categoryColors: Record<CategoryType, string> = {
  food: '#ff6b6b',  // Thay đổi màu ở đây
};
```

## 📝 Lưu Ý

- Dữ liệu được lưu **cục bộ** - không đồng bộ giữa các thiết bị
- Để sao lưu dữ liệu, bạn cần export thủ công hoặc sử dụng cloud storage
- Ứng dụng hoạt động tốt nhất trên:
  - Chrome/Edge 90+
  - Firefox 88+
  - Safari 14.1+ (iOS)
  - Samsung Internet 14+

## 🐛 Báo Cáo Lỗi

Nếu gặp vấn đề:
1. Kiểm tra Console (F12 → Console)
2. Xóa cache và reload lại trang
3. Thử một trình duyệt khác
4. Kiểm tra Service Worker (F12 → Application → Service Workers)

## 📞 Hỗ Trợ

- **Cài đặt PWA:** Xem [PWA_INSTALL_GUIDE.md](PWA_INSTALL_GUIDE.md)
- **Deploy lên Vercel:** Xem [COMPLETE_SETUP_GUIDE.md](COMPLETE_SETUP_GUIDE.md)

## 📄 License

Dự án này là mã nguồn mở.

---

**Chúc bạn quản lý chi tiêu hiệu quả! 🎉**
