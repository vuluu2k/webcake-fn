# WebCake FN

Wrapper API call functions cho backend HTTP functions của Webcake. Thư viện hỗ trợ cả Node.js và Browser với TypeScript definitions đầy đủ.

[![npm version](https://img.shields.io/npm/v/webcake-fn.svg)](https://www.npmjs.com/package/webcake-fn)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

## 📦 Cài đặt

```bash
npm install webcake-fn
```

Hoặc sử dụng CDN:

```html
<!-- ESM -->
<script type="module">
  import api from 'https://cdn.jsdelivr.net/npm/webcake-fn/dist/webcake-fn.esm.min.js';
</script>

<!-- UMD -->
<script src="https://cdn.jsdelivr.net/npm/webcake-fn/dist/webcake-fn.umd.min.js"></script>
```

## 🚀 Sử dụng

### Browser (ESM)

```javascript
import api from 'webcake-fn';

// Gọi function với GET method - trả về kết quả trực tiếp
const userData = await api.get_getUserData({ 
  userId: '123',
  includeProfile: true
});

// Gọi function với POST method - trả về kết quả trực tiếp
const result = await api.post_createUser({ 
  name: 'John', 
  email: 'john@example.com' 
});

// Gọi function với PUT method
const updated = await api.put_updateProfile({
  userId: '123',
  bio: 'Developer'
});

// Gọi function với DELETE method
const deleted = await api.delete_removeUser({
  userId: '123'
});
```

### Browser (UMD - Script Tag)

```html
<html x:id="your-site-id">
<head>
  <script src="https://cdn.jsdelivr.net/npm/webcake-fn/dist/webcake-fn.umd.min.js"></script>
</head>
<body>
  <script>
    // Global access via window.api
    const api = window.api;
    
    // API tự động trả về kết quả trực tiếp
    api.get_getUsers({ limit: 10 }).then(users => {
      console.log(users); // Direct result
    });
  </script>
</body>
</html>
```

### Node.js (ES Module)

```javascript
import api from 'webcake-fn';

// Trả về kết quả trực tiếp, không cần parse response
const data = await api.post_processData({
  input: 'value',
  options: { verbose: true }
});

console.log(data); // Direct result from backend
```

## 🔧 API nâng cao

### Sử dụng FunctionCall class trực tiếp

```javascript
import { FunctionCall } from 'webcake-fn';

// Tạo instance với custom baseUrl
const fn = new FunctionCall({ 
  baseUrl: 'http://localhost:3000/api/v1/your-site-id'
});

// Method 1: callFn() - Trả về response đầy đủ
const response = await fn.callFn(
  'POST',           // HTTP method
  'myFunction',     // Function name
  { key: 'value' }  // Params object
);
console.log(response); // { data: { result: ... } }

// Method 2: callFnResult() - Trả về kết quả trực tiếp
const result = await fn.callFnResult(
  'POST',
  'myFunction',
  { key: 'value' }
);
console.log(result); // Direct result
```

### Sự khác biệt giữa callFn và callFnResult

```javascript
// callFn() trả về response đầy đủ
const response = await fn.callFn('GET', 'getUsers', { limit: 10 });
// response = { data: { result: [...users...] } }

// callFnResult() trả về kết quả trực tiếp
const users = await fn.callFnResult('GET', 'getUsers', { limit: 10 });
// users = [...users...]

// API proxy sử dụng callFnResult() nên trả về kết quả trực tiếp
const users = await api.get_getUsers({ limit: 10 });
// users = [...users...]
```

### Format tên hàm

API sử dụng Proxy để tự động parse method và function name theo format:

```
method_functionName  (lowercase method)
```

Ví dụ:
- `get_listUsers` → GET request đến `/_functions/listUsers`
- `post_createUser` → POST request đến `/_functions/createUser`
- `put_updateUser` → PUT request đến `/_functions/updateUser`
- `delete_removeUser` → DELETE request đến `/_functions/removeUser`

**Lưu ý:** Method phải viết thường (lowercase) khi sử dụng API proxy.

### Format Parameters

Parameters được gửi dưới dạng object duy nhất:

```javascript
// ✅ Đúng - Single object
await api.post_createUser({
  name: 'John',
  email: 'john@example.com',
  age: 25
});

// ✅ Đúng - GET request với query params
await api.get_getUser({
  userId: '123',
  includeProfile: true
});
```

### Xử lý lỗi

```javascript
try {
  const result = await api.post_myFunction({ 
    data: 'test' 
  });
  console.log(result); // Direct result
} catch (error) {
  if (error.message.includes('HTTP error')) {
    console.error('Network error:', error);
  } else {
    console.error('Function error:', error);
  }
}
```

## 📘 TypeScript Support

Thư viện có TypeScript definitions đầy đủ:

```typescript
import api, { FunctionCall, type FunctionCallConfig } from 'webcake-fn';

// Type-safe API calls với kết quả trực tiếp
interface User {
  id: string;
  name: string;
  email: string;
}

// API proxy trả về kết quả trực tiếp
const users = await api.get_getUserList({ limit: 10 }) as User[];

// Type-safe configuration
const config: FunctionCallConfig = {
  baseUrl: 'http://localhost:3000/api/v1/my-site'
};

const fn = new FunctionCall(config);

// callFnResult trả về kết quả trực tiếp
const user = await fn.callFnResult('GET', 'getUser', { 
  userId: '123'
}) as User;

// callFn trả về response đầy đủ
const response = await fn.callFn('GET', 'getUser', {
  userId: '123'
});
console.log(response.data.result); // User object
```

Xem `example.ts` để biết thêm ví dụ TypeScript chi tiết.

## 📝 Response Format

### Backend Response Structure

Backend function trả về JSON với cấu trúc:

```json
{
  "data": {
    "result": { ... }
  }
}
```

Ví dụ chi tiết:

```json
{
  "data": {
    "result": [
      {
        "id": "f104af83-571c-4e8c-b123-ea67fe90c2a5",
        "name": "John Doe",
        "email": "john@example.com"
      }
    ]
  }
}
```

### Cách thư viện xử lý

```javascript
// callFn() - Trả về toàn bộ response
const response = await fn.callFn('GET', 'getUsers');
console.log(response);
// { data: { result: [...] } }

// callFnResult() - Tự động extract result
const users = await fn.callFnResult('GET', 'getUsers');
console.log(users);
// [...]

// API proxy - Sử dụng callFnResult() nên trả về result trực tiếp
const users = await api.get_getUsers();
console.log(users);
// [...]
```

## 📚 Ví dụ thực tế

### Ví dụ 1: CRUD Operations

```javascript
import api from 'webcake-fn';

// Create
const newUser = await api.post_createUser({
  name: 'John Doe',
  email: 'john@example.com',
  age: 25
});
console.log(newUser); // { id: '123', name: 'John Doe', ... }

// Read
const users = await api.get_getUsers({ 
  limit: 10,
  offset: 0 
});
console.log(users); // [{ id: '123', ... }, ...]

// Update
const updated = await api.put_updateUser({
  userId: '123',
  name: 'John Smith'
});
console.log(updated); // { id: '123', name: 'John Smith', ... }

// Delete
const deleted = await api.delete_deleteUser({
  userId: '123'
});
console.log(deleted); // { success: true }
```

### Ví dụ 2: Với Custom Base URL

```javascript
import { FunctionCall } from 'webcake-fn';

// Kết nối đến server cụ thể
const fn = new FunctionCall({
  baseUrl: 'http://demo.localhost:24679/api/v1/04676357-8025-4e34-9e90-7282777b8536'
});

// Sử dụng callFnResult để lấy kết quả trực tiếp
const data = await fn.callFnResult('GET', 'fetch', { 
  test: 'data' 
});
console.log(data); // Direct result

// Sử dụng callFn để lấy response đầy đủ
const response = await fn.callFn('POST', 'testFunction', {
  message: 'Hello',
  timestamp: new Date().toISOString()
});
console.log(response); // { data: { result: ... } }
```

### Ví dụ 3: Multiple Calls với Promise.all

```javascript
import api from 'webcake-fn';

// Gọi nhiều functions cùng lúc
const [users, posts, comments] = await Promise.all([
  api.get_getUsers({ limit: 10 }),
  api.get_getPosts({ limit: 20 }),
  api.get_getComments({ limit: 50 })
]);

console.log(users); // [...]
console.log(posts); // [...]
console.log(comments); // [...]
```

### Ví dụ 4: Error Handling

```javascript
import api from 'webcake-fn';

async function fetchUserData(userId) {
  try {
    const user = await api.get_getUser({ userId });
    return user;
  } catch (error) {
    if (error.message.includes('HTTP error! status: 404')) {
      console.error('User not found');
      return null;
    } else if (error.message.includes('HTTP error! status: 500')) {
      console.error('Server error');
      throw error;
    } else {
      console.error('Unknown error:', error);
      throw error;
    }
  }
}
```

## 🔑 Site ID

Trong browser, thư viện tự động lấy site ID từ attribute `x:id` của thẻ `<html>`:

```html
<html x:id="your-site-id">
```

URL mặc định sẽ là: `/api/v1/{siteId}/_functions/{functionName}`

Trong Node.js hoặc khi muốn override, sử dụng `baseUrl`:

```javascript
const fn = new FunctionCall({ 
  baseUrl: 'http://localhost:3000/api/v1/your-site-id'
});
```

## 🔄 Migration Guide (Nếu đang dùng phiên bản cũ)

### Thay đổi chính

1. **API Proxy giờ trả về kết quả trực tiếp**
```javascript
// Trước (phiên bản cũ)
const response = await api.GET_getUsers();
const users = response.result;

// Bây giờ
const users = await api.get_getUsers(); // Trả về kết quả trực tiếp
```

2. **Method phải viết thường**
```javascript
// Trước
api.GET_getUsers()
api.POST_createUser()

// Bây giờ
api.get_getUsers()
api.post_createUser()
```

3. **Parameters format đơn giản hơn**
```javascript
// Trước (có thể dùng FunctionArg[])
await fn.callFn('GET', 'getUser', 
  { name: 'userId', value: '123' },
  { name: 'includeProfile', value: true }
);

// Bây giờ (single object)
await fn.callFn('GET', 'getUser', {
  userId: '123',
  includeProfile: true
});
```

4. **Có thêm method callFnResult()**
```javascript
// callFn() - Trả về full response
const response = await fn.callFn('GET', 'getUsers');
// response = { data: { result: [...] } }

// callFnResult() - Trả về result trực tiếp
const users = await fn.callFnResult('GET', 'getUsers');
// users = [...]
```

## ❓ FAQ

### Tại sao API proxy trả về kết quả trực tiếp?

Để đơn giản hóa code và giảm boilerplate. Thay vì phải viết:

```javascript
const response = await api.get_getUsers();
const users = response.result;
```

Giờ chỉ cần:

```javascript
const users = await api.get_getUsers();
```

### Khi nào nên dùng callFn() vs callFnResult()?

- **callFnResult()**: Dùng khi chỉ cần kết quả (phổ biến nhất)
- **callFn()**: Dùng khi cần access toàn bộ response structure

### Làm sao để debug khi có lỗi?

```javascript
try {
  const result = await api.post_myFunction({ data: 'test' });
  console.log(result);
} catch (error) {
  console.error('Error details:', {
    message: error.message,
    stack: error.stack
  });
}
```

### GET request xử lý params như thế nào?

GET request tự động chuyển params thành query string:

```javascript
// Params object
await api.get_getUsers({ limit: 10, offset: 0 });

// Chuyển thành URL
// /_functions/getUsers?params={"limit":10,"offset":0}
```

## 📦 Các file build

- `dist/webcake-fn.esm.js` - ES Module (development)
- `dist/webcake-fn.esm.min.js` - ES Module (production)
- `dist/webcake-fn.umd.js` - UMD (development)
- `dist/webcake-fn.umd.min.js` - UMD (production)

## 🛠️ Development

```bash
# Build thư viện
npm run build

# Watch mode (auto rebuild)
npm run watch

# Test với demo server
node test-demo.js
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

ISC
