/**
 * TypeScript definitions for WebCake FN library
 */

/**
 * Configuration options for FunctionCall
 */
export interface FunctionCallConfig {
  /**
   * Base URL for API calls. If not provided, defaults to `/api/v1/{siteId}` in browser
   * or `/api/v1` in Node.js
   */
  baseUrl?: string;
}

/**
 * HTTP methods supported
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

/**
 * API Response format from backend
 */
export interface ApiResponse<T = any> {
  data: {
    result: T;
  };
}

/**
 * FunctionCall class for direct function invocation
 */
export declare class FunctionCall {
  baseUrl: string;
  
  /**
   * Create a new FunctionCall instance
   * @param config - Configuration options
   */
  constructor(config?: FunctionCallConfig);
  
  /**
   * Call a backend function and return full response
   * @param method - HTTP method (GET, POST, PUT, DELETE, etc.)
   * @param functionName - Name of the function to call
   * @param params - Parameters object to pass to the function
   * @returns Promise with the full API response
   * @example
   * ```typescript
   * const response = await fn.callFn('GET', 'getUsers', { limit: 10 });
   * console.log(response); // { data: { result: [...] } }
   * ```
   */
  callFn<T = any>(method: HttpMethod, functionName: string, params?: Record<string, any>): Promise<ApiResponse<T>>;
  
  /**
   * Call a backend function and return only the result
   * Automatically extracts data.result from the response
   * @param method - HTTP method (GET, POST, PUT, DELETE, etc.)
   * @param functionName - Name of the function to call
   * @param params - Parameters object to pass to the function
   * @returns Promise with the direct result
   * @example
   * ```typescript
   * const users = await fn.callFnResult('GET', 'getUsers', { limit: 10 });
   * console.log(users); // [...]
   * ```
   */
  callFnResult<T = any>(method: HttpMethod, functionName: string, params?: Record<string, any>): Promise<T>;
}

/**
 * Dynamic API proxy type
 * Allows calling functions with method prefix: GET_functionName, POST_functionName, etc.
 */
export interface ApiProxy {
  [key: string]: (...args: any[]) => Promise<any>;
}

/**
 * The main API object with dynamic proxy
 */
export declare const api: ApiProxy;

// Global declarations for browser usage
declare global {
  interface Window {
    /**
     * Global WebCakeFn object containing all exports
     */
    WebCakeFn: {
      api: ApiProxy;
      FunctionCall: typeof FunctionCall;
    };
    
    /**
     * Direct access to api proxy
     */
    api: ApiProxy;
    
    /**
     * Direct access to FunctionCall class
     */
    FunctionCall: typeof FunctionCall;
  }
}

// Named exports
export { api, FunctionCall };

// Default export
export { api as default };

