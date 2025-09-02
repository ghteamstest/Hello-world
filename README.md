# Hello World Login Application

A simple Hello World application demonstrating a login function with comprehensive error handling.

## Features

- **Robust Login Function**: Includes validation, authentication, and comprehensive error handling
- **Multiple Error Types**: Handles validation errors, authentication errors, and system errors
- **Safe Login Wrapper**: Provides a safe interface that never throws exceptions
- **Comprehensive Testing**: Full test suite validating all error scenarios
- **Demo Mode**: Interactive demonstration of all error handling scenarios

## Error Handling Capabilities

The login function handles the following error scenarios:

### Validation Errors
- Missing or invalid username/password
- Username too short (minimum 3 characters)
- Password too short (minimum 6 characters)
- Non-string input types

### Authentication Errors
- User not found
- Invalid credentials
- Network connection failures

### System Errors
- Unexpected errors with proper fallback handling

## Usage

### Running the Demo
```bash
npm start
```

### Running Tests
```bash
npm test
```

### Using the Login Function

```javascript
const { login, safeLogin } = require('./app.js');

// Using login function directly (throws errors)
try {
  const result = await login('admin', 'password123');
  console.log('Login successful:', result.user);
} catch (error) {
  console.error('Login failed:', error.message);
}

// Using safe login wrapper (never throws)
const result = await safeLogin('admin', 'password123');
if (result.success) {
  console.log('Welcome:', result.user.username);
} else {
  console.error('Login failed:', result.error.message);
}
```

## Available Test Users

- **admin** / password123
- **user1** / mypassword  
- **john** / secret

## Project Structure

- `app.js` - Main application with login function and error handling
- `test.js` - Comprehensive test suite for error handling validation
- `package.json` - Project configuration and dependencies
