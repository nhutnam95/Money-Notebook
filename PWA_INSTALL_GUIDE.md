# 📱 Cài Đặt Ứng Dụng "Quản Lý Chi Tiêu" Trên Mobile

Ứng dụng này hỗ trợ cài đặt như một ứng dụng native trên điện thoại của bạn. Dưới đây là hướng dẫn chi tiết cho các nền tảng khác nhau.

## 🔧 Tính Năng PWA (Progressive Web App)

✅ Cài đặt như ứng dụng native  
✅ Hoạt động offline (đã tải dữ liệu)  
✅ Tắt màn hình khóa tự động  
✅ Lưu dữ liệu vào localStorage  
✅ Icon ứng dụng trên màn hình chính  

---

## 📱 Hướng Dẫn Cài Đặt

### **Trên iPhone/iPad (iOS 13.4+)**

1. **Mở ứng dụng Safari**
   - Truy cập vào `http://localhost:5173/` (hoặc domain của bạn)

2. **Chia sẻ ứng dụng**
   - Nhấn nút **Chia sẻ** (vuông có mũi tên) ở dưới cùng màn hình

3. **Thêm vào Màn hình chính**
   - Chọn **"Thêm vào Màn hình chính"**
   - Đặt tên: "Quản Lý Chi Tiêu"
   - Nhấn **Thêm** ở góc phải trên

4. ✅ Xong! Ứng dụng sẽ xuất hiện trên màn hình chính

---

### **Trên Android (Chrome)**

#### **Phương pháp 1: Dùng Menu**
1. **Mở Chrome**
   - Truy cập vào `http://localhost:5173/`

2. **Menu trình duyệt**
   - Nhấn 3 chấm (⋮) ở góc phải trên

3. **Cài đặt**
   - Chọn **"Cài đặt ứng dụng"** hoặc **"Cài đặt trang này"**
   - Hoặc tìm mục **"Thêm vào Màn hình chính"**

4. ✅ Xong! Ứng dụng sẽ được cài đặt và xuất hiện trên màn hình chính

#### **Phương pháp 2: Tự động (khuyên dùng)**
- Khi truy cập lần đầu, Chrome có thể hiển thị banner cài đặt
- Chỉ cần nhấn **"Cài đặt"** trong banner

---

### **Trên Android (Firefox)**

1. **Mở Firefox**
   - Truy cập vào `http://localhost:5173/`

2. **Menu trình duyệt**
   - Nhấn 3 dòng (≡) ở góc phải dưới

3. **Tùy chỉnh trang**
   - Chọn **"Thêm vào Màn hình chính"**

4. ✅ Xong!

---

### **Trên Android (Edge)**

1. **Mở Microsoft Edge**
   - Truy cập vào `http://localhost:5173/`

2. **Menu**
   - Nhấn 3 chấm (⋮)

3. **Ứng dụng**
   - Chọn **"Cài đặt ứng dụng này"** hoặc **"Cài đặt trang"**

4. ✅ Xong!

---

## 🎯 Sau Khi Cài Đặt

### **Lợi Ích:**
- ⚡ Tải nhanh hơn (không cần mở trình duyệt)
- 📴 Hoạt động offline (dữ liệu đã được lưu)
- 💾 Lưu trữ local - dữ liệu không bao giờ bị xóa trừ khi bạn gỡ ứng dụng
- 📲 Xuất hiện như ứng dụng thường trên màn hình chính

### **Lưu Ý:**
- Dữ liệu được lưu trong **localStorage** của trình duyệt
- Mỗi trình duyệt/tài khoản có dữ liệu riêng
- Xóa bộ nhớ cache sẽ xóa dữ liệu

---

## 🔄 Cập Nhật Ứng Dụng

- Ứng dụng sẽ tự động kiểm tra cập nhật
- Khi có cập nhật mới, bạn sẽ được thông báo
- Nhấn **"Cập nhật"** để lấy phiên bản mới nhất

---

## ❓ Xử Lý Sự Cố

### **Không thấy option cài đặt?**
- Đảm bảo bạn sử dụng một trình duyệt hỗ trợ PWA (Chrome, Firefox, Edge, Safari)
- Trang phải được truy cập qua HTTPS hoặc localhost
- Chờ vài giây để trình duyệt nhận dạng ứng dụng

### **Dữ liệu bị mất?**
- Không xóa dữ liệu ứng dụng/cache
- Dữ liệu được lưu trong **localStorage**
- Thử **Đăng xuất** khỏi tài khoản trình duyệt rồi đăng nhập lại

### **Ứng dụng không hoạt động offline?**
- Đảm bảo Service Worker được đăng ký (kiểm tra Console DevTools)
- Thử cài đặt lại ứng dụng

---

## 🚀 Tính Năng Bổ Sung

### **Shortcuts (Phím tắt)**
Một số thiết bị cho phép tạo phím tắt nhanh:
- **➕ Thêm chi tiêu** - Thêm nhanh một giao dịch mới
- **📈 Xem thống kê** - Xem báo cáo chi tiêu

Để sử dụng: Nhấn lâu icon ứng dụng → chọn phím tắt

---

## 📞 Hỗ Trợ

Nếu gặp vấn đề, hãy kiểm tra:
1. Phiên bản trình duyệt có phải mới nhất?
2. Bạn đang sử dụng HTTPS hoặc localhost?
3. Service Worker có hoạt động? (Kiểm tra DevTools → Application → Service Workers)

---

**Chúc bạn sử dụng ứng dụng một cách thú vị! 🎉**
