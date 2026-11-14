# Bài 7: Tính năng của riêng bạn (mẫu để điền)

Bài này không có prompt soạn sẵn. Bạn tự viết prompt cho tính năng của mình, dựa trên mẫu dưới đây.

Model AI: **Mạnh** cho bước lập kế hoạch và bước xây tính năng; **Mặc định** cho các sửa nhỏ và hỏi về lỗi. <!-- TODO: xác nhận sau buổi chạy thử -->

Cách dùng:

1. Sao chép file này thành `prompt-cards/bai-7-cua-toi.md`.
2. Điền phần "Mô tả tính năng" trước. Viết ngắn, bằng lời của bạn.
3. Thay mọi chỗ `[...]` trong các prompt bằng nội dung của bạn, rồi gửi lần lượt từng prompt.
4. Đọc kỹ AI định thay đổi gì trước khi bấm đồng ý. Không dán khóa, mật khẩu hay giá trị trong `.env` vào chat.

Nếu muốn làm lại từ đầu bài: `npm run bai -- 7`

## Mô tả tính năng

- Tên tính năng: [...]
- Ai dùng, để làm gì (một câu): [...]
- Người dùng làm những bước nào:
  1. [...]
  2. [...]
  3. [...]
- Cần lưu dữ liệu gì (nếu có): [...]
- Không làm trong lần này: [...]
- Làm xong khi: [mở ứng dụng trên điện thoại, làm ..., thấy ...]

## Prompt 1: lập kế hoạch

Model: **Mạnh**

```text
Tôi muốn thêm tính năng [tên tính năng] vào ứng dụng này.
Mục đích: [ai dùng, để làm gì].
Người dùng sẽ: [bước 1], [bước 2], [bước 3].
Dữ liệu cần lưu: [... hoặc "không có"].
Chưa cần làm: [...].
Hãy đọc dự án, rồi đề xuất kế hoạch theo từng bước nhỏ: sẽ tạo hoặc sửa những file nào và vì sao. Chưa sửa code, chờ tôi đồng ý kế hoạch.
```

## Prompt 2: làm theo kế hoạch

Model: **Mạnh**

```text
Tôi đồng ý kế hoạch. Hãy làm bước [số bước]. Trước khi sửa mỗi file, nói ngắn gọn sẽ thay đổi gì.
```

## Prompt 3: khi có lỗi

Model: **Mặc định**

```text
Khi tôi [làm gì], ứng dụng [hiện lỗi gì / không làm gì]. Thông báo lỗi:
[dán thông báo lỗi, KHÔNG dán khóa hay mật khẩu]
Hãy giải thích nguyên nhân bằng lời đơn giản, rồi đề xuất cách sửa.
```

## Prompt 4: kiểm tra lại

Model: **Mặc định**

```text
Tính năng đã chạy. Hãy liệt kê các bước tôi nên tự thử trên điện thoại để chắc chắn nó đúng với phần "Làm xong khi": [dán điều kiện làm xong].
```

## Ghi chú của tôi

[Ghi lại prompt nào hiệu quả, prompt nào không, để chia sẻ trong nhóm.]
