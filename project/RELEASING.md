# 发布与恢复指南

这是 LovisMind 唯一的现行发布指南。根 README 介绍项目，`project/README.md` 介绍开发，`Knowledge Site/README.md` 规定内容格式，`backend/README.md` 说明账号与数据库。历史计划、验收报告和部署记录仅供追溯。

## 日常发布

需要 Node.js 24、Git 和已安装的项目依赖。首次运行 `npm ci`；本机已有 GitHub 推送权限和 Wrangler 的 Cloudflare 登录，账号须能读 Pages、读写生产 D1。登录使用 `npx wrangler login`，不在聊天、代码或命令参数中粘贴密钥。脚本使用现有认证，不创建 CI 凭据。

先仅提交本任务涉及的文件，再从 `project/` 运行：

```sh
npm run release
```

例如内容变更，在仓库根目录按实际文件暂存：

```sh
git add "Knowledge Site/实际书籍目录/实际章节.zh.md"
git commit -m "notes: update chapter"
cd project
npm run release
```

不要使用 `git add .` 或 `git add -A`。脚本要求工作区干净，不替你挑选文件或创建内容提交。它会把远端 `origin/main` 正常合并进当前分支，保留双方提交；冲突时停止，由维护者解决后重新执行。它将当前提交正常推送到 `origin/main`，不强推，也不切换或改写其他工作树中的本地 main。

依次执行：

1. 核对 origin，获取并合并 main。生产不允许用 `KNOWLEDGE_SITE_DIR` 指向仓库外的笔记。
2. 生成类型、构建页面与 Worker，运行前后端类型检查、导出边界、界面语言、内容刷新、认证和发布测试。
3. 将同一份内容暂存到生产 D1，并核对条目数和 JSON 完整性；此时不切换 `content_current`。
4. 推送 `HEAD:main`，由已有 Cloudflare Pages Git 集成构建。项目 `lovismind`，根目录 `project`，命令 `npm ci && npm run build && npm run verify`，输出 `out`，生产和预览均须 fail closed。
5. 查询生产构建状态，并轮询 `/api/release`，确认完整提交号、内容版本与就绪状态，最多等待 20 分钟。
6. 更新兼容旧部署的 `content_current` 指针，检查公开页面可用、匿名书库访问跳转到登录页，写入成功记录。

成功前不会报告已上线。脚本的自动验收不代替真实账号的阅读验证；首次变更登录或阅读逻辑后，还需在浏览器检查登录弹窗、书库与代表章节。常规发布不初始化管理员、不改账号、不配置密钥、不清理历史版本、不自动回滚数据库。

## 仅检查与预览

```sh
npm run release:check
```

只构建和运行本地检查，不合并、不推送、不写远端数据库。构建会生成被忽略的内容 SQL 和清单。认证测试使用独立临时数据库。

预览使用独立项目 `lovismind-preview` 和独立 D1，按需先执行对应环境迁移，随后：

```sh
npm run build
npm run verify
npm run content:import -- --remote --env=preview --stage
npm run deploy:preview
```

`content:import` 默认仍会导入后激活，适用于本地初始化；`--stage` 只导入。预览 Worker 读取构建绑定的内容，不依赖全局指针。预览验收通过后，再提交并执行正式发布命令。

## 版本、记录与恢复

内容版本是标准化目录和章节数据的 SHA-256 摘要。Windows CRLF 与 Linux LF 被统一，对象字段和文件扫描顺序固定；内容相同时版本相同。导入可重跑并从完整 SQL 分块边界恢复，不删除或覆盖已完整导入的版本。

每个新 Worker 绑定自身内容版本，构建回滚后会读取它对应的旧内容；`content_current` 只供历史部署兼容。不能只切换该指针来修改新版 Worker 的内容。保留仍被生产、预览或可回滚部署引用的版本。

记录位于被忽略的 `.backend-build/releases/<Git SHA>.json`，包含提交、内容版本、条目数、部署 ID/URL（查到时）、状态与时间，不含凭据或笔记正文。需要跨机器留档时，将记录保存到受控备份。

失败时查看记录与 Cloudflare 构建日志。推送前失败不会切换线上内容；推送后失败可能已完成部分部署，不应假定线上未改变。修复代码需新提交并重新发布；只是网络中断或等待超时，可在 HEAD 与远端 main 完全一致时运行：

```sh
npm run release -- --resume
```

恢复仍会重建、检查和补齐相同内容，但不重复推送。若 Pages 构建本身失败，先修复原因或在 Pages 重试该提交，再恢复。其他人已经更新 main 时先同步，不能用旧提交继续激活指针。

脚本用 `.backend-build/release.lock` 防止同一工作目录重复运行；若进程被强制终止，确认没有发布进程后才能删除遗留锁。不同电脑发布依靠正常 Git 推送拒绝覆盖、提交号校验和上线前后远端检查；不要同时发布不同版本。

应用回滚与数据库结构回滚是两回事。需要回滚时，在 Pages 选择已验证、带鉴权的历史部署，并核对该内容版本仍在 D1；账号数据和迁移不会随页面回滚。首次启用此流程之前的 Worker 使用全局指针，回滚到这些旧版时还需将指针配套恢复。数据库恢复单独按备份方案执行，禁止回滚到原公开静态站并继续声称需要登录。

## 数据库迁移与首次配置

新环境先配置正确 D1 绑定、独立 `INVITE_CODE_ENCRYPTION_KEY` 和 fail closed，按 [后端说明](backend/README.md#邀请码加密密钥与增量迁移) 完成迁移和首管初始化。日常发布不重复初始化。

新增迁移必须先在预览验证。生产迁移须与新旧 Worker 兼容，明确执行：

```sh
npx wrangler d1 migrations list DB --remote --env production
npx wrangler d1 migrations apply DB --remote --env production
```

随后运行统一发布命令。结构迁移无法可靠自动撤销，所以脚本不隐藏执行迁移；缺少必要表或字段时会失败。密钥不写入仓库、命令参数或发布记录。
