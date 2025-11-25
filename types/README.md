# TypeScript Definitions

This directory contains TypeScript type definitions for the WebCake FN library.

## Usage

The types are automatically included when you import the library in TypeScript:

```typescript
import api, { FunctionCall } from 'webcake-fn';

// TypeScript will provide autocomplete and type checking
// API proxy returns results directly
const users = await api.get_getUserData({ limit: 10 });
```

## Type Definitions

### FunctionCall

```typescript
class FunctionCall {
  constructor(config?: FunctionCallConfig);
  
  // Returns full response
  callFn<T = any>(
    method: HttpMethod, 
    functionName: string, 
    params?: Record<string, any>
  ): Promise<ApiResponse<T>>;
  
  // Returns direct result (extracts data.result automatically)
  callFnResult<T = any>(
    method: HttpMethod, 
    functionName: string, 
    params?: Record<string, any>
  ): Promise<T>;
}
```

### ApiProxy

Dynamic proxy that allows method-prefixed function calls and returns direct results:

```typescript
interface ApiProxy {
  [key: string]: (params?: Record<string, any>) => Promise<any>;
}
```

Example usage (method must be lowercase):
```typescript
// Returns direct result
const users = await api.get_getUsers({ limit: 10 });
const user = await api.post_createUser({ name: 'John' });
const updated = await api.put_updateUser({ id: '123', name: 'Jane' });
const deleted = await api.delete_deleteUser({ id: '123' });
```

### Configuration

```typescript
interface FunctionCallConfig {
  baseUrl?: string;  // Note: it's 'baseUrl', not 'baseURL'
}
```

### Response Format

```typescript
// Backend returns this structure
interface ApiResponse<T = any> {
  data: {
    result: T;
  };
}
```

## Key Differences

### API Proxy Returns Direct Results

```typescript
// API proxy uses callFnResult() internally
const users = await api.get_getUsers();
console.log(users); // Direct array of users

// If you need full response, use FunctionCall directly
const fn = new FunctionCall({ baseUrl: '/api/v1/site-id' });
const response = await fn.callFn('GET', 'getUsers');
console.log(response); // { data: { result: [...] } }

// Or use callFnResult() for direct result
const users = await fn.callFnResult('GET', 'getUsers');
console.log(users); // [...]
```

### Type-Safe Examples

```typescript
interface User {
  id: string;
  name: string;
  email: string;
}

interface Post {
  id: string;
  title: string;
  content: string;
}

// With type annotations
const users = await api.get_getUsers<User[]>({ limit: 10 });
const post = await api.post_createPost<Post>({ 
  title: 'Hello',
  content: 'World'
});

// Using FunctionCall with types
const fn = new FunctionCall({ baseUrl: '/api/v1/site-id' });
const user = await fn.callFnResult<User>('GET', 'getUser', { id: '123' });
const response = await fn.callFn<User[]>('GET', 'getUsers', { limit: 10 });
```

## Browser Globals

When using the UMD build in a browser, the following globals are available:

```typescript
window.WebCakeFn.api
window.WebCakeFn.FunctionCall
window.api
window.FunctionCall
```

## Examples

See `example.ts` in the root directory for comprehensive TypeScript usage examples.

