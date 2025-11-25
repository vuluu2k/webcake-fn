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
  baseURL?: string;
}

/**
 * Function argument for API calls
 */
export interface FunctionArg {
  name: string;
  value: any;
}

/**
 * HTTP methods supported
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

/**
 * API Response format
 */
export interface ApiResponse<T = any> {
  success: boolean;
  result?: T;
  error?: string;
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
   * Call a backend function
   * @param method - HTTP method (GET, POST, PUT, DELETE, etc.)
   * @param functionName - Name of the function to call
   * @param args - Arguments to pass to the function
   * @returns Promise with the function result
   */
  callFn(method: HttpMethod, functionName: string, ...args: FunctionArg[] | Record<string, any>[]): Promise<any>;
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

