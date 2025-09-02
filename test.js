// Simple test suite for login function error handling

const { login, safeLogin, LoginError, ValidationError } = require('./app.js');

// Test counter
let testCount = 0;
let passedTests = 0;

function test(description, testFn) {
  testCount++;
  console.log(`\n🧪 Test ${testCount}: ${description}`);
  
  try {
    const result = testFn();
    if (result instanceof Promise) {
      return result.then((success) => {
        if (success) {
          passedTests++;
          console.log('   ✅ PASSED');
        } else {
          console.log('   ❌ FAILED');
        }
      }).catch((error) => {
        console.log(`   ❌ FAILED: ${error.message}`);
      });
    } else {
      if (result) {
        passedTests++;
        console.log('   ✅ PASSED');
      } else {
        console.log('   ❌ FAILED');
      }
    }
  } catch (error) {
    console.log(`   ❌ FAILED: ${error.message}`);
  }
}

async function runTests() {
  console.log('🚀 Starting Login Function Error Handling Tests\n');

  // Test successful login
  await test('Valid credentials should succeed', async () => {
    try {
      const result = await login('admin', 'password123');
      return result.success === true && result.user.username === 'admin';
    } catch (error) {
      return false;
    }
  });

  // Test validation errors
  await test('Empty username should throw ValidationError', async () => {
    try {
      await login('', 'password123');
      return false; // Should have thrown an error
    } catch (error) {
      return error instanceof ValidationError && error.field === 'username';
    }
  });

  await test('Empty password should throw ValidationError', async () => {
    try {
      await login('admin', '');
      return false; // Should have thrown an error
    } catch (error) {
      return error instanceof ValidationError && error.field === 'password';
    }
  });

  await test('Short username should throw ValidationError', async () => {
    try {
      await login('ab', 'password123');
      return false; // Should have thrown an error
    } catch (error) {
      return error instanceof ValidationError && error.field === 'username';
    }
  });

  await test('Short password should throw ValidationError', async () => {
    try {
      await login('admin', '123');
      return false; // Should have thrown an error
    } catch (error) {
      return error instanceof ValidationError && error.field === 'password';
    }
  });

  // Test login errors
  await test('Non-existent user should throw LoginError', async () => {
    try {
      await login('nonexistent', 'password123');
      return false; // Should have thrown an error
    } catch (error) {
      return error instanceof LoginError && error.code === 'USER_NOT_FOUND';
    }
  });

  await test('Wrong password should throw LoginError', async () => {
    try {
      await login('admin', 'wrongpassword');
      return false; // Should have thrown an error
    } catch (error) {
      return error instanceof LoginError && error.code === 'INVALID_CREDENTIALS';
    }
  });

  // Test null/undefined inputs
  await test('Null username should throw ValidationError', async () => {
    try {
      await login(null, 'password123');
      return false; // Should have thrown an error
    } catch (error) {
      return error instanceof ValidationError && error.field === 'username';
    }
  });

  await test('Undefined password should throw ValidationError', async () => {
    try {
      await login('admin', undefined);
      return false; // Should have thrown an error
    } catch (error) {
      return error instanceof ValidationError && error.field === 'password';
    }
  });

  // Test safeLogin wrapper
  await test('safeLogin should return success object for valid credentials', async () => {
    const result = await safeLogin('admin', 'password123');
    return result.success === true && result.user && result.user.username === 'admin';
  });

  await test('safeLogin should return error object for invalid credentials', async () => {
    const result = await safeLogin('admin', 'wrongpassword');
    return result.success === false && result.error && result.error.code === 'INVALID_CREDENTIALS';
  });

  await test('safeLogin should return error object for validation errors', async () => {
    const result = await safeLogin('', 'password123');
    return result.success === false && result.error && result.error.field === 'username';
  });

  // Test with whitespace
  await test('Username with whitespace should be trimmed', async () => {
    try {
      const result = await login('  admin  ', 'password123');
      return result.success === true && result.user.username === 'admin';
    } catch (error) {
      return false;
    }
  });

  // Summary
  console.log('\n📊 Test Results Summary:');
  console.log(`   Total Tests: ${testCount}`);
  console.log(`   Passed: ${passedTests}`);
  console.log(`   Failed: ${testCount - passedTests}`);
  
  if (passedTests === testCount) {
    console.log('\n🎉 All tests passed! Error handling is working correctly.');
  } else {
    console.log('\n⚠️  Some tests failed. Please review the error handling implementation.');
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { runTests };