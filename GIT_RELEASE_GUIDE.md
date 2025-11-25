# Git Release Guide - Hướng dẫn tạo Tag và Release

Hướng dẫn chi tiết về cách tạo **Git Tags** và **GitHub Releases** cho dự án WebCake FN.

## 📋 Mục lục

1. [Tạo Git Tag](#tạo-git-tag)
2. [Push Tag lên GitHub](#push-tag-lên-github)
3. [Tạo GitHub Release](#tạo-github-release)
4. [Sử dụng Script Tự động](#sử-dụng-script-tự-động)
5. [Quy trình Release hoàn chỉnh](#quy-trình-release-hoàn-chỉnh)

---

## 🏷️ Tạo Git Tag

### Annotated Tag (Khuyến nghị)

```bash
# Tạo annotated tag với message
git tag -a v1.0.0 -m "Release v1.0.0 - Initial release"

# Xem tag chi tiết
git show v1.0.0
```

### Xem và quản lý Tags

```bash
# Xem tất cả tags
git tag
git tag -l

# Xem tags theo pattern
git tag -l "v1.0*"

# Xem tags theo thứ tự version
git tag -l --sort=-version:refname

# Xóa tag (local)
git tag -d v1.0.0
```

---

## 🚀 Push Tag lên GitHub

### Push tag cụ thể

```bash
# Push một tag
git push origin v1.0.0

# Push tất cả tags
git push origin --tags
```

### Xóa tag trên remote

```bash
# Xóa tag trên GitHub
git push origin --delete v1.0.0
```

---

## 📦 Tạo GitHub Release

### Cách 1: GitHub Web UI

1. Truy cập: `https://github.com/vuluu2k/webcake-fn/releases`
2. Click: "Draft a new release"
3. Chọn tag: `v1.0.0`
4. Điền title và description (copy từ CHANGELOG.md)
5. Click: "Publish release"

### Cách 2: GitHub CLI

```bash
# Cài đặt GitHub CLI
# macOS: brew install gh
# Sau đó: gh auth login

# Tạo release từ tag
gh release create v1.0.0 \
  --title "Release v1.0.0" \
  --notes-file CHANGELOG.md \
  --target main
```

---

## 🤖 Sử dụng Script Tự động

### Script release.sh

Script `release.sh` tự động hóa toàn bộ quy trình release:

```bash
# Chạy script
./release.sh

# Script sẽ:
# 1. Kiểm tra branch và working directory
# 2. Hỏi release type (patch/minor/major/custom)
# 3. Update version trong package.json
# 4. Build library
# 5. Commit changes
# 6. Tạo git tag
# 7. Push lên GitHub
# 8. Tạo GitHub release (nếu có gh CLI)
# 9. Publish lên npm (optional)
```

### Ví dụ sử dụng

```bash
# Make executable (chỉ cần làm 1 lần)
chmod +x release.sh

# Run script
./release.sh

# Follow prompts:
# - Chọn release type: 1 (patch), 2 (minor), 3 (major), hoặc 4 (custom)
# - Confirm version
# - Update CHANGELOG nếu cần
# - Publish to npm? (y/n)
```

---

## 🔄 Quy trình Release hoàn chỉnh

### Manual Release

```bash
# 1. Build library
npm run build

# 2. Update CHANGELOG.md (thêm section cho version mới)

# 3. Update version trong package.json (nếu cần)
npm version patch  # hoặc minor, major

# 4. Commit changes
git add .
git commit -m "chore: Bump version to 1.0.0"

# 5. Tạo tag
git tag -a v1.0.0 -m "Release v1.0.0 - Initial release"

# 6. Push
git push origin main
git push origin v1.0.0

# 7. Tạo GitHub release
gh release create v1.0.0 \
  --title "Release v1.0.0" \
  --notes-file CHANGELOG.md

# 8. Publish to npm (optional)
npm publish
```

### Automated Release (Khuyến nghị)

```bash
# Chỉ cần chạy script
./release.sh
```

---

## 📋 Release Checklist

Trước khi tạo release:

- [ ] Code đã được test kỹ
- [ ] Build production successful (`npm run build`)
- [ ] Không có linter errors
- [ ] README.md đã cập nhật
- [ ] CHANGELOG.md đã cập nhật với version mới
- [ ] Version trong package.json đã đúng
- [ ] All changes đã commit
- [ ] Tag message rõ ràng

---

## 🎯 Best Practices

### 1. Sử dụng Annotated Tags

```bash
# ✅ Good
git tag -a v1.0.0 -m "Release message"

# ❌ Bad
git tag v1.0.0
```

### 2. Tag naming convention

```bash
# ✅ Good
v1.0.0
v1.0.1
v2.0.0-beta.1

# ❌ Bad
release-1.0.0
1.0.0
v1_0_0
```

### 3. Semantic Versioning

- **PATCH** (1.0.0 → 1.0.1): Bug fixes
- **MINOR** (1.0.0 → 1.1.0): New features, backward compatible
- **MAJOR** (1.0.0 → 2.0.0): Breaking changes

---

## 🔧 Troubleshooting

### Tag đã tồn tại

```bash
# Xóa tag local
git tag -d v1.0.0

# Xóa tag remote
git push origin --delete v1.0.0

# Tạo lại tag
git tag -a v1.0.0 -m "New message"
git push origin v1.0.0
```

### Push tag bị lỗi

```bash
# Kiểm tra remote
git remote -v

# Force push (cẩn thận!)
git push origin v1.0.0 --force
```

---

## 📝 Summary

| Task | Command |
|------|---------|
| **Tạo annotated tag** | `git tag -a v1.0.0 -m "Message"` |
| **Push tag** | `git push origin v1.0.0` |
| **Xem tags** | `git tag -l` |
| **Xóa tag** | `git tag -d v1.0.0` |
| **GitHub release (CLI)** | `gh release create v1.0.0 --notes "..."` |
| **Automated release** | `./release.sh` |

---

**Happy Releasing! 🚀**

