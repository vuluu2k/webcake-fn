// Example usage in Node.js (ES Module)
// Note: This requires a backend server to be running

import api, { FunctionCall } from './dist/webcake-fn.esm.js';

console.log('Webcake FN - Node.js Example\n');

// Example 1: Using the api proxy (returns direct results)
async function testApiProxy() {
  console.log('1. Testing API Proxy (returns direct results):');
  try {
    // Method must be lowercase
    // Returns direct result, not full response
    const result = await api.post_testFunction({
      message: 'Hello from Node.js',
      timestamp: Date.now()
    });
    console.log('   Success (direct result):', result);
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
    
    // callFn returns full response structure
    console.log('   2a. Using callFn (full response):');
    const response = await fn.callFn('GET', 'getUsers', { 
      limit: 10,
      offset: 0
    });
    console.log('   Full response:', response);
    // Output: { data: { result: [...] } }
    
    // callFnResult returns direct result
    console.log('   2b. Using callFnResult (direct result):');
    const result = await fn.callFnResult('GET', 'getUsers', { 
      limit: 10,
      offset: 0
    });
    console.log('   Direct result:', result);
    // Output: [...]
  } catch (error) {
    console.log('   Error (Expected - no backend):', error.message);
  }
  console.log('');
}

// Example 3: Multiple API calls (all return direct results)
async function testMultipleCalls() {
  console.log('3. Testing multiple API calls (all return direct results):');
  try {
    const calls = [
      api.get_getUsers({ limit: 5 }),
      api.get_getProfile({ userId: '123', includeDetails: true }),
      api.post_updateStatus({ 
        userId: '123',
        status: 'active' 
      })
    ];
    
    const results = await Promise.allSettled(calls);
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        console.log(`   Call ${index + 1} Success (direct result):`, result.value);
      } else {
        console.log(`   Call ${index + 1} Error:`, result.reason.message);
      }
    });
  } catch (error) {
    console.log('   Error:', error.message);
  }
  console.log('');
}

// Example 4: Comparison of callFn vs callFnResult
async function testComparison() {
  console.log('4. Comparing callFn vs callFnResult:');
  const fn = new FunctionCall({ 
    baseUrl: 'http://localhost:3000/api/v1/test-site'
  });
  
  try {
    console.log('   callFn returns: { data: { result: ... } }');
    console.log('   callFnResult returns: direct result');
    console.log('   API proxy uses: callFnResult (direct result)');
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
  await testComparison();
  
  console.log('All examples completed!');
  console.log('\nNote: Errors are expected as there is no backend server running.');
  console.log('To use this library, you need to have a Webcake backend server running.');
  console.log('\nKey Changes in v1.1.0:');
  console.log('- API proxy now returns direct results');
  console.log('- Method prefix must be lowercase (get_, post_, etc.)');
  console.log('- New callFnResult() method for direct results');
  console.log('- Simplified parameters format (single object)');
})();

