# Hello-world

A simple Hello World application with user model functionality.

## Overview

This project demonstrates a basic hello world application that includes a user management system. The application features a User model with basic CRUD (Create, Read, Update, Delete) operations.

## Features

- **User Model**: Complete user representation with id, name, email, and timestamps
- **User Repository**: In-memory data storage with full CRUD operations
- **Hello World Demo**: Interactive demonstration of user management features
- **Comprehensive Tests**: Full unit test coverage for all user model functionality

## Files

- `user_model.py` - Contains the User class and UserRepository class
- `hello_world.py` - Main application demonstrating the user model functionality  
- `test_user_model.py` - Unit tests for the user model
- `requirements.txt` - Project dependencies (uses only Python standard library)

## Running the Application

```bash
# Run the hello world demo
python3 hello_world.py

# Run the tests
python3 -m unittest test_user_model.py -v
```

## User Model Features

The User class includes:
- Unique ID generation
- Name and email management
- Creation and update timestamps
- Dictionary serialization
- Update methods for name and email

The UserRepository class provides:
- Create new users with auto-incrementing IDs
- Retrieve users by ID or get all users
- Update user information
- Delete users
- In-memory storage for demonstration purposes 
