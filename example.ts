/**
 * TypeScript example usage for WebCake FN
 * This file demonstrates type-safe usage of the library
 */

import api, { FunctionCall, type FunctionCallConfig, type ApiResponse } from './types/index.js';

// Example 1: Using the API proxy with type inference
async function example1() {
  console.log('Example 1: API Proxy Usage (Returns Direct Results)');
  
  try {
    // Note: method must be lowercase (get_, post_, put_, delete_)
    // API proxy automatically returns direct results (not full response)
    
    const users = await api.get_getUserList({ limit: 10 });
    console.log('Users:', users); // Direct array
    
    const result = await api.post_createUser({
      name: 'John Doe',
      email: 'john@example.com'
    });
    console.log('Created user:', result); // Direct result
    
    const updated = await api.put_updateUser({
      id: '123',
      status: 'active'
    });
    console.log('Updated user:', updated); // Direct result
    
    const deleted = await api.delete_removeUser({ id: '123' });
    console.log('Deleted:', deleted); // Direct result
  } catch (error) {
    console.error('Error:', error);
  }
}

// Example 2: Using FunctionCall class directly
async function example2() {
  console.log('Example 2: FunctionCall Class Usage');
  
  const config: FunctionCallConfig = {
    baseUrl: 'http://localhost:3000/api/v1/my-site'
  };
  
  const fn = new FunctionCall(config);
  
  try {
    // callFn returns full response structure
    const response = await fn.callFn('POST', 'processData', {
      data: 'test',
      timestamp: Date.now()
    });
    console.log('Full response:', response); // { data: { result: ... } }
    
    // callFnResult returns direct result
    const result = await fn.callFnResult('POST', 'processData', {
      data: 'test',
      timestamp: Date.now()
    });
    console.log('Direct result:', result); // Direct data
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
    // API proxy returns direct result (type-safe)
    const user = await api.get_getUser({ 
      userId: '123',
      includeProfile: true
    }) as User;
    
    console.log('User name:', user.name);
    console.log('User email:', user.email);
    
    // Using FunctionCall with types
    const fn = new FunctionCall({ baseUrl: '/api/v1/site-id' });
    
    // callFnResult with type parameter
    const typedUser = await fn.callFnResult<User>('GET', 'getUser', { 
      userId: '123' 
    });
    console.log('Typed user:', typedUser.name);
    
    // callFn with type parameter (returns full response)
    const response = await fn.callFn<User>('GET', 'getUser', { 
      userId: '123' 
    });
    console.log('Response structure:', response.data.result);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Example 4: Multiple operations with different methods
async function example4() {
  console.log('Example 4: Multiple Operations');
  
  // All calls return direct results
  const operations = [
    api.get_getProducts({ category: 'electronics' }),
    api.get_getCategories({ limit: 20 }),
    api.post_syncData({ source: 'external', timestamp: Date.now() })
  ];
  
  try {
    const [products, categories, syncResult] = await Promise.all(operations);
    console.log('Products:', products); // Direct array
    console.log('Categories:', categories); // Direct array
    console.log('Sync result:', syncResult); // Direct result
  } catch (error) {
    console.error('Error in operations:', error);
  }
}

// Example 5: Error handling with types
async function example5() {
  console.log('Example 5: Error Handling');
  
  try {
    const result = await api.post_validateData({
      input: 'test-data',
      rules: ['required', 'email']
    });
    
    console.log('Validation result:', result); // Direct result
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      
      if (error.message.includes('HTTP error! status: 400')) {
        console.error('Bad request - check your parameters');
      } else if (error.message.includes('HTTP error! status: 404')) {
        console.error('Function not found');
      } else if (error.message.includes('HTTP error! status: 500')) {
        console.error('Server error occurred');
      } else {
        console.error('Unknown error occurred');
      }
    }
  }
}

// Example 6: Comparing callFn vs callFnResult
async function example6() {
  console.log('Example 6: callFn vs callFnResult');
  
  const fn = new FunctionCall({ 
    baseUrl: 'http://localhost:3000/api/v1/my-site'
  });
  
  try {
    // callFn returns full response
    const fullResponse = await fn.callFn('GET', 'getUsers', { limit: 5 });
    console.log('Full response structure:', fullResponse);
    // Output: { data: { result: [...] } }
    
    // callFnResult returns only the result
    const directResult = await fn.callFnResult('GET', 'getUsers', { limit: 5 });
    console.log('Direct result:', directResult);
    // Output: [...]
    
    // API proxy uses callFnResult internally
    const apiResult = await api.get_getUsers({ limit: 5 });
    console.log('API proxy result (same as callFnResult):', apiResult);
    // Output: [...]
  } catch (error) {
    console.error('Error:', error);
  }
}

// Export examples for documentation
export {
  example1,
  example2,
  example3,
  example4,
  example5,
  example6
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
  // await example6();
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

