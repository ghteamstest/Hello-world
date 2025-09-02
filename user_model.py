"""
User Model for Hello World Application

This module contains the User class that represents a user in the system.
"""

from datetime import datetime
from typing import Optional


class User:
    """
    User model class that represents a user in the hello world application.
    
    Attributes:
        id (int): Unique identifier for the user
        name (str): Full name of the user
        email (str): Email address of the user
        created_at (datetime): Timestamp when the user was created
        updated_at (datetime): Timestamp when the user was last updated
    """
    
    def __init__(self, user_id: int, name: str, email: str):
        """
        Initialize a new User instance.
        
        Args:
            user_id (int): Unique identifier for the user
            name (str): Full name of the user
            email (str): Email address of the user
        """
        self.id = user_id
        self.name = name
        self.email = email
        self.created_at = datetime.now()
        self.updated_at = datetime.now()
    
    def update_name(self, new_name: str) -> None:
        """
        Update the user's name.
        
        Args:
            new_name (str): The new name for the user
        """
        self.name = new_name
        self.updated_at = datetime.now()
    
    def update_email(self, new_email: str) -> None:
        """
        Update the user's email address.
        
        Args:
            new_email (str): The new email address for the user
        """
        self.email = new_email
        self.updated_at = datetime.now()
    
    def to_dict(self) -> dict:
        """
        Convert the user object to a dictionary representation.
        
        Returns:
            dict: Dictionary representation of the user
        """
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }
    
    def __str__(self) -> str:
        """
        String representation of the user.
        
        Returns:
            str: String representation of the user
        """
        return f"User(id={self.id}, name='{self.name}', email='{self.email}')"
    
    def __repr__(self) -> str:
        """
        Developer-friendly representation of the user.
        
        Returns:
            str: Developer-friendly representation of the user
        """
        return self.__str__()


class UserRepository:
    """
    Simple in-memory repository for managing users.
    
    This is a basic implementation for demonstration purposes.
    In a real application, this would connect to a database.
    """
    
    def __init__(self):
        """Initialize the user repository with an empty user store."""
        self._users = {}
        self._next_id = 1
    
    def create_user(self, name: str, email: str) -> User:
        """
        Create a new user.
        
        Args:
            name (str): Full name of the user
            email (str): Email address of the user
            
        Returns:
            User: The newly created user
        """
        user = User(self._next_id, name, email)
        self._users[self._next_id] = user
        self._next_id += 1
        return user
    
    def get_user(self, user_id: int) -> Optional[User]:
        """
        Retrieve a user by their ID.
        
        Args:
            user_id (int): The ID of the user to retrieve
            
        Returns:
            Optional[User]: The user if found, None otherwise
        """
        return self._users.get(user_id)
    
    def get_all_users(self) -> list[User]:
        """
        Retrieve all users.
        
        Returns:
            list[User]: List of all users
        """
        return list(self._users.values())
    
    def update_user(self, user_id: int, name: str = None, email: str = None) -> Optional[User]:
        """
        Update a user's information.
        
        Args:
            user_id (int): The ID of the user to update
            name (str, optional): New name for the user
            email (str, optional): New email for the user
            
        Returns:
            Optional[User]: The updated user if found, None otherwise
        """
        user = self._users.get(user_id)
        if user:
            if name:
                user.update_name(name)
            if email:
                user.update_email(email)
        return user
    
    def delete_user(self, user_id: int) -> bool:
        """
        Delete a user by their ID.
        
        Args:
            user_id (int): The ID of the user to delete
            
        Returns:
            bool: True if user was deleted, False if user was not found
        """
        if user_id in self._users:
            del self._users[user_id]
            return True
        return False