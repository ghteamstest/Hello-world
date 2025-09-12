/**
 * A simple Hello World application
 * @returns {string} Hello World message
 */
function helloWorld() {
    return "Hello, World!";
}

/**
 * Greet a specific person
 * @param {string} name - Name of the person to greet
 * @returns {string} Personalized greeting
 */
function greetPerson(name) {
    if (!name || typeof name !== 'string') {
        throw new Error('Name must be a non-empty string');
    }
    return `Hello, ${name}!`;
}

/**
 * Get current greeting with timestamp
 * @returns {object} Greeting object with message and timestamp
 */
function getTimestampedGreeting() {
    return {
        message: helloWorld(),
        timestamp: new Date().toISOString()
    };
}

// If this file is run directly, print the hello world message
if (require.main === module) {
    console.log(helloWorld());
    console.log(greetPerson("World"));
    console.log(getTimestampedGreeting());
}

// Export functions for testing
module.exports = {
    helloWorld,
    greetPerson,
    getTimestampedGreeting
};