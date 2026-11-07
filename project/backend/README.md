# LovisMind 账号与审核后阅读

当前分支实现账号注册、审核、邀请码、会话和阅读鉴权；邮件暂不接入。公开首页为 Landing Page，登录与注册弹窗接入真实账号系统，书库入口为 `/library/`。这是网站访问限制：用户已选择保留公开源码，GitHub 原文及历史公开部署不受新版登录保护。

密码规则为 6–128 个字符。降低哈希参数后，预览登录 CPU 样本为 4–8ms。新旧哈希迁移与实测结果见 [哈希计算降档记录](hash-cost-update.md)。

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

- `users`：保留输入大小写、唯一性与登录不区分大小写的用户名，版本化 scrypt 密码哈希、昵称、理由、角色、状态和审核版本。
- `sessions`：256 位随机令牌的 SHA-256 哈希，七天过期。`__Host-` Cookie 使用 Secure、HttpOnly、SameSite=Lax；不会存入 localStorage。
- `invites`：新邀请码为 6 位大写字母与数字（不分组，排除 0、1、I、O），接受小写输入。保存 SHA-256 哈希及 AES-256-GCM 加密副本；加密使用每条记录独立的 96 位随机 IV，并绑定管理编号作为附加认证数据。管理员可长期查看和复制，撤销或过期后仍可查看。旧 64 位邀请码仍有效，只有哈希的旧记录无法回显。插入用户的同一个数据库事务通过触发器验证邀请码并扣次数，失败回滚。
- `review_logs`：审核动作、操作者、内部备注。审核接口使用账号版本防止覆盖其他管理员的操作。
- `reset_tokens`：一次性、十五分钟有效的重置凭据哈希；签发及兑换均撤销旧会话。核实身份和安全转交由管理员完成；不发送邮件、不改变审核状态。
- `rate_limits`：D1 原子固定窗口计数；注册、登录、邀请码及重置均有限额。
- 留言发布单独采用每账号每分钟 20 条的窗口（`guestbook:v2:*`），替代旧的十分钟 5 条；其他接口的限额不变。达到限额返回 `GUESTBOOK_RATE_LIMITED` 与 `Retry-After` 秒数，前端保留草稿并显示倒计时，到期恢复发布。
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

构建会记录 Next.js 分段预取地址与实际静态文件的精确映射，例如 `/about/__next.about.__PAGE__.txt` 对应 `/about/__next.about/__PAGE__.txt`。Worker 先对原始路由执行原有鉴权，再解析已记录的映射；未知路径不做猜测或放宽权限。这避免分段预取 404 影响页面切换。

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
| `GET /api/admin/invites?page=1` | 每页 30 条，管理员可查看 `code:string\|null`；旧码为 null，不返回哈希或密文，禁止缓存 |
| `POST /api/admin/invites` | maxUses（1–1000）、expiresAt（Unix 秒，至多一年） |
| `PATCH /api/admin/invites/:id` | action:revoke |
| `GET /api/favorites`、`GET /api/favorites/status?book=...&chapter=...` | 当前账号的收藏列表及收藏状态 |
| `POST /api/favorites` | book、可选 chapter、saved；添加或取消本人收藏 |
| `GET /api/guestbook?before=...` | 分页读取可见留言，需已通过账号 |
| `POST /api/guestbook` | action:publish + message（1–1000 字符），或 action:delete + 本人留言 id |
| `GET /api/admin/guestbook?before=...`、`POST /api/admin/guestbook` | 管理员查看隐藏留言、执行 hide / restore |
| `GET /api/content/catalog` | 已鉴权的目录、简介和展示译名，无正文 |
| `GET /api/content/chapters/:book/:chapter` | 已鉴权的章节正文及译文 |

CSRF 调用示例：先 GET 获取 `{token}` 和 Cookie，再在同源修改请求中带 Cookie、`X-CSRF-Token: token`、`Content-Type: application/json`。前端封装位于 `lib/api.ts`。错误采用 `{code,message}`；正确密码对应非 approved 账号时另返回 `{status}`。

## 云端部署

正式 Pages 项目为 `lovismind`，生产分支为 `main`。Wrangler 顶层 `DB` 是本地占位，云端操作须指定 `preview` 或 `production`。

1. **先确认运行费用。** 旧实现预览曾出现 1102；新实现登录 CPU 样本为 4–8ms，但仍需持续验证，详情见哈希降档记录。Workers Free HTTP CPU 限制为 10ms，当前实现不得假定免费可持续使用。Workers Paid 基础订阅为每月 5 美元，超额另计。不得自动开通付费；正式上线前须解决当前资源限制并验证真实 CPU、内存与并发。
2. 预览 D1 为 `lovismind-auth-preview`，生产 D1 为 `lovismind-auth-production`，绑定见 `wrangler.jsonc`。两套环境各自维护账号、会话和内容版本。
3. 预览通过 Direct Upload 发布到独立 `lovismind-preview` 项目。正式项目通过 Git 构建，根目录为 `project`，命令为 `npm ci && npm run build && npm run verify`，输出为 `out`。正式项目的 Git 预览构建已关闭。Pages 环境均设为 fail closed。
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

### 邀请码加密密钥与增量迁移

发布本次更新前，先在目标数据库执行 `0004_recoverable_invites.sql` 迁移，并为目标 Pages 项目配置 `INVITE_CODE_ENCRYPTION_KEY` Secret，再发布应用。预览和生产使用各自独立密钥；不自动发布或修改云端密钥。该值为随机 32 字节的标准 Base64 编码，通过受控本地工具生成并安全输入，不放进命令参数、Wrangler 配置或 Git。

本地将独立密钥写入已忽略的 `.dev.vars`：`INVITE_CODE_ENCRYPTION_KEY=<32 字节随机值的 Base64 编码>`，再运行 `npm run db:migrate`。数据库不存储明文，加密密钥必须备份并长期保留；随意替换或丢失会导致已有加密邀请码无法回显。密钥轮换需另做数据重加密，本次不实现轮换。缺少或无效密钥时，生成新码和读取加密记录明确返回 503，不影响已有邀请码注册或只有旧记录的列表读取。

管理列表仍通过原有管理员鉴权，前端仅在已鉴权页面读取明文，不存入浏览器持久存储。密码重置凭据继续仅本次展示，登录会话、CSRF 和重置令牌保持 256 位随机长度。短码生成使用唯一约束处理碰撞，最多尝试 5 次；原有注册和邀请码限流、次数、过期和撤销检查继续生效。

Cloudflare Secret 设置及本地文件规则见 [Pages bindings / Secrets](https://developers.cloudflare.com/pages/functions/bindings/#secrets)，加密 API 见 [Workers Web Crypto](https://developers.cloudflare.com/workers/runtime-apis/web-crypto/)。

官方参考：[Pages advanced mode](https://developers.cloudflare.com/pages/functions/advanced-mode/)、[D1 batch](https://developers.cloudflare.com/d1/worker-api/d1-database/)、[Workers 限制](https://developers.cloudflare.com/workers/platform/limits/)、[Workers 费用](https://developers.cloudflare.com/workers/platform/pricing/)。

## 内容发布与维护

源文件继续由原加载器解析，不修改书名、分类、归属或编号。系统通用文案在 `lib/ui-language.ts`；目录和书目译名在 `lib/content-translations.ts`，随鉴权后的页面或内容接口下发。知识库内容变更后先构建、检查，再向目标环境导入内容并发布。

旧内容版本不自动删除，以支持回滚。可查询 `content_versions`，把 `content_current.version_id` 指回一个已验证版本；代码导出的 slug 页面也须与之兼容。定期评估旧版本存储量后再明确选择保留策略。

`scripts/maintenance.sql` 清理过期会话、已使用/过期重置凭据和过期限流计数，不删除审核记录。手动执行时明确选择环境，例如：

```sh
npx wrangler d1 execute DB --local --file scripts/maintenance.sql
```

本地开发遇到 Windows npm 全局入口或缓存权限问题时，可用安装目录的 `npm-cli.js` 并把缓存放到 `.cache/npm`；这属于本机工具修复，不要改云端认证或把密钥写入命令参数。
