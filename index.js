/**
 * WebCake FN - Function Call Library
 * A modern JavaScript client for WebCake backend function operations
 * 
 * @version 1.0.0
 * @license MIT
 */

import api from "./src/ApiCall.js";
import FunctionCall from "./src/FunctionCall.js";

// Named exports
export { api, FunctionCall };

// Default export
export default api;

// Browser global (if not using modules)
if (typeof window !== 'undefined') {
  window.WebCakeFn = {
    api,
    FunctionCall
  };
  window.api = api;
  window.FunctionCall = FunctionCall;
}

