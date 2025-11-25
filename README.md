# WebCake FN

Wrapper API call functions for backend HTTP functions of Webcake. The library supports both Node.js and Browser with full TypeScript definitions.

[![npm version](https://img.shields.io/npm/v/webcake-fn.svg)](https://www.npmjs.com/package/webcake-fn)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

## 📦 Installation

```bash
npm install webcake-fn
```

Or use CDN:

### jsDelivr CDN

```html
<!-- ESM -->
<script type="module">
  import api from 'https://cdn.jsdelivr.net/npm/webcake-fn/dist/webcake-fn.esm.min.js';
</script>

<!-- UMD -->
<script src="https://cdn.jsdelivr.net/npm/webcake-fn/dist/webcake-fn.umd.min.js"></script>
```

### unpkg CDN

```html
<!-- ESM -->
<script type="module">
  import api from 'https://unpkg.com/webcake-fn/dist/webcake-fn.esm.min.js';
</script>

<!-- UMD -->
<script src="https://unpkg.com/webcake-fn/dist/webcake-fn.umd.min.js"></script>
```

## 🚀 Usage

### Browser (ESM)

```javascript
import api from 'webcake-fn';

// Call function with GET method - returns direct result
const userData = await api.get_getUserData({ 
  userId: '123',
  includeProfile: true
});

// Call function with POST method - returns direct result
const result = await api.post_createUser({ 
  name: 'John', 
  email: 'john@example.com' 
});

// Call function with PUT method
const updated = await api.put_updateProfile({
  userId: '123',
  bio: 'Developer'
});

// Call function with DELETE method
const deleted = await api.delete_removeUser({
  userId: '123'
});
```

### Browser (UMD - Script Tag)

```html
<html x:id="your-site-id">
<head>
  <!-- Using jsDelivr -->
  <script src="https://cdn.jsdelivr.net/npm/webcake-fn/dist/webcake-fn.umd.min.js"></script>
  
  <!-- Or using unpkg -->
  <!-- <script src="https://unpkg.com/webcake-fn/dist/webcake-fn.umd.min.js"></script> -->
</head>
<body>
  <script>
    // Global access via window.api
    const api = window.api;
    
    // API automatically returns direct results
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

// Returns direct result, no need to parse response
const data = await api.post_processData({
  input: 'value',
  options: { verbose: true }
});

console.log(data); // Direct result from backend
```

## 🔧 Advanced API

### Using FunctionCall class directly

```javascript
import { FunctionCall } from 'webcake-fn';

// Create instance with custom baseUrl
const fn = new FunctionCall({ 
  baseUrl: 'http://localhost:3000/api/v1/your-site-id'
});

// Method 1: callFn() - Returns full response
const response = await fn.callFn(
  'POST',           // HTTP method
  'myFunction',     // Function name
  { key: 'value' }  // Params object
);
console.log(response); // { data: { result: ... } }

// Method 2: callFnResult() - Returns direct result
const result = await fn.callFnResult(
  'POST',
  'myFunction',
  { key: 'value' }
);
console.log(result); // Direct result
```

### Difference between callFn and callFnResult

```javascript
// callFn() returns full response
const response = await fn.callFn('GET', 'getUsers', { limit: 10 });
// response = { data: { result: [...users...] } }

// callFnResult() returns direct result
const users = await fn.callFnResult('GET', 'getUsers', { limit: 10 });
// users = [...users...]

// API proxy uses callFnResult() so it returns direct result
const users = await api.get_getUsers({ limit: 10 });
// users = [...users...]
```

### Function name format

API uses Proxy to automatically parse method and function name in the format:

```
method_functionName  (lowercase method)
```

Examples:
- `get_listUsers` → GET request to `/_functions/listUsers`
- `post_createUser` → POST request to `/_functions/createUser`
- `put_updateUser` → PUT request to `/_functions/updateUser`
- `delete_removeUser` → DELETE request to `/_functions/removeUser`

**Note:** Method must be lowercase when using API proxy.

### Parameters format

Parameters are sent as a single object:

```javascript
// ✅ Correct - Single object
await api.post_createUser({
  name: 'John',
  email: 'john@example.com',
  age: 25
});

// ✅ Correct - GET request with query params
await api.get_getUser({
  userId: '123',
  includeProfile: true
});
```

### Error handling

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

The library has full TypeScript definitions:

```typescript
import api, { FunctionCall, type FunctionCallConfig } from 'webcake-fn';

// Type-safe API calls with direct results
interface User {
  id: string;
  name: string;
  email: string;
}

// API proxy returns direct results
const users = await api.get_getUserList({ limit: 10 }) as User[];

// Type-safe configuration
const config: FunctionCallConfig = {
  baseUrl: 'http://localhost:3000/api/v1/my-site'
};

const fn = new FunctionCall(config);

// callFnResult returns direct result
const user = await fn.callFnResult('GET', 'getUser', { 
  userId: '123'
}) as User;

// callFn returns full response
const response = await fn.callFn('GET', 'getUser', {
  userId: '123'
});
console.log(response.data.result); // User object
```

See `example.ts` for more detailed TypeScript examples.

## 📝 Response Format

### Backend Response Structure

Backend function returns JSON with the structure:

```json
{
  "data": {
    "result": { ... }
  }
}
```

Detailed example:

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

### How the library handles it

```javascript
// callFn() - Returns full response
const response = await fn.callFn('GET', 'getUsers');
console.log(response);
// { data: { result: [...] } }

// callFnResult() - Automatically extracts result
const users = await fn.callFnResult('GET', 'getUsers');
console.log(users);
// [...]

// API proxy - Uses callFnResult() so returns result directly
const users = await api.get_getUsers();
console.log(users);
// [...]
```

## 📚 Real-world Examples

### Example 1: CRUD Operations

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

### Example 2: With Custom Base URL

```javascript
import { FunctionCall } from 'webcake-fn';

// Connect to specific server
const fn = new FunctionCall({
  baseUrl: 'http://demo.localhost:24679/api/v1/04676357-8025-4e34-9e90-7282777b8536'
});

// Use callFnResult to get direct result
const data = await fn.callFnResult('GET', 'fetch', { 
  test: 'data' 
});
console.log(data); // Direct result

// Use callFn to get full response
const response = await fn.callFn('POST', 'testFunction', {
  message: 'Hello',
  timestamp: new Date().toISOString()
});
console.log(response); // { data: { result: ... } }
```

### Example 3: Multiple Calls with Promise.all

```javascript
import api from 'webcake-fn';

// Call multiple functions simultaneously
const [users, posts, comments] = await Promise.all([
  api.get_getUsers({ limit: 10 }),
  api.get_getPosts({ limit: 20 }),
  api.get_getComments({ limit: 50 })
]);

console.log(users); // [...]
console.log(posts); // [...]
console.log(comments); // [...]
```

### Example 4: Error Handling

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

In browser, the library automatically gets site ID from the `x:id` attribute of the `<html>` tag:

```html
<html x:id="your-site-id">
```

Default URL will be: `/api/v1/{siteId}/_functions/{functionName}`

In Node.js or when you want to override, use `baseUrl`:

```javascript
const fn = new FunctionCall({ 
  baseUrl: 'http://localhost:3000/api/v1/your-site-id'
});
```

## 🔄 Migration Guide (If upgrading from older version)

### Main changes

1. **API Proxy now returns direct results**
```javascript
// Before (old version)
const response = await api.GET_getUsers();
const users = response.result;

// Now
const users = await api.get_getUsers(); // Returns direct result
```

2. **Method must be lowercase**
```javascript
// Before
api.GET_getUsers()
api.POST_createUser()

// Now
api.get_getUsers()
api.post_createUser()
```

3. **Simplified parameters format**
```javascript
// Before (could use FunctionArg[])
await fn.callFn('GET', 'getUser', 
  { name: 'userId', value: '123' },
  { name: 'includeProfile', value: true }
);

// Now (single object)
await fn.callFn('GET', 'getUser', {
  userId: '123',
  includeProfile: true
});
```

4. **New callFnResult() method**
```javascript
// callFn() - Returns full response
const response = await fn.callFn('GET', 'getUsers');
// response = { data: { result: [...] } }

// callFnResult() - Returns direct result
const users = await fn.callFnResult('GET', 'getUsers');
// users = [...]
```

## ❓ FAQ

### Why does API proxy return direct results?

To simplify code and reduce boilerplate. Instead of writing:

```javascript
const response = await api.get_getUsers();
const users = response.result;
```

Now you only need:

```javascript
const users = await api.get_getUsers();
```

### When to use callFn() vs callFnResult()?

- **callFnResult()**: Use when you only need the result (most common)
- **callFn()**: Use when you need to access the full response structure

### How to debug when there's an error?

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

### How does GET request handle params?

GET request automatically converts params to query string:

```javascript
// Params object
await api.get_getUsers({ limit: 10, offset: 0 });

// Converts to URL
// /_functions/getUsers?params={"limit":10,"offset":0}
```

## 📦 Build Files

- `dist/webcake-fn.esm.js` - ES Module (development)
- `dist/webcake-fn.esm.min.js` - ES Module (production)
- `dist/webcake-fn.umd.js` - UMD (development)
- `dist/webcake-fn.umd.min.js` - UMD (production)

## 🛠️ Development

```bash
# Build library
npm run build

# Watch mode (auto rebuild)
npm run watch

# Test with demo server
node test-demo.js
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

ISC
