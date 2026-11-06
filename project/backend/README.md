# LovisMind 账号与审核后阅读

当前分支实现账号注册、审核、邀请码、会话和阅读鉴权；邮件暂不接入。公开首页为 Landing Page，登录与注册弹窗接入真实账号系统，书库入口为 `/library/`。这是网站访问限制：用户已选择保留公开源码，GitHub 原文及历史公开部署不受新版登录保护。

最新状态：独立预览已部署，正式站未变。密码规则已恢复为 6–128 个字符，实际哈希参数已降低，预览登录 CPU 样本降到 4–8ms。新旧哈希迁移与实测结果见 [哈希计算降档记录](hash-cost-update.md)；正式部署仍须另行验收。

## 本地运行

使用 Node.js 24，所有命令在 `project/` 执行：

```sh
npm ci
npm run types:backend
npm run db:migrate
npm run content:import
npm run admin:init
npm run build
npm run dev:full
```

访问 `http://localhost:8788/`。必须用 Pages/Workers 开发服务器才能验证鉴权；`next dev` 只适合界面调试，不提供后端。不得用纯静态服务器发布 `out/`，其中包含阅读页的预生成正文、导航数据和附件，访问保护由 `_worker.js` 执行。

`admin:init` 通过终端交互读取用户名及隐藏密码，默认只写本地 D1。只有没有任何管理员时才插入首个管理员；不会提升已有普通用户或覆盖已有管理员密码。临时 SQL 和本地数据库均已忽略。生产管理员须使用自己的独立密码，本地验收账号不会上传云端。

```sh
npm run typecheck
npm run typecheck:backend
npm run verify
npm run verify:ui
npm run test:auth
npm run benchmark:auth
```

`test:auth` 使用 Miniflare / workerd 和独立临时 D1；请先执行 `npm run build`。`verify` 检查阅读页已经预生成，并扫描受保护页面以外的 HTML、RSC 数据和浏览器代码中的抽样正文及书目介绍；它不能证明公开 GitHub 仓库保密。数学和代码样式在真实阅读页面验证。

## 数据和权限

- `users`：规范化唯一用户名、版本化 scrypt 密码哈希、昵称、理由、角色、状态和审核版本。
- `sessions`：256 位随机令牌的 SHA-256 哈希，七天过期。`__Host-` Cookie 使用 Secure、HttpOnly、SameSite=Lax；不会存入 localStorage。
- `invites`：256 位随机邀请码的哈希、次数及有效期；明文只在创建时展示。插入用户的同一个数据库事务通过触发器验证邀请码并扣次数，失败回滚。
- `review_logs`：审核动作、操作者、内部备注。审核接口使用账号版本防止覆盖其他管理员的操作。
- `reset_tokens`：一次性、十五分钟有效的重置凭据哈希；签发及兑换均撤销旧会话。核实身份和安全转交由管理员完成；不发送邮件、不改变审核状态。
- `rate_limits`：D1 原子固定窗口计数；注册、登录、邀请码及重置均有限额。
- `content_versions`、`content_entries`、`content_current`：按原 slug 导入完整内容和剥离正文的目录数据，导入完成后才激活版本。重跑生成独立版本，不覆写当前版本。

后端每次从 D1 主库读取会话及当前账号状态，避免读取副本延迟让已禁用会话继续使用。普通注册忽略任何客户端角色与状态字段；管理员页面和 API 均检查权限。管理员账号不允许通过普通用户管理接口禁用或重置，首管恢复需受控数据库维护。

所有修改接口要求相同 Origin、JSON 和双提交 CSRF 令牌。请求体限制 16 KiB。密码恢复为 6–128 个字符，不限制纯数字；浏览器、API 和管理员初始化共用 `lib/password-policy.ts`。新 scrypt-v2 使用原生实现和 `N=512,r=8,p=1`，保留独立随机盐；scrypt-v1 保留原参数验证。首次成功登录自动迁移，必要时用 `auth:migrate` 在本机验证并迁移。终端输入以星号反馈，长度或确认错误可重试。错误日志不记录密码或完整令牌。

CPU 优化：重复用户名注册会在执行 scrypt 前返回，最终仍依赖数据库 UNIQUE 约束处理并发；格式非法的登录用户名直接返回通用凭据错误，格式合法但不存在的用户名仍执行假密码哈希以避免用户名时序探测。正常阅读仅校验会话，查询只读取用户标识、昵称、角色和状态，不读取密码哈希与申请理由。此前单独替换原生实现没有证明足够省 CPU；本次同时降低实际计算参数并采用原生实现，线上登录 CPU 样本为 4–8ms。

## 路由与 API

| 路由 | 访问条件 |
| --- | --- |
| `/`、`/login/`、`/register/`、`/reset-password/` | 公开；重置必须另持有效凭据 |
| `/library/`、`/categories/*`、`/books/*`、`/about/`、`/guestbook/`、`/favorites/` | 已通过账号 |
| `/admin/users/`、`/admin/invites/` | 已通过管理员 |

旧 `/account/` 跳转到 `/library/`。原有书籍和章节 URL 保留；书库、分类、书页和章节在构建时预生成。Worker 校验会话和审核状态后直接返回 HTML 或导航数据。受保护页面、内容接口及附件响应不允许共享缓存。公开目录仅含通用框架代码、品牌、字体、首页装饰和收款码。

| API | 作用 |
| --- | --- |
| `GET /api/auth/csrf` | 返回令牌并设置配套 HttpOnly Cookie |
| `POST /api/auth/register` | 用户名、密码、确认密码、申请理由及可选邀请码；昵称可选，默认使用用户名 |
| `POST /api/auth/login` | 验证密码后才披露 pending/rejected/disabled 状态 |
| `POST /api/auth/logout` | 撤销当前会话 |
| `GET /api/auth/me` | 当前账号；匿名返回 user:null |
| `POST /api/auth/reset-password` | 兑换 token、password、confirmPassword |
| `GET /api/admin/users?status=&page=1` | 每页 30 人、总数及待审核数量 |
| `PATCH /api/admin/users/:id` | action、note、version；approve/reject/disable/enable |
| `GET /api/admin/users/:id/reviews` | 最近 100 条审核记录 |
| `POST /api/admin/users/:id/reset-credential` | 必填身份核实备注，返回一次性凭据 |
| `GET /api/admin/invites?page=1` | 每页 30 个邀请码元数据；不返回任何哈希 |
| `POST /api/admin/invites` | maxUses（1–1000）、expiresAt（Unix 秒，至多一年） |
| `PATCH /api/admin/invites/:id` | action:revoke |
| `GET /api/content/catalog` | 已鉴权的目录、简介和展示译名，无正文 |
| `GET /api/content/chapters/:book/:chapter` | 已鉴权的章节正文及译文 |

CSRF 调用示例：先 GET 获取 `{token}` 和 Cookie，再在同源修改请求中带 Cookie、`X-CSRF-Token: token`、`Content-Type: application/json`。前端封装位于 `lib/api.ts`。错误采用 `{code,message}`；正确密码对应非 approved 账号时另返回 `{status}`。

## 云端部署（独立预览已执行，生产待确认）

现有 Pages 项目为 `lovismind`、生产分支 `main`，此前没有数据库或 Functions。配置中的 UUID 是本地占位值，不能直接用于云端。

1. **先确认运行费用。** 旧实现预览曾出现 1102；新实现登录 CPU 样本为 4–8ms，但仍需持续验证，详情见哈希降档记录。Workers Free HTTP CPU 限制为 10ms，当前实现不得假定免费可持续使用。Workers Paid 基础订阅为每月 5 美元，超额另计。不得自动开通付费；正式上线前须解决当前资源限制并验证真实 CPU、内存与并发。
2. 预览 D1 已创建、迁移并导入内容，其真实 UUID 已填入 `wrangler.jsonc` 的 preview 环境。生产 D1 尚未创建，生产占位 UUID 必须在正式部署前替换；不要共用数据库或会话数据。
3. 当前预览通过 Direct Upload 发布到独立 `lovismind-preview` 项目，预览绑定专用 D1，其 fail-open 已关闭。原 `lovismind` 项目配置保持不变。若未来正式接入 Git 构建，再确认构建根目录 `project`、命令 `npm ci && npm run build`、输出 `out` 及生产 DB 绑定。正式接入认证时也须关闭 fail-open。
4. 后续更新预览的命令如下。预览管理员已按用户选择从本地迁移，不需要重复初始化：

```sh
npx wrangler d1 migrations apply DB --remote --env preview
npm run content:import -- --remote --env=preview
npm run admin:init -- --remote --env=preview
npm run deploy:preview
```

5. 检查预览的注册、密码哈希真实 CPU/内存、审核、邀请码并发、退出/禁用/重置撤销、直链附件及 RSC 访问。确认前不合并、不发布到 main。
6. 生产部署时独立执行 production 迁移、内容导入和首管初始化，再切换生产。代码与数据库版本配套发布；当前导出页数由内容构建决定，新增章节后需同时发布新的静态页面与 API 内容版本。
7. 列出旧 Pages 部署、别名及 CDN 缓存；获得确认后清理或限制旧公开入口。保留公开源码的既定选择不受影响。仅回滚到另一个带鉴权的版本，不能回滚到原公开静态站并仍声称需要登录。

未来若有外部服务密钥，使用 Cloudflare Secrets，不能写入 Wrangler 文件或 Git；当前认证不需要额外会话签名密钥。

官方参考：[Pages advanced mode](https://developers.cloudflare.com/pages/functions/advanced-mode/)、[D1 batch](https://developers.cloudflare.com/d1/worker-api/d1-database/)、[Workers 限制](https://developers.cloudflare.com/workers/platform/limits/)、[Workers 费用](https://developers.cloudflare.com/workers/platform/pricing/)。

## 内容发布与维护

源文件继续由原加载器解析，不修改书名、分类、归属或编号。系统通用文案在 `lib/ui-language.ts`；目录和书目译名在 `lib/content-translations.ts`，随鉴权后的页面或内容接口下发。知识库内容变更后先构建、检查，再向目标环境导入内容并发布。

旧内容版本不自动删除，以支持回滚。可查询 `content_versions`，把 `content_current.version_id` 指回一个已验证版本；代码导出的 slug 页面也须与之兼容。定期评估旧版本存储量后再明确选择保留策略。

`scripts/maintenance.sql` 清理过期会话、已使用/过期重置凭据和过期限流计数，不删除审核记录。手动执行时明确选择环境，例如：

```sh
npx wrangler d1 execute DB --local --file scripts/maintenance.sql
```

本地开发遇到 Windows npm 全局入口或缓存权限问题时，可用安装目录的 `npm-cli.js` 并把缓存放到 `.cache/npm`；这属于本机工具修复，不要改云端认证或把密钥写入命令参数。
