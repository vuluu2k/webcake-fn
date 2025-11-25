# WebCake FN - Quick Reference

## Installation

```bash
npm install webcake-fn
```

## Basic Usage

### API Proxy (Recommended for most cases)

```javascript
import api from 'webcake-fn';

// Returns direct result
const users = await api.get_getUsers({ limit: 10 });
const user = await api.post_createUser({ name: 'John' });
const updated = await api.put_updateUser({ id: '123', status: 'active' });
const deleted = await api.delete_deleteUser({ id: '123' });
```

### FunctionCall Class (Advanced usage)

```javascript
import { FunctionCall } from 'webcake-fn';

const fn = new FunctionCall({ 
  baseUrl: 'http://localhost:3000/api/v1/site-id'
});

// Full response: { data: { result: ... } }
const response = await fn.callFn('GET', 'getUsers', { limit: 10 });

// Direct result only
const users = await fn.callFnResult('GET', 'getUsers', { limit: 10 });
```

## Method Naming Convention

```
{method}_{functionName}
```

**Important:** Method must be lowercase!

- ✅ `api.get_getUsers()`
- ✅ `api.post_createUser()`
- ✅ `api.put_updateProfile()`
- ✅ `api.delete_removeUser()`
- ❌ `api.GET_getUsers()` (uppercase not supported)

## Parameters Format

```javascript
// ✅ Correct - Single object
await api.get_getUser({
  userId: '123',
  includeProfile: true,
  fields: ['name', 'email']
});

// ❌ Wrong - Multiple separate args
await api.get_getUser(
  { name: 'userId', value: '123' },
  { name: 'includeProfile', value: true }
);
```

## Response Structure

### Backend Response Format

```json
{
  "data": {
    "result": [ ... your data ... ]
  }
}
```

### What You Get

```javascript
// API proxy - Direct result
const users = await api.get_getUsers();
console.log(users); // [ ... your data ... ]

// callFn - Full response
const response = await fn.callFn('GET', 'getUsers');
console.log(response); // { data: { result: [...] } }

// callFnResult - Direct result
const users = await fn.callFnResult('GET', 'getUsers');
console.log(users); // [ ... your data ... ]
```

## TypeScript Usage

```typescript
import api, { FunctionCall } from 'webcake-fn';

interface User {
  id: string;
  name: string;
  email: string;
}

// Type-safe calls
const users = await api.get_getUsers<User[]>({ limit: 10 });
const user = await api.get_getUser<User>({ id: '123' });

// With FunctionCall class
const fn = new FunctionCall({ baseUrl: '/api/v1/site' });
const user = await fn.callFnResult<User>('GET', 'getUser', { id: '123' });
```

## Error Handling

```javascript
try {
  const result = await api.post_myFunction({ data: 'test' });
  console.log(result);
} catch (error) {
  if (error.message.includes('HTTP error! status: 400')) {
    console.error('Bad request');
  } else if (error.message.includes('HTTP error! status: 404')) {
    console.error('Not found');
  } else if (error.message.includes('HTTP error! status: 500')) {
    console.error('Server error');
  }
}
```

## Common Patterns

### CRUD Operations

```javascript
// Create
const newUser = await api.post_createUser({ name: 'John', email: 'john@example.com' });

// Read
const users = await api.get_getUsers({ limit: 10 });
const user = await api.get_getUser({ id: '123' });

// Update
const updated = await api.put_updateUser({ id: '123', name: 'Jane' });

// Delete
const deleted = await api.delete_deleteUser({ id: '123' });
```

### Multiple Parallel Calls

```javascript
const [users, posts, comments] = await Promise.all([
  api.get_getUsers({ limit: 10 }),
  api.get_getPosts({ limit: 20 }),
  api.get_getComments({ limit: 50 })
]);
```

### Custom Base URL

```javascript
// Browser - auto-detects from <html x:id="...">
// Default: /api/v1/{siteId}/_functions/{functionName}

// Custom URL
const fn = new FunctionCall({ 
  baseUrl: 'http://demo.localhost:24679/api/v1/my-site-id'
});
```

## Configuration

### Browser (with site ID)

```html
<html x:id="your-site-id">
  <!-- Site ID automatically detected -->
  <!-- URL: /api/v1/your-site-id/_functions/{functionName} -->
</html>
```

### Node.js (explicit base URL)

```javascript
const fn = new FunctionCall({ 
  baseUrl: 'http://localhost:3000/api/v1/your-site-id'
});
```

## Quick Comparison

| Feature | API Proxy | callFn() | callFnResult() |
|---------|-----------|----------|----------------|
| Return value | Direct result | Full response | Direct result |
| Method format | `get_`, `post_`, etc. | `'GET'`, `'POST'`, etc. | `'GET'`, `'POST'`, etc. |
| Usage | Simplest | Need full response | Need direct result |
| Custom URL | ❌ No | ✅ Yes | ✅ Yes |

## Migration from v1.0.0

```javascript
// Before (v1.0.0)
const response = await api.GET_getUsers();
const users = response.result;

// After (v1.1.0)
const users = await api.get_getUsers(); // Direct result

// Before
fn.callFn('GET', 'func', 
  { name: 'key', value: 'val' }
);

// After
fn.callFn('GET', 'func', { key: 'val' });

// New method
fn.callFnResult('GET', 'func', { key: 'val' });
```

## HTTP Methods Supported

- `GET` - Retrieve data (params in query string)
- `POST` - Create data (params in body)
- `PUT` - Update data (params in body)
- `DELETE` - Delete data (params in body)
- `PATCH` - Partial update (params in body)

## CDN Usage

```html
<!-- ESM -->
<script type="module">
  import api from 'https://cdn.jsdelivr.net/npm/webcake-fn/dist/webcake-fn.esm.min.js';
  const users = await api.get_getUsers();
</script>

<!-- UMD -->
<script src="https://cdn.jsdelivr.net/npm/webcake-fn/dist/webcake-fn.umd.min.js"></script>
<script>
  const users = await window.api.get_getUsers();
</script>
```

---

For more details, see [README.md](./README.md)

