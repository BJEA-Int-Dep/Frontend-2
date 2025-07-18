# WeChat 校友资料查询小程序

本项目为 BJEA-Int-Dep 组织下的 WeChat 小程序，支持校友与学生资料查询、注册、登录、个人中心等功能。适合教学、演示和二次开发。

## 目录结构

```
miniprogram-1/
├── assets/           # 静态资源（如图标）
├── components/       # 自定义组件（如 navigation-bar）
├── pages/
│   ├── alumniList/   # 校友列表页（含假数据）
│   ├── alumniDetail/ # 校友详情页
│   ├── login/        # 登录页
│   ├── profile/      # 个人中心页
│   ├── register/     # 注册页
│   └── ...           # 其它页面
├── utils/            # 工具函数
├── app.js/json/wxss  # 全局配置
└── ...
```

## 功能说明

### 登录

- 支持身份切换（学生/校友）
- 测试账号密码（写死在代码中）：
  - 学号：`111`
  - 密码：`111`
- 登录成功后进入校友列表页，失败会弹出错误提示

### 注册

- 支持身份切换（学生/校友），表单内容随身份变化
- 当前注册功能为演示，点击注册按钮仅弹出"注册功能待实现"提示

### 校友列表

- 使用假数据（见 `pages/alumniList/alumniList.js`），无需后端即可演示
- 每个校友卡片可点击，跳转到详情页并传递数据

#### 假数据示例

```js
alumni: [
  {
    id: 1,
    name: '张三',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    year: '2008级',
    major: '计算机科学',
    job: '现任某科技公司工程师',
    desc: '2008级计算机科学，现任某科技公司工程师。'
  },
  // ... 其它校友
]
```

### 个人中心

- 展示当前用户信息（假数据）
- 支持退出登录

### 其它

- 自定义顶部导航栏，适配 iPhone 刘海屏
- 代码结构清晰，便于二次开发

## 启动方式

1. 使用微信开发者工具导入本项目文件夹
2. 配置 `app.json` 里的 `appid` 为你自己的小程序 AppID
3. 预览、调试即可

## 后端对接说明

### 1. 配置API地址

修改 `utils/config.js` 文件中的API地址：

```javascript
// 开发环境
development: {
  baseUrl: 'http://localhost:3000/api', // 修改为你的后端API地址
  timeout: 10000
}
```

### 2. 后端需要实现的接口

请参考 `API_DOCUMENTATION.md` 文件，实现以下接口：

- `POST /user/login` - 用户登录
- `POST /user/register` - 用户注册
- `GET /user/profile` - 获取用户信息
- `POST /user/logout` - 用户登出
- `GET /alumni/list` - 获取校友列表
- `GET /alumni/detail/:id` - 获取校友详情
- `GET /alumni/search` - 搜索校友
- `GET /alumni/stats` - 获取校友统计

### 3. 数据格式

参考 `mock_data.json` 文件中的示例数据格式。

### 4. 认证机制

- 使用JWT Token进行身份认证
- 登录成功后，前端会保存token到本地存储
- 后续请求会在请求头中携带 `Authorization: Bearer <token>`
- 后端需要验证token的有效性

### 5. 错误处理

- 401状态码：token过期，前端会自动跳转到登录页
- 其他错误：显示错误提示信息

## 说明

- 本项目已完全适配后端API，所有数据都通过接口获取
- 支持用户登录、注册、校友列表、详情查看等功能
- 包含完整的错误处理和加载状态 