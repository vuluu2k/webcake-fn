// Test function call API với demo server
// URL: http://demo.localhost:24679/api/v1/04676357-8025-4e34-9e90-7282777b8536/_functions/:functionName

import { FunctionCall, api } from './dist/webcake-fn.esm.js';

console.log('🧪 Testing WebCake FN with Demo Server\n');
console.log('Base URL: http://demo.localhost:24679/api/v1/04676357-8025-4e34-9e90-7282777b8536\n');

// Initialize FunctionCall với base URL của bạn
const fn = new FunctionCall({ 
  baseUrl: 'http://demo.localhost:24679/api/v1/04676357-8025-4e34-9e90-7282777b8536'
});

// Test 1: POST request
async function testPOST() {
  console.log('📤 Test 1: POST Request');
  console.log('Function: testFunction');
  try {
    const result = await fn.callFn('POST', 'testFunction', {
      name: 'message',
      value: 'Hello from test!'
    }, {
      name: 'timestamp',
      value: new Date().toISOString()
    });
    console.log('✅ Success:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
  console.log('');
}

// Test 2: GET request
async function testGET() {
  console.log('📥 Test 2: GET Request');
  console.log('Function: testFunction');
  try {
    const result = await fn.callFn('GET', 'fetch', { test: 'data' });
    console.log('✅ Success:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
  console.log('');
}

async function testGETResult() {
  console.log('📥 Test 3: GET Request Result');
  console.log('Function: testFunction');
  try {
    const result = await fn.callFnResult('GET', 'fetch', { test: 'data' });
    console.log('✅ Success:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
  console.log('');
}

// Test 3: Gọi function cụ thể và lấy result
async function testCallFnResult() {
  console.log('🎯 Test 3: Call Function và lấy result trực tiếp');
  console.log('Function: testFunction');
  try {
    const result = await fn.callFnResult('POST', 'testFunction', {
      name: 'test',
      value: 'direct result'
    });
    console.log('✅ Success (Direct Result):', JSON.stringify(result, null, 2));
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
  console.log('');
}

// Test 4: Custom function name (thay đổi functionName ở đây)
async function testCustomFunction(functionName) {
  console.log(`🔧 Test 4: Custom Function - ${functionName}`);
  try {
    const result = await fn.callFn('POST', functionName, {
      name: 'data',
      value: 'test data'
    });
    console.log('✅ Success:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
  console.log('');
}

// Test 5: Multiple calls
async function testMultipleCalls() {
  console.log('🔄 Test 5: Multiple API Calls');
  try {
    const calls = [
      fn.callFn('POST', 'function1', { name: 'test', value: '1' }),
      fn.callFn('POST', 'function2', { name: 'test', value: '2' }),
      fn.callFn('GET', 'function3', { name: 'test', value: '3' })
    ];
    
    const results = await Promise.allSettled(calls);
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        console.log(`✅ Call ${index + 1} Success:`, JSON.stringify(result.value, null, 2));
      } else {
        console.log(`❌ Call ${index + 1} Error:`, result.reason.message);
      }
    });
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
  console.log('');
}

async function testApi() {
  try {
    console.log('🔧 Test 6: Test API');
    const result = await api.get_fetch({ test: 'data' });
    console.log('✅ Success:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
}

// Run all tests
async function runAllTests() {
  
  // await testPOST();
  // await testApi();
  await testGETResult();
  // await testCallFnResult();
  
  // Thay 'yourFunctionName' bằng tên function thực tế trên server
  // await testCustomFunction('yourFunctionName');
  
  // await testMultipleCalls();
  
  console.log('✨ All tests completed!');
}

// Execute
runAllTests().catch(console.error);

