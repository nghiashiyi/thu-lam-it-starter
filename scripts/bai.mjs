#!/usr/bin/env node
// Đưa dự án về điểm bắt đầu của một bài học.
//
//   npm run bai -- 5            chuyển sang bài 5 (nhánh hoc/bai-5, tạo từ bai-5)
//   npm run bai -- 5 --force    như trên, nhưng cất các thay đổi chưa lưu vào git stash trước
//
// Không bao giờ xóa công sức của bạn:
// - thay đổi chưa commit: từ chối, hoặc cất vào git stash khi có --force;
// - nhánh hoc/bai-N cũ: được đổi tên thành hoc/bai-N-cu-<thời gian>, không bị ghi đè.

import { spawnSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const FIRST = 2;
const LAST = 9;
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function git(args, { allowFail = false, quiet = true } = {}) {
  const r = spawnSync('git', args, {
    cwd: ROOT,
    encoding: 'utf8',
    stdio: quiet ? ['ignore', 'pipe', 'pipe'] : 'inherit',
  });
  if (r.error) {
    fail('Không chạy được lệnh git. Bạn đã cài Git chưa? (' + r.error.message + ')');
  }
  if (r.status !== 0 && !allowFail) {
    const detail = (r.stderr || '').trim();
    fail(`Lệnh "git ${args.join(' ')}" bị lỗi.${detail ? '\n' + detail : ''}`);
  }
  return { ok: r.status === 0, out: (r.stdout || '').trim() };
}

function fail(message) {
  console.error('\n✖ ' + message + '\n');
  process.exit(1);
}

function info(message) {
  console.log('• ' + message);
}

function usage() {
  return [
    'Cách dùng:',
    `  npm run bai -- <số bài từ ${FIRST} đến ${LAST}>`,
    `  npm run bai -- <số bài> --force   (cất thay đổi chưa lưu vào git stash rồi chuyển)`,
    'Ví dụ:',
    '  npm run bai -- 5',
  ].join('\n');
}

function stamp() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}`;
}

function refExists(ref) {
  return git(['rev-parse', '--verify', '--quiet', ref + '^{commit}'], { allowFail: true }).ok;
}

function blobId(path) {
  const r = git(['rev-parse', '--verify', '--quiet', 'HEAD:' + path], { allowFail: true });
  return r.ok ? r.out : null;
}

// ---- 1. Đọc tham số ----
const args = process.argv.slice(2);
const force = args.includes('--force');
const rest = args.filter((a) => a !== '--force');
if (rest.length !== 1 || rest[0] === '-h' || rest[0] === '--help') {
  console.log(usage());
  process.exit(rest.length === 1 ? 0 : 1);
}
const match = /^(?:bai-?)?(\d+)$/i.exec(rest[0]);
const n = match ? Number(match[1]) : NaN;
if (!Number.isInteger(n) || n < FIRST || n > LAST) {
  fail(`"${rest[0]}" không phải số bài hợp lệ. Chỉ có bài ${FIRST} đến ${LAST}.\n\n${usage()}`);
}
const checkpoint = `bai-${n}`;
const target = `hoc/bai-${n}`;

// ---- 2. Kiểm tra đang ở trong dự án Git ----
if (!git(['rev-parse', '--is-inside-work-tree'], { allowFail: true }).ok) {
  fail('Thư mục này chưa phải là kho Git. Hãy mở đúng thư mục dự án của khóa học.');
}

// ---- 3. Thay đổi chưa lưu ----
const dirty = git(['status', '--porcelain']).out;
if (dirty) {
  if (!force) {
    fail(
      [
        'Bạn đang có thay đổi chưa lưu (chưa commit):',
        dirty
          .split('\n')
          .map((l) => '    ' + l)
          .join('\n'),
        '',
        'Chưa chuyển bài để không làm mất công sức của bạn. Hãy chọn một cách:',
        '  1. Commit các thay đổi này, rồi chạy lại lệnh.',
        `  2. Hoặc chạy: npm run bai -- ${n} --force`,
        '     (thay đổi sẽ được cất vào git stash, xem lại bằng "git stash list").',
      ].join('\n'),
    );
  }
  const message = `tu-dong-cat truoc khi chuyen sang ${checkpoint} (${stamp()})`;
  git(['stash', 'push', '--include-untracked', '-m', message]);
  info(`Đã cất thay đổi chưa lưu vào git stash: "${message}".`);
  info('Lấy lại sau bằng: git stash list, rồi git stash apply stash@{0}');
}

// ---- 4. Cập nhật từ máy chủ, nếu có ----
const remotes = git(['remote']).out.split('\n').filter(Boolean);
const remote = remotes.includes('origin') ? 'origin' : remotes[0];
if (remote) {
  info(`Đang tải các điểm bắt đầu mới nhất từ "${remote}"...`);
  if (!git(['fetch', '--prune', remote], { allowFail: true }).ok) {
    info('Không tải được (có thể đang mất mạng). Sẽ dùng bản đã có trên máy.');
  }
}

// ---- 5. Tìm điểm bắt đầu ----
const source = [remote && `${remote}/${checkpoint}`, checkpoint]
  .filter(Boolean)
  .find((ref) => refExists(ref));
if (!source) {
  fail(`Không tìm thấy điểm bắt đầu "${checkpoint}". Hãy kiểm tra mạng, rồi chạy lại lệnh.`);
}

// ---- 6. Giữ lại nhánh hoc/bai-N cũ (nếu có), rồi tạo nhánh mới ----
const lockBefore = blobId('package-lock.json');
if (refExists(`refs/heads/${target}`)) {
  const backup = `${target}-cu-${stamp()}`;
  git(['branch', '-m', target, backup]);
  info(`Nhánh "${target}" cũ được giữ lại với tên "${backup}".`);
}
git(['checkout', '--no-track', '-b', target, source]);
info(`Đã chuyển sang nhánh "${target}", tạo từ "${source}".`);

// ---- 7. Cài lại thư viện nếu danh sách thư viện thay đổi ----
// "npm ci" cài đúng như package-lock.json và không sửa file đó, nên dự án vẫn "sạch".
if (blobId('package-lock.json') !== lockBefore) {
  info('Danh sách thư viện đã thay đổi, đang cài lại thư viện ("npm ci")...');
  const r = spawnSync('npm', ['ci'], {
    cwd: ROOT,
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });
  if (r.status !== 0) {
    fail('Cài thư viện bị lỗi. Hãy chạy "npm ci" bằng tay; nếu vẫn lỗi, gửi thông báo lỗi vào nhóm Zalo.');
  }
}

console.log(`\n✔ Xong. Bạn đang ở điểm bắt đầu của bài ${n}. Chạy "npx expo start" để mở ứng dụng.\n`);
