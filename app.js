// Hello World Login Application with Error Handling

// Custom Error Classes for better error handling
class LoginError extends Error {
  constructor(message, code = 'LOGIN_ERROR') {
    super(message);
    this.name = 'LoginError';
    this.code = code;
  }
}

class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

// Mock user database for demonstration
const users = {
  'admin': 'password123',
  'user1': 'mypassword',
  'john': 'secret'
};

/**
 * Login function with comprehensive error handling
 * @param {string} username - The username
 * @param {string} password - The password
 * @returns {Promise<Object>} Promise resolving to user object on success
 */
async function login(username, password) {
  try {
    // Input validation
    if (!username || typeof username !== 'string') {
      throw new ValidationError('Username is required and must be a string', 'username');
    }
    
    if (!password || typeof password !== 'string') {
      throw new ValidationError('Password is required and must be a string', 'password');
    }

    // Trim whitespace
    username = username.trim();
    password = password.trim();

    // Additional validation
    if (username.length < 3) {
      throw new ValidationError('Username must be at least 3 characters long', 'username');
    }

    if (password.length < 6) {
      throw new ValidationError('Password must be at least 6 characters long', 'password');
    }

    // Simulate network delay and potential network errors
    await simulateNetworkDelay();

    // Check if user exists
    if (!(username in users)) {
      throw new LoginError('User not found', 'USER_NOT_FOUND');
    }

    // Check password
    if (users[username] !== password) {
      throw new LoginError('Invalid credentials', 'INVALID_CREDENTIALS');
    }

    // Success case
    console.log(`✅ Login successful for user: ${username}`);
    return {
      success: true,
      user: {
        username: username,
        loginTime: new Date().toISOString()
      }
    };

  } catch (error) {
    // Log error for debugging
    console.error(`❌ Login failed: ${error.message}`);
    
    // Re-throw custom errors as-is
    if (error instanceof LoginError || error instanceof ValidationError) {
      throw error;
    }
    
    // Handle unexpected errors
    throw new LoginError('An unexpected error occurred during login', 'SYSTEM_ERROR');
  }
}

/**
 * Simulates network delay and occasional network errors
 * @param {boolean} forceError - Force a network error for testing
 */
async function simulateNetworkDelay(forceError = false) {
  return new Promise((resolve, reject) => {
    // Random delay between 100-500ms
    const delay = Math.random() * 400 + 100;
    
    setTimeout(() => {
      // Simulate 5% chance of network error, unless we're in test mode
      const shouldError = forceError || (process.env.NODE_ENV !== 'test' && Math.random() < 0.05);
      if (shouldError) {
        reject(new Error('Network connection failed'));
      } else {
        resolve();
      }
    }, delay);
  });
}

/**
 * Safe login wrapper that catches and handles all errors gracefully
 * @param {string} username 
 * @param {string} password 
 * @returns {Object} Always returns an object with success status and appropriate data/error
 */
async function safeLogin(username, password) {
  try {
    const result = await login(username, password);
    return result;
  } catch (error) {
    return {
      success: false,
      error: {
        message: error.message,
        code: error.code || error.name,
        field: error.field || null
      }
    };
  }
}

// Demo function to show the login functionality
async function demo() {
  console.log('🌟 Hello World Login Demo with Error Handling\n');

  const testCases = [
    // Success cases
    { username: 'admin', password: 'password123', description: 'Valid credentials' },
    { username: 'john', password: 'secret', description: 'Another valid user' },
    
    // Error cases
    { username: '', password: 'test', description: 'Empty username' },
    { username: 'admin', password: '', description: 'Empty password' },
    { username: 'ab', password: 'password123', description: 'Username too short' },
    { username: 'admin', password: '123', description: 'Password too short' },
    { username: 'nonexistent', password: 'password123', description: 'User not found' },
    { username: 'admin', password: 'wrongpassword', description: 'Invalid credentials' },
    { username: null, password: 'test', description: 'Null username' },
    { username: 'admin', password: null, description: 'Null password' },
  ];

  for (const testCase of testCases) {
    console.log(`\n📋 Testing: ${testCase.description}`);
    console.log(`   Input: username="${testCase.username}", password="${testCase.password}"`);
    
    const result = await safeLogin(testCase.username, testCase.password);
    
    if (result.success) {
      console.log(`   Result: ✅ Success - Welcome ${result.user.username}!`);
    } else {
      console.log(`   Result: ❌ Failed - ${result.error.message} (${result.error.code})`);
    }
  }

  console.log('\n🎉 Demo completed!');
}

// Run the demo if this file is executed directly
if (require.main === module) {
  demo().catch(console.error);
}

// Export functions for testing
module.exports = {
  login,
  safeLogin,
  LoginError,
  ValidationError
};