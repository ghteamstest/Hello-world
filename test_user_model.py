#!/usr/bin/env python3
"""
Unit tests for the User Model

Tests for the User class and UserRepository class functionality.
"""

import unittest
from datetime import datetime
from user_model import User, UserRepository


class TestUser(unittest.TestCase):
    """Test cases for the User class."""
    
    def setUp(self):
        """Set up test fixtures before each test method."""
        self.user = User(1, "John Doe", "john.doe@example.com")
    
    def test_user_creation(self):
        """Test user creation with valid parameters."""
        self.assertEqual(self.user.id, 1)
        self.assertEqual(self.user.name, "John Doe")
        self.assertEqual(self.user.email, "john.doe@example.com")
        self.assertIsInstance(self.user.created_at, datetime)
        self.assertIsInstance(self.user.updated_at, datetime)
    
    def test_update_name(self):
        """Test updating user name."""
        original_updated_at = self.user.updated_at
        self.user.update_name("Jane Doe")
        
        self.assertEqual(self.user.name, "Jane Doe")
        self.assertGreater(self.user.updated_at, original_updated_at)
    
    def test_update_email(self):
        """Test updating user email."""
        original_updated_at = self.user.updated_at
        self.user.update_email("jane.doe@example.com")
        
        self.assertEqual(self.user.email, "jane.doe@example.com")
        self.assertGreater(self.user.updated_at, original_updated_at)
    
    def test_to_dict(self):
        """Test converting user to dictionary."""
        user_dict = self.user.to_dict()
        
        self.assertEqual(user_dict['id'], 1)
        self.assertEqual(user_dict['name'], "John Doe")
        self.assertEqual(user_dict['email'], "john.doe@example.com")
        self.assertIn('created_at', user_dict)
        self.assertIn('updated_at', user_dict)
    
    def test_str_representation(self):
        """Test string representation of user."""
        expected = "User(id=1, name='John Doe', email='john.doe@example.com')"
        self.assertEqual(str(self.user), expected)
    
    def test_repr_representation(self):
        """Test repr representation of user."""
        expected = "User(id=1, name='John Doe', email='john.doe@example.com')"
        self.assertEqual(repr(self.user), expected)


class TestUserRepository(unittest.TestCase):
    """Test cases for the UserRepository class."""
    
    def setUp(self):
        """Set up test fixtures before each test method."""
        self.repo = UserRepository()
    
    def test_create_user(self):
        """Test creating a new user."""
        user = self.repo.create_user("John Doe", "john.doe@example.com")
        
        self.assertIsInstance(user, User)
        self.assertEqual(user.id, 1)
        self.assertEqual(user.name, "John Doe")
        self.assertEqual(user.email, "john.doe@example.com")
    
    def test_create_multiple_users(self):
        """Test creating multiple users with sequential IDs."""
        user1 = self.repo.create_user("John Doe", "john@example.com")
        user2 = self.repo.create_user("Jane Smith", "jane@example.com")
        
        self.assertEqual(user1.id, 1)
        self.assertEqual(user2.id, 2)
    
    def test_get_user_exists(self):
        """Test retrieving an existing user."""
        created_user = self.repo.create_user("John Doe", "john@example.com")
        retrieved_user = self.repo.get_user(1)
        
        self.assertIsNotNone(retrieved_user)
        self.assertEqual(retrieved_user.id, created_user.id)
        self.assertEqual(retrieved_user.name, created_user.name)
    
    def test_get_user_not_exists(self):
        """Test retrieving a non-existent user."""
        retrieved_user = self.repo.get_user(999)
        self.assertIsNone(retrieved_user)
    
    def test_get_all_users_empty(self):
        """Test getting all users when repository is empty."""
        users = self.repo.get_all_users()
        self.assertEqual(len(users), 0)
        self.assertIsInstance(users, list)
    
    def test_get_all_users_with_data(self):
        """Test getting all users when repository has data."""
        self.repo.create_user("John Doe", "john@example.com")
        self.repo.create_user("Jane Smith", "jane@example.com")
        
        users = self.repo.get_all_users()
        self.assertEqual(len(users), 2)
        self.assertTrue(all(isinstance(user, User) for user in users))
    
    def test_update_user_name(self):
        """Test updating user name."""
        user = self.repo.create_user("John Doe", "john@example.com")
        original_updated_at = user.updated_at
        
        updated_user = self.repo.update_user(1, name="Jane Doe")
        
        self.assertIsNotNone(updated_user)
        self.assertEqual(updated_user.name, "Jane Doe")
        self.assertEqual(updated_user.email, "john@example.com")
        self.assertGreater(updated_user.updated_at, original_updated_at)
    
    def test_update_user_email(self):
        """Test updating user email."""
        user = self.repo.create_user("John Doe", "john@example.com")
        original_updated_at = user.updated_at
        
        updated_user = self.repo.update_user(1, email="jane@example.com")
        
        self.assertIsNotNone(updated_user)
        self.assertEqual(updated_user.name, "John Doe")
        self.assertEqual(updated_user.email, "jane@example.com")
        self.assertGreater(updated_user.updated_at, original_updated_at)
    
    def test_update_user_both(self):
        """Test updating both user name and email."""
        self.repo.create_user("John Doe", "john@example.com")
        
        updated_user = self.repo.update_user(1, name="Jane Doe", email="jane@example.com")
        
        self.assertIsNotNone(updated_user)
        self.assertEqual(updated_user.name, "Jane Doe")
        self.assertEqual(updated_user.email, "jane@example.com")
    
    def test_update_nonexistent_user(self):
        """Test updating a non-existent user."""
        updated_user = self.repo.update_user(999, name="New Name")
        self.assertIsNone(updated_user)
    
    def test_delete_user_exists(self):
        """Test deleting an existing user."""
        self.repo.create_user("John Doe", "john@example.com")
        
        deleted = self.repo.delete_user(1)
        self.assertTrue(deleted)
        
        # Verify user is actually deleted
        retrieved_user = self.repo.get_user(1)
        self.assertIsNone(retrieved_user)
    
    def test_delete_user_not_exists(self):
        """Test deleting a non-existent user."""
        deleted = self.repo.delete_user(999)
        self.assertFalse(deleted)


if __name__ == '__main__':
    unittest.main()