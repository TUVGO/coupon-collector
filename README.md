# Coupon Collector（优惠券领取）

一个面向 AI Agent 的通用优惠券领取框架。项目通过适配器连接不同优惠来源，核心层不包含任何平台私有接口、账号凭据或生产环境配置。

## 特性

- 统一的优惠券查询与领取命令
- 可插拔 Provider 适配器
- 自带离线示例适配器，可以安全测试
- JSON 输入输出，方便接入 Agent、脚本和自动化任务
- 不保存账号密码、Cookie、Token 或位置数据

## 快速开始

需要 Node.js 18 或更高版本。

```bash
npm test
node src/cli.js list --provider demo
node src/cli.js claim demo-coffee --provider demo
```

## 创建适配器

新增 `src/providers/<name>.js` 并导出 `name`、`list()` 和 `claim(id)`，然后在 `src/providers/index.js` 注册。适配器必须使用平台正式提供或明确授权的 API；密钥只能从环境变量或安全凭据存储读取，不得提交到仓库。

## 项目结构

```text
src/
  cli.js                 命令行入口
  providers/
    index.js             Provider 注册表
    demo.js              离线示例适配器
test/
  cli.test.js            核心行为测试
agents/
  coupon-collector.md    Agent 使用说明
```

## 非官方声明

本项目是独立的开源工具，不隶属于、不代表、也未获得任何第三方商业平台的背书。平台名称和商标归各自权利人所有。项目不附带任何第三方生产接口访问权；使用者有责任遵守目标平台的服务条款、API 规则和所在地法律。

## 安全

不要通过 Issue 提交 Token、Cookie、二维码登录会话、订单、位置或其他个人数据。安全问题请参阅 [SECURITY.md](SECURITY.md)。

## License

[Apache License 2.0](LICENSE)

