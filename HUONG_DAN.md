# 📊 Hướng Dẫn Kết Nối Dashboard Với Google Sheets Của Bạn

## Bước 1 — Mở Dashboard (Xem ngay bây giờ được luôn!)
1. Mở thư mục `c:\Dự án mới\dashboard\`
2. **Double-click vào file `index.html`** → Mở bằng Chrome/Cốc Cốc
3. Bạn thấy dashboard với **dữ liệu mẫu** (màu vàng cảnh báo ở trên đầu)

---

## Bước 2 — Lấy link CSV từ Google Sheets

> Làm **3 lần** cho 3 sheet: **Kho đầu vào**, **Kho Tổng Thành Phẩm**, **Tổng Xuất Nhập Các Đội**

### Chi tiết từng bước:
1. Mở file Google Sheet: `https://docs.google.com/spreadsheets/d/1DD6ZBi_TJcNU_7j5zt3vd-CxnPczx7cqp3100VgzmGM`
2. Bấm vào **tab sheet** cần lấy (ví dụ: "Kho đầu vào") ở thanh dưới cùng
3. Chọn menu **Tệp (File)** → **Chia sẻ (Share)** → **Xuất bản lên web (Publish to web)**
4. Ở hộp thoại hiện ra:
   - Mục đầu tiên: chọn tên sheet (ví dụ: "Kho đầu vào")
   - Mục thứ hai: chọn **"Giá trị được phân tách bằng dấu phẩy (.csv)"**
5. Bấm nút **Xuất bản (Publish)** → bấm **OK**
6. **Copy đường link** xuất hiện (dài khoảng 100 ký tự, bắt đầu bằng `https://docs.google.com/...`)
7. Lặp lại cho 2 sheet còn lại

---

## Bước 3 — Dán link vào Dashboard

1. Trong Dashboard đang mở, bấm vào nút **⚙️** (góc trên phải)
2. Bảng cấu hình hiện ra bên phải
3. Dán từng link vào đúng ô:
   - 🟨 Ô "Kho Đầu Vào" → dán link của sheet "Kho đầu vào"
   - 🟩 Ô "Kho Tổng Thành Phẩm" → dán link của sheet "Kho Tổng Thành Phẩm"
   - 🟪 Ô "Tổng Xuất Nhập Các Đội" → dán link của sheet "Tổng Xuất Nhập Các Đội"
4. Bấm **"Lưu & Tải Lại"**

✅ Dashboard sẽ tự động tải dữ liệu thật và vẽ biểu đồ!

---

## Lưu ý quan trọng về cấu trúc Sheet

### Sheet "Kho đầu vào"
```
Cột A     | Cột B        | Cột C    | Cột D  | ...
Ngày      | Đậu tương    | Cám gạo  | Bắp    | ...
01/03/26  | 2500         | 1800     | 2100   | ...
```

### Sheet "Kho Tổng Thành Phẩm" (2 dòng header)
```
Cột A  | [Nhập thành phẩm  ]  | [Xuất bán           ] | [Tồn kho            ]
Ngày   | Cám A  | Cám B | ...  | Cám A  | Cám B | ...  | Cám A  | Cám B | ...
01/03  | 3200   | 2800  | ...  | 1500   | 1200  | ...  | 1700   | 1600  | ...
```

### Sheet "Tổng Xuất Nhập Các Đội" (2 dòng header)
```
Cột A  | [Nhập                              ] | [Xuất                              ]
Ngày   | Đội 04 | Đội 09 | Đội 38 | ...       | Đội 04 | Đội 09 | Đội 38 | ...
01/03  | 1500   | 1200   | 900    | ...        | 1200   | 900    | 700    | ...
```

---

## ❓ Nếu biểu đồ vẫn hiện dữ liệu mẫu sau khi dán link?

1. Kiểm tra lại link — phải có đuôi `output=csv`
2. Đảm bảo Google Sheet đã được **"Xuất bản lên web"** (Published to web)
3. Thử mở link trực tiếp trên Chrome — nếu thấy file CSV là đúng
4. Nhắn lại cho mình, mình sẽ hỗ trợ thêm!
