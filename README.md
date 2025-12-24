# 中国人常过的外国节日日历 (China Global Holidays Calendar)

这是一个 Node.js 项目，用于生成包含中国人常过的外国节日的 iCalendar (`.ics`) 文件，提供本地化的中文名称、温馨的节日寄语以及贴心的提醒功能。

## ✨ 功能特性

- **包含的节日**:
  - 情人节 (Valentine's Day)
  - 愚人节 (April Fool's Day)
  - 母亲节 (Mother's Day)
  - 父亲节 (Father's Day)
  - 万圣节 (Halloween)
  - 感恩节 (Thanksgiving) & 黑色星期五 (Black Friday)
  - 平安夜 (Christmas Eve)
  - 圣诞节 (Christmas)
- **温馨寄语**: 每个节日都附带了充满人情味的中文描述。
- **提醒功能**:
  - 提前 3 天提醒 (准备礼物或安排行程)
  - 节日当天提醒 (送上祝福)
- **未来预测**: 一次生成未来 5 年的日历数据。
- **自动更新**: 通过 GitHub Actions 每年自动运行更新。

## 🚀 使用方法

### 本地生成
1. 安装依赖:
   ```bash
   npm install
   ```
2. 运行生成脚本:
   ```bash
   node index.js
   ```
   日历文件将生成在 `public/holidays.ics`。

### 📅 订阅日历
将代码推送到 GitHub 后，您可以使用 Raw 文件链接订阅此日历：
`https://raw.githubusercontent.com/<USERNAME>/<REPO>/main/public/holidays.ics`

(请将 `<USERNAME>` 和 `<REPO>` 替换为您的 GitHub 用户名和仓库名)

## 🤖 自动化
本项目包含一个 GitHub Workflow (`.github/workflows/calendar.yml`)，配置为每年 1 月 1 日自动运行，以确保日历数据始终是最新的。