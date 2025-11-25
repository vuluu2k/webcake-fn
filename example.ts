/**
 * TypeScript example usage for WebCake FN
 * This file demonstrates type-safe usage of the library
 */

import api, { FunctionCall, type FunctionCallConfig, type ApiResponse } from './types/index.js';

// Example 1: Using the API proxy with type inference
async function example1() {
  console.log('Example 1: API Proxy Usage');
  
  try {
    // Type-safe function calls with method prefix
    const users = await api.GET_getUserList();
    console.log('Users:', users);
    
    const result = await api.POST_createUser({
      name: 'John Doe',
      email: 'john@example.com'
    });
    console.log('Created user:', result);
    
    const updated = await api.PUT_updateUser({
      id: '123',
      status: 'active'
    });
    console.log('Updated user:', updated);
    
    await api.DELETE_removeUser({ id: '123' });
    console.log('User deleted');
  } catch (error) {
    console.error('Error:', error);
  }
}

// Example 2: Using FunctionCall class directly
async function example2() {
  console.log('Example 2: FunctionCall Class Usage');
  
  const config: FunctionCallConfig = {
    baseURL: 'http://localhost:3000/api/v1/my-site'
  };
  
  const fn = new FunctionCall(config);
  
  try {
    // Type-safe method calls
    const result = await fn.callFn('POST', 'processData', {
      name: 'data',
      value: 'test'
    });
    console.log('Result:', result);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Example 3: Working with typed responses
async function example3() {
  console.log('Example 3: Typed Responses');
  
  interface User {
    id: string;
    name: string;
    email: string;
  }
  
  try {
    // Type-safe response
    const user = await api.GET_getUser({ 
      name: 'userId', 
      value: '123' 
    }) as User;
    
    console.log('User name:', user.name);
    console.log('User email:', user.email);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Example 4: Multiple operations with different methods
async function example4() {
  console.log('Example 4: Multiple Operations');
  
  const operations = [
    api.GET_getProducts(),
    api.GET_getCategories(),
    api.POST_syncData({ source: 'external' })
  ];
  
  try {
    const results = await Promise.all(operations);
    console.log('All operations completed:', results);
  } catch (error) {
    console.error('Error in operations:', error);
  }
}

// Example 5: Error handling with types
async function example5() {
  console.log('Example 5: Error Handling');
  
  try {
    const result = await api.POST_validateData({
      input: 'test-data'
    });
    
    console.log('Validation result:', result);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      
      if (error.message.includes('HTTP error')) {
        console.error('Network error occurred');
      } else if (error.message.includes('Function call failed')) {
        console.error('Function execution failed');
      }
    }
  }
}

// Export examples for documentation
export {
  example1,
  example2,
  example3,
  example4,
  example5
};

// Main execution
async function main() {
  console.log('WebCake FN TypeScript Examples\n');
  console.log('Note: These examples require a running backend server.\n');
  
  // Uncomment to run examples:
  // await example1();
  // await example2();
  // await example3();
  // await example4();
  // await example5();
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

