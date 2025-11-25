# TypeScript Definitions

This directory contains TypeScript type definitions for the WebCake FN library.

## Usage

The types are automatically included when you import the library in TypeScript:

```typescript
import api, { FunctionCall } from 'webcake-fn';

// TypeScript will provide autocomplete and type checking
const result = await api.GET_getUserData();
```

## Type Definitions

### FunctionCall

```typescript
class FunctionCall {
  constructor(config?: FunctionCallConfig);
  callFn(method: HttpMethod, functionName: string, ...args: FunctionArg[]): Promise<any>;
}
```

### ApiProxy

Dynamic proxy that allows method-prefixed function calls:

```typescript
interface ApiProxy {
  [key: string]: (...args: any[]) => Promise<any>;
}
```

Example usage:
```typescript
api.GET_functionName()
api.POST_functionName(data)
api.PUT_functionName(data)
api.DELETE_functionName(id)
```

### Configuration

```typescript
interface FunctionCallConfig {
  baseURL?: string;
}
```

### Response Format

```typescript
interface ApiResponse<T = any> {
  success: boolean;
  result?: T;
  error?: string;
}
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

