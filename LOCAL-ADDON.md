# LOCAL-ADDON · 本地增补说明（hjhsky fork）

本文件是本 fork 相对上游 op7418 原版的全部增补的底稿，与 SKILL.md 末尾「本地增补」节内容一致。上游同步后若增补被覆盖，照本文件重新附加即可。

## 增补内容

- `scripts/render-shot.mjs`：全页长截图脚本（新增文件）。
- `validate-social-deck.mjs` 新增 **R10 grid tail-row void**（FAIL 级）：检测多栏容器末行塌陷。
- `references/qa-checklist.md` 新增「Grid Tail-Row Void」小节：说明 3:4 画板下降列规则与修法。
- `SKILL.md` 末尾「本地增补 · 渲染与交付规矩」一节（原文未改，仅追加）。

## 四条规矩

1. 长页形态：长文、评审稿、讲义做一页到底的长页，沿用本 Skill 设计语言，不硬塞翻页版式。
2. 固定画布：viewport 锁设计宽，禁止响应式断点，设备只等比缩放不重排；关键内容静态写死。
3. 渲染自检：交付前必须用 scripts/render-shot.mjs 渲全页 PNG 并逐段目检（溢出、截断、错位、丢图、对比度），修完重渲再交付；只交 HTML 视为未完成。
4. 内容保真：先提取全文与原图列清单，排版后逐项核对；不概括、不删节、不改数字；原文矛盾只指出不擅改。

## render-shot.mjs 用法

```bash
# 在仓库根目录安装依赖（playwright-core，不下载浏览器包）
npm i playwright-core   # 社交卡仓库已有 playwright 依赖，npm install 亦可

node scripts/render-shot.mjs <输入.html> <输出.png> [宽度=1080] [倍率=2]
```

脚本自动探测系统 Chrome/Chromium 路径（含 /opt/meta-chromium/chrome、系统 Chrome、macOS Chrome）；探测不到时设置环境变量 CHROME_PATH 指向浏览器可执行文件。不要改用 Chromium 命令行截图（部分环境损坏），不要走 Playwright 官方浏览器下载（CDN 易中断）。
