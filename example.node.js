// Example usage in Node.js (ES Module)
// Note: This requires a backend server to be running

import api, { FunctionCall } from './dist/webcake-fn.esm.js';

console.log('Webcake FN - Node.js Example\n');

// Example 1: Using the api proxy
async function testApiProxy() {
  console.log('1. Testing API Proxy:');
  try {
    const result = await api.POST_testFunction({
      message: 'Hello from Node.js'
    });
    console.log('   Success:', result);
  } catch (error) {
    console.log('   Error (Expected - no backend):', error.message);
  }
  console.log('');
}

// Example 2: Using FunctionCall class directly
async function testFunctionCall() {
  console.log('2. Testing FunctionCall class:');
  try {
    const fn = new FunctionCall({ 
      baseUrl: 'http://localhost:3000/api/v1/test-site'
    });
    
    const result = await fn.callFn('GET', 'getUsers', { 
      name: 'limit', 
      value: '10' 
    });
    console.log('   Success:', result);
  } catch (error) {
    console.log('   Error (Expected - no backend):', error.message);
  }
  console.log('');
}

// Example 3: Multiple API calls
async function testMultipleCalls() {
  console.log('3. Testing multiple API calls:');
  try {
    const calls = [
      api.GET_getUsers(),
      api.GET_getProfile({ name: 'userId', value: '123' }),
      api.POST_updateStatus({ status: 'active' })
    ];
    
    const results = await Promise.allSettled(calls);
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        console.log(`   Call ${index + 1} Success:`, result.value);
      } else {
        console.log(`   Call ${index + 1} Error:`, result.reason.message);
      }
    });
  } catch (error) {
    console.log('   Error:', error.message);
  }
  console.log('');
}

// Run all examples
(async () => {
  await testApiProxy();
  await testFunctionCall();
  await testMultipleCalls();
  
  console.log('All examples completed!');
  console.log('\nNote: Errors are expected as there is no backend server running.');
  console.log('To use this library, you need to have a Webcake backend server running.');
})();

