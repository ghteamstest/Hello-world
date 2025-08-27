# MS Team App Test - Hello World

A Microsoft Teams Hello World application for testing purposes.

## Description

This is a simple Microsoft Teams bot application that demonstrates basic functionality:
- Responds with "Hello World!" messages
- Welcomes new members to conversations
- Provides a basic health check endpoint

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- Microsoft Teams account for testing

## Setup

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure your bot credentials:
   - Copy `.env.example` to `.env`
   - Fill in your Microsoft App ID and Password from Bot Framework

4. Start the application:
   ```bash
   npm start
   ```

   For development with auto-restart:
   ```bash
   npm run dev
   ```

## Testing

### Local Testing
- The bot will be available at `http://localhost:3978`
- Health check endpoint: `http://localhost:3978/`
- Bot endpoint: `http://localhost:3978/api/messages`

### Microsoft Teams Testing
1. Update the `manifest.json` with your bot's App ID
2. Create a zip file containing `manifest.json` and icon files
3. Sideload the app in Microsoft Teams

## Files Structure

- `index.js` - Main bot application
- `package.json` - Node.js dependencies and scripts
- `manifest.json` - Microsoft Teams app manifest
- `.env.example` - Environment variables template
- `.gitignore` - Git ignore patterns

## Bot Framework

This bot is built using the Microsoft Bot Framework v4 and supports:
- Personal conversations
- Team conversations  
- Group chats

## License

ISC