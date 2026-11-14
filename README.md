# Thử làm IT trong thời đại AI: dự án khởi đầu

Đây là dự án bạn dùng suốt khóa "Thử làm IT trong thời đại AI". Bây giờ nó chỉ là một màn hình chào. Qua từng bài học, bạn sẽ cùng trợ lý AI (Kilo Code trong VS Code) xây nó thành một ứng dụng thật, chạy trên điện thoại của bạn bằng Expo Go và trên trình duyệt.

Không cần tài khoản trả phí nào để chạy dự án này.

## Cần có

- Máy tính đã cài Node.js, Git và VS Code (script cài đặt của khóa đã làm việc này cho bạn).
- Ứng dụng **Expo Go** (miễn phí) trên điện thoại: tải từ App Store (iPhone) hoặc Google Play (Android).
- Điện thoại và máy tính dùng **cùng một mạng Wi-Fi**.

## Chạy ứng dụng

Mở Terminal trong VS Code (menu **Terminal → New Terminal**), rồi gõ:

```bash
npm install        # chỉ cần lần đầu, hoặc khi được nhắc
npx expo start
```

Một mã QR hiện ra trong Terminal. Sau đó:

- **iPhone:** mở ứng dụng Camera, quét mã QR, bấm vào thông báo để mở trong Expo Go.
- **Android:** mở Expo Go, chọn **Scan QR code**, quét mã QR.
- **Trình duyệt:** bấm phím `w` trong Terminal.

Muốn dừng, bấm `Ctrl + C` trong Terminal.

## Quay về điểm bắt đầu của một bài

Mỗi bài từ 2 đến 9 có một điểm bắt đầu sẵn (nhánh Git `bai-2` ... `bai-9`). Nếu bạn bị kẹt, hoặc muốn làm lại một bài từ đầu, chạy:

```bash
npm run bai -- 5
```

(thay `5` bằng số bài bạn muốn). Lệnh này:

1. Kiểm tra bạn có thay đổi nào chưa lưu (chưa commit) không. Nếu có, lệnh **dừng lại** để bạn không mất công sức.
2. Tải các điểm bắt đầu mới nhất từ GitHub (nếu có mạng).
3. Tạo nhánh mới `hoc/bai-5` từ điểm bắt đầu của bài 5 và chuyển sang đó. Nếu bạn đã có nhánh `hoc/bai-5` từ trước, nhánh cũ được giữ lại với tên `hoc/bai-5-cu-<thời gian>`.
4. Tự cài lại thư viện (`npm ci`) nếu danh sách thư viện của bài đó khác.

Nếu bạn có thay đổi chưa lưu nhưng vẫn muốn chuyển bài:

```bash
npm run bai -- 5 --force
```

Thay đổi của bạn **không bị xóa**: chúng được cất vào `git stash`. Xem lại bằng `git stash list`, lấy lại bằng `git stash apply stash@{0}`.

## Thẻ prompt

Các prompt dùng trong video nằm trong thư mục [`prompt-cards/`](prompt-cards/):

| File | Bài |
| --- | --- |
| `bai-2.md` | Bài 2: Ứng dụng đầu tiên bằng prompt |
| `bai-3.md` | Bài 3: Git |
| `bai-4.md` | Bài 4: Khi yêu cầu chat bị lỗi |
| `bai-5.md` | Bài 5: Đăng nhập Firebase và dữ liệu thời gian thực |
| `bai-7-mau.md` | Bài 7: mẫu để bạn tự viết prompt cho tính năng của mình |
| `bai-8.md` | Bài 8: Kiểm thử và sửa lỗi |

Mỗi prompt ghi rõ dùng model AI nào: **Mặc định** hay **Mạnh**. Chọn model ở ô phía dưới khung chat của Kilo Code trước khi gửi. Hãy dán đúng prompt, theo đúng thứ tự trong video.

Câu hỏi chung, không thuộc dự án này, hãy hỏi trong nhóm Zalo của khóa. Trợ lý AI ở đây chỉ giúp với ứng dụng của khóa học (và luôn giúp giải thích lỗi trong dự án của bạn).

## Khóa, token và file `.env`: những điều không được làm

Từ bài 5, ứng dụng cần cấu hình Firebase. Cấu hình này nằm trong file `.env` trên máy bạn.

- Tạo `.env` bằng cách sao chép `.env.example`, rồi điền giá trị theo hướng dẫn của bài 5.
- **Không** commit hay đẩy file `.env` lên GitHub. File này đã nằm trong `.gitignore`; đừng xóa dòng đó.
- **Không** dán khóa, token, mật khẩu hay nội dung `.env` vào chat với AI, vào nhóm Zalo, hay vào ảnh chụp màn hình gửi đi.
- **Không** viết khóa thẳng vào mã nguồn.
- **Không** chia sẻ khóa AI của khóa học (nằm trong cài đặt của Kilo Code) với người khác.
- Nếu lỡ để lộ một khóa, báo ngay trong nhóm Zalo để được đổi khóa mới.

## Trong dự án có gì

| Đường dẫn | Là gì |
| --- | --- |
| `App.tsx` | Màn hình của ứng dụng; các bài sẽ sửa và thêm file từ đây |
| `prompt-cards/` | Thẻ prompt của từng bài |
| `scripts/bai.mjs` | Lệnh quay về điểm bắt đầu của một bài (`npm run bai -- N`) |
| `AGENTS.md` | Quy tắc mà trợ lý AI luôn tuân theo. Đừng sửa. |
| `.kilocodeignore` | Các file trợ lý AI không được đọc (như `.env`) |
| `.env.example` | Mẫu cấu hình Firebase, chỉ có chỗ trống |

## Phiên bản

Dự án dùng **Expo SDK 58**, đúng phiên bản Expo Go hiện tại hỗ trợ. Mọi thư viện đều được ghim phiên bản chính xác để màn hình của bạn giống video. Đừng tự nâng cấp Expo hay thư viện; khi cần, khóa học sẽ cập nhật điểm bắt đầu và báo trong nhóm. Nếu cần thêm thư viện, dùng `npx expo install <tên-gói>` (không dùng `npm install <tên-gói>`), và chỉ dùng thư viện chạy được trong Expo Go.

Kiểm tra nhanh dự án còn đúng phiên bản và không lỗi kiểu dữ liệu: `npm run kiem-tra`.
