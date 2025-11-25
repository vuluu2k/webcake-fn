# WebCake FN

Wrapper API call functions cho backend HTTP functions của Webcake. Thư viện hỗ trợ cả Node.js và Browser.

[![npm version](https://img.shields.io/npm/v/webcake-fn.svg)](https://www.npmjs.com/package/webcake-fn)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

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

// Gọi function với GET method
const userData = await api.GET_getUserData({ 
  name: 'userId', 
  value: '123' 
});

// Gọi function với POST method
const result = await api.POST_createUser({ 
  name: 'John', 
  email: 'john@example.com' 
});

// Gọi function với PUT method
const updated = await api.PUT_updateProfile({
  userId: '123',
  bio: 'Developer'
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
    // Global access via window.api or WebCakeFn.api
    const api = window.api;
    
    api.GET_getUsers().then(users => {
      console.log(users);
    });
  </script>
</body>
</html>
```

### Node.js (ES Module)

```javascript
import api from 'webcake-fn';

const data = await api.POST_processData({
  input: 'value'
});
```

## 🔧 API nâng cao

### Sử dụng FunctionCall class trực tiếp

```javascript
import { FunctionCall } from 'webcake-fn';

// Tạo instance với custom baseUrl
const fn = new FunctionCall({ 
  baseUrl: '/custom/api/endpoint' 
});

// Gọi function
const result = await fn.callFn(
  'POST',           // HTTP method
  'myFunction',     // Function name
  { key: 'value' }  // Arguments
);
```

### Format tên hàm

API sử dụng Proxy để tự động parse method và function name theo format:

```
METHOD_functionName
```

Ví dụ:
- `GET_listUsers` → GET request đến `/_functions/listUsers`
- `POST_createUser` → POST request đến `/_functions/createUser`
- `PUT_updateUser` → PUT request đến `/_functions/updateUser`
- `DELETE_removeUser` → DELETE request đến `/_functions/removeUser`

### Xử lý lỗi

```javascript
try {
  const result = await api.POST_myFunction(data);
  console.log(result);
} catch (error) {
  if (error.message.includes('HTTP error')) {
    console.error('Network error:', error);
  } else {
    console.error('Function error:', error);
  }
}
```

## 📝 Response Format

Backend function phải trả về JSON với format:

```json
{
  "success": true,
  "result": { ... }
}
```

Hoặc khi có lỗi:

```json
{
  "success": false,
  "error": "Error message"
}
```

## 🔑 Site ID

Trong browser, thư viện tự động lấy site ID từ attribute `x:id` của thẻ `<html>`:

```html
<html x:id="your-site-id">
```

URL mặc định sẽ là: `/api/v1/{siteId}/_functions/{functionName}`

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
```

## 📄 License

ISC
