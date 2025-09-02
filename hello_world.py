#!/usr/bin/env python3
"""
Hello World Application with User Model

A simple hello world application that demonstrates user management functionality.
"""

from user_model import User, UserRepository


def main():
    """Main function that demonstrates the hello world application with user model."""
    print("Hello, World!")
    print("Welcome to the Hello World User Management System")
    print("-" * 50)
    
    # Create a user repository
    user_repo = UserRepository()
    
    # Create some sample users
    print("\nCreating sample users...")
    user1 = user_repo.create_user("John Doe", "john.doe@example.com")
    user2 = user_repo.create_user("Jane Smith", "jane.smith@example.com")
    user3 = user_repo.create_user("Bob Johnson", "bob.johnson@example.com")
    
    print(f"Created user: {user1}")
    print(f"Created user: {user2}")
    print(f"Created user: {user3}")
    
    # Display all users
    print("\nAll users in the system:")
    all_users = user_repo.get_all_users()
    for user in all_users:
        print(f"  - {user}")
    
    # Get a specific user
    print(f"\nRetrieving user with ID 2:")
    retrieved_user = user_repo.get_user(2)
    if retrieved_user:
        print(f"Found user: {retrieved_user}")
        print(f"User details: {retrieved_user.to_dict()}")
    
    # Update a user
    print(f"\nUpdating user with ID 1...")
    updated_user = user_repo.update_user(1, name="John Smith")
    if updated_user:
        print(f"Updated user: {updated_user}")
    
    # Delete a user
    print(f"\nDeleting user with ID 3...")
    deleted = user_repo.delete_user(3)
    if deleted:
        print("User deleted successfully")
    
    # Display final user list
    print(f"\nFinal user list:")
    final_users = user_repo.get_all_users()
    for user in final_users:
        print(f"  - {user}")
    
    print("\nHello World User Management Demo Complete!")


if __name__ == "__main__":
    main()