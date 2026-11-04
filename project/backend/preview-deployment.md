# 独立预览部署记录

日期：2026-11-04。此次为预览发布，未发布正式站，未新开通付费服务。

- 预览入口：https://codex-backend-auth.lovismind-preview.pages.dev/
- 登录：https://codex-backend-auth.lovismind-preview.pages.dev/login/
- 用户审核：https://codex-backend-auth.lovismind-preview.pages.dev/admin/users/
- 邀请码：https://codex-backend-auth.lovismind-preview.pages.dev/admin/invites/
- Pages 项目：`lovismind-preview`；部署分支：`codex/backend-auth`；环境：`preview`。
- D1：`lovismind-auth-preview`，ID `0d09c223-76e4-40ec-8f55-001127442918`；两项迁移完成，178 条当前内容记录均为有效 JSON。
- 管理员：按用户明确选择，迁移本地 `lovis` 的用户名、昵称和密码哈希；未读取明文密码。使用本地原密码登录。未迁移其他本地用户或会话。

原项目 `lovismind` 保持生产部署 `34adbcbd-a2e8-4b82-a9bc-9c71a9d5cc7e`，没有修改其配置或切换域名。Cloudflare 要求同项目 preview/production 的 fail-open 值一致，因此使用独立预览项目并将其两套配置设为 fail closed，避免修改原项目。预览项目的 main 分支没有部署，预览链接不等于正式站。

## 实测结果与限制

1. 首页、登录、注册页面返回 200；匿名内容 API 返回 401，书库页面跳转登录。浏览器检查确认登录表单正常呈现。
2. 临时 QA 账号注册成功，目录和章节正文可读取，管理员邀请码创建成功。临时 QA 账号及其会话、邀请码和记录均已清理。
3. 登录既有成功也有失败。第二轮连续两次成功后，第三次登录返回 HTTP 503，响应明确标识 `error_code:1102`、`worker_exceeded_resource_limits`。第一轮邀请码注册也出现过 503，完整线上流程未通过。
4. 预览日志记录注册成功请求 CPU 540ms、登录成功请求 CPU 434ms 和 382ms；对应 wall time 为 1218ms、1228ms 和 1178ms。这是线上日志数据，不是之前的本机估算。成功样本不代表这些开销可持续获准执行。
5. 前端已处理 Cloudflare 的 HTML 和 JSON 资源超限响应，避免直接显示 JSON 解析错误；明确的 1102 将显示“服务器资源暂时不足，请稍后重试”。此项只改善提示，不解决运行额度。

当前可用于查看预览页面和复现问题，不能视为生产验收通过。CPU/内存限制需要继续处理后才能承诺稳定登录；未降低 scrypt 安全参数，未自动开通付费计划，也未设置公开测试后门。

## 后续更新

在 `project/` 执行 `npm run build`、`npm run verify`、`npm run test:auth` 后，用 `npm run deploy:preview` 更新同一独立预览分支。该命令不提交 Git、不合并 main、不部署原 `lovismind` 项目。

内容变更后显式运行 `npm run content:import -- --remote --env=preview`。生产 D1 仍未创建，生产配置中的占位 UUID 不可用于正式部署。

最新更新：已恢复 6–128 字符密码，并降低真实哈希参数。线上登录 CPU 样本从数百毫秒降至 4–8ms；这一轮完整流程成功。旧参数故障记录保留为历史，当前配置与迁移方式见 [哈希降档记录](hash-cost-update.md)。
