# 校友资料查询系统 API 文档

## 基础信息

- **基础URL**: `http://localhost:3000/api` (开发环境)
- **请求格式**: JSON
- **响应格式**: JSON
- **认证方式**: Bearer Token (JWT)
- **字符编码**: UTF-8

## 通用响应格式

### 成功响应
```json
{
  "success": true,
  "message": "操作成功",
  "data": {},
  "token": "jwt_token_string" // 仅登录接口返回
}
```

### 错误响应
```json
{
  "success": false,
  "message": "错误信息描述",
  "code": "ERROR_CODE" // 可选，错误代码
}
```

## 状态码说明

| 状态码 | 说明 |
|--------|------|
| 200 | 请求成功 |
| 400 | 请求参数错误 |
| 401 | 未授权或token过期 |
| 403 | 权限不足 |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |

## 接口列表

### 1. 用户登录

**接口地址:** `POST /user/login`

**请求参数:**
```json
{
  "studentId": "2020123456",
  "password": "password123",
  "identity": "student" // "student" 或 "alumni"
}
```

**参数说明:**
- `studentId`: 学号/工号，必填，字符串
- `password`: 密码，必填，字符串
- `identity`: 身份类型，必填，"student"表示学生，"alumni"表示校友

**响应示例:**
```json
{
  "success": true,
  "message": "登录成功",
  "data": {
    "id": 1,
    "name": "张三",
    "studentId": "2020123456",
    "major": "计算机科学",
    "contact": "zhangsan@example.com",
    "email": "zhangsan@example.com",
    "phone": "13800138000",
    "avatar": "https://example.com/avatar.jpg",
    "identity": "student",
    "enrollmentYear": "2020"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

### 2. 用户注册

**接口地址:** `POST /user/register`

**请求参数 (学生注册):**
```json
{
  "identity": "student",
  "studentId": "2020123456",
  "name": "张三",
  "major": "计算机科学",
  "enrollmentYear": "2020",
  "contact": "zhangsan@example.com",
  "password": "password123"
}
```

**请求参数 (校友注册):**
```json
{
  "identity": "alumni",
  "name": "李四",
  "graduationYear": "2018",
  "major": "金融学",
  "company": "某银行",
  "contact": "lisi@example.com",
  "password": "password123"
}
```

**参数说明:**
- `identity`: 身份类型，必填
- `studentId`: 学号，学生注册时必填
- `name`: 姓名，必填
- `major`: 专业，必填
- `enrollmentYear`: 入学年份，学生注册时必填
- `graduationYear`: 毕业年份，校友注册时必填
- `company`: 工作单位，校友注册时可选
- `contact`: 联系方式，必填
- `password`: 密码，必填

**响应示例:**
```json
{
  "success": true,
  "message": "注册成功，请登录"
}
```

### 3. 获取用户信息

**接口地址:** `GET /user/profile`

**请求头:** `Authorization: Bearer <token>`

**响应示例:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "张三",
    "studentId": "2020123456",
    "major": "计算机科学",
    "contact": "zhangsan@example.com",
    "email": "zhangsan@example.com",
    "phone": "13800138000",
    "avatar": "https://example.com/avatar.jpg",
    "identity": "student",
    "enrollmentYear": "2020"
  }
}
```

### 4. 更新用户信息

**接口地址:** `PUT /user/profile`

**请求头:** `Authorization: Bearer <token>`

**请求参数:**
```json
{
  "name": "张三",
  "contact": "zhangsan@example.com",
  "email": "zhangsan@example.com",
  "phone": "13800138000"
}
```

**响应示例:**
```json
{
  "success": true,
  "message": "更新成功",
  "data": {
    "id": 1,
    "name": "张三",
    "studentId": "2020123456",
    "major": "计算机科学",
    "contact": "zhangsan@example.com",
    "email": "zhangsan@example.com",
    "phone": "13800138000",
    "avatar": "https://example.com/avatar.jpg"
  }
}
```

### 5. 用户登出

**接口地址:** `POST /user/logout`

**请求头:** `Authorization: Bearer <token>`

**响应示例:**
```json
{
  "success": true,
  "message": "登出成功"
}
```

### 6. 获取校友列表

**接口地址:** `GET /alumni/list`

**请求参数:**
```
page: 1          // 页码，从1开始，默认1
pageSize: 10     // 每页数量，默认10，最大50
keyword: "张三"   // 可选，搜索关键词
major: "计算机"   // 可选，按专业筛选
year: "2008"     // 可选，按毕业年份筛选
```

**响应示例:**
```json
{
  "success": true,
  "data": {
    "list": [
      {
        "id": 1,
        "name": "张三",
        "avatar": "https://example.com/avatar1.jpg",
        "year": "2008级",
        "major": "计算机科学",
        "job": "现任某科技公司工程师",
        "desc": "2008级计算机科学，现任某科技公司工程师。",
        "contact": "zhangsan@example.com",
        "company": "某科技公司",
        "location": "北京",
        "graduationYear": "2012"
      }
    ],
    "pagination": {
      "page": 1,
      "pageSize": 10,
      "total": 100,
      "hasMore": true
    }
  }
}
```

### 7. 获取校友详情

**接口地址:** `GET /alumni/detail/:id`

**路径参数:**
- `id`: 校友ID，必填

**响应示例:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "张三",
    "avatar": "https://example.com/avatar1.jpg",
    "year": "2008级",
    "major": "计算机科学",
    "job": "现任某科技公司工程师",
    "desc": "2008级计算机科学，现任某科技公司工程师。",
    "contact": "zhangsan@example.com",
    "company": "某科技公司",
    "location": "北京",
    "email": "zhangsan@example.com",
    "phone": "13800138000",
    "graduationYear": "2012",
    "education": "本科",
    "skills": ["Java", "Python", "JavaScript"],
    "achievements": ["获得优秀毕业生称号", "参与多个重要项目"]
  }
}
```

### 8. 搜索校友

**接口地址:** `GET /alumni/search`

**请求参数:**
```
keyword: "张三"   // 搜索关键词，必填
page: 1          // 页码，可选，默认1
pageSize: 10     // 每页数量，可选，默认10
```

**响应示例:**
```json
{
  "success": true,
  "data": {
    "list": [
      {
        "id": 1,
        "name": "张三",
        "avatar": "https://example.com/avatar1.jpg",
        "year": "2008级",
        "major": "计算机科学",
        "job": "现任某科技公司工程师",
        "desc": "2008级计算机科学，现任某科技公司工程师。"
      }
    ],
    "pagination": {
      "page": 1,
      "pageSize": 10,
      "total": 5,
      "hasMore": false
    }
  }
}
```

### 9. 获取校友统计信息

**接口地址:** `GET /alumni/stats`

**响应示例:**
```json
{
  "success": true,
  "data": {
    "totalAlumni": 1000,
    "totalStudents": 500,
    "totalAlumni": 500,
    "recentGraduates": 50,
    "majorStats": [
      {
        "major": "计算机科学",
        "count": 200
      },
      {
        "major": "金融学",
        "count": 150
      }
    ],
    "locationStats": [
      {
        "location": "北京",
        "count": 300
      },
      {
        "location": "上海",
        "count": 250
      }
    ]
  }
}
```

### 10. 上传头像

**接口地址:** `POST /user/avatar`

**请求头:** `Authorization: Bearer <token>`

**请求格式:** `multipart/form-data`

**请求参数:**
- `avatar`: 图片文件，必填，支持jpg, jpeg, png, gif格式，大小不超过5MB

**响应示例:**
```json
{
  "success": true,
  "message": "头像上传成功",
  "data": {
    "avatar": "https://example.com/uploads/avatar_123456.jpg"
  }
}
```

### 11. 获取系统配置

**接口地址:** `GET /system/config`

**响应示例:**
```json
{
  "success": true,
  "data": {
    "appName": "校友资料查询系统",
    "version": "1.0.0",
    "maintenance": false,
    "maintenanceMessage": "",
    "features": {
      "search": true,
      "register": true,
      "upload": true
    }
  }
}
```

## 数据模型

### 用户模型 (User)
```json
{
  "id": 1,
  "name": "张三",
  "studentId": "2020123456",
  "major": "计算机科学",
  "contact": "zhangsan@example.com",
  "email": "zhangsan@example.com",
  "phone": "13800138000",
  "avatar": "https://example.com/avatar.jpg",
  "identity": "student",
  "enrollmentYear": "2020",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

### 校友模型 (Alumni)
```json
{
  "id": 1,
  "name": "张三",
  "avatar": "https://example.com/avatar.jpg",
  "year": "2008级",
  "major": "计算机科学",
  "job": "现任某科技公司工程师",
  "desc": "2008级计算机科学，现任某科技公司工程师。",
  "contact": "zhangsan@example.com",
  "company": "某科技公司",
  "location": "北京",
  "email": "zhangsan@example.com",
  "phone": "13800138000",
  "graduationYear": "2012",
  "education": "本科",
  "skills": ["Java", "Python"],
  "achievements": ["优秀毕业生"],
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

## 错误码说明

| 错误码 | 说明 |
|--------|------|
| INVALID_PARAMS | 请求参数错误 |
| USER_NOT_FOUND | 用户不存在 |
| PASSWORD_ERROR | 密码错误 |
| TOKEN_EXPIRED | Token已过期 |
| TOKEN_INVALID | Token无效 |
| PERMISSION_DENIED | 权限不足 |
| USER_EXISTS | 用户已存在 |
| FILE_TOO_LARGE | 文件过大 |
| FILE_TYPE_ERROR | 文件类型错误 |
| SERVER_ERROR | 服务器内部错误 |

## 认证机制

### JWT Token格式
```
Header.Payload.Signature
```

### Token包含信息
```json
{
  "sub": "user_id",
  "name": "user_name",
  "identity": "student",
  "iat": 1516239022,
  "exp": 1516325422
}
```

### 请求头格式
```
Authorization: Bearer <token>
```

## 注意事项

1. **安全性**
   - 所有密码必须加密存储
   - 敏感信息传输使用HTTPS
   - Token有过期时间，建议24小时

2. **性能优化**
   - 图片建议使用CDN加速
   - 支持图片压缩和格式转换
   - 分页查询需要优化数据库索引

3. **数据验证**
   - 邮箱格式验证
   - 手机号格式验证
   - 文件大小和类型限制

4. **错误处理**
   - 详细的错误信息返回
   - 统一的错误码规范
   - 友好的错误提示

5. **日志记录**
   - 记录用户操作日志
   - 记录API调用日志
   - 记录错误日志

## 开发建议

1. **数据库设计**
   - 用户表和校友表分离
   - 建立合适的索引
   - 考虑数据备份策略

2. **API设计**
   - 遵循RESTful规范
   - 版本控制（如 `/api/v1/`）
   - 接口文档及时更新

3. **测试**
   - 单元测试覆盖
   - 接口测试
   - 性能测试

4. **部署**
   - 环境配置分离
   - 监控和告警
   - 自动化部署 