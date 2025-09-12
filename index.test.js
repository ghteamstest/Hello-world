const { helloWorld, greetPerson, getTimestampedGreeting } = require('./index');

describe('Hello World Application', () => {
    describe('helloWorld function', () => {
        test('should return "Hello, World!"', () => {
            const result = helloWorld();
            expect(result).toBe('Hello, World!');
        });

        test('should return a string', () => {
            const result = helloWorld();
            expect(typeof result).toBe('string');
        });
    });

    describe('greetPerson function', () => {
        test('should greet a person by name', () => {
            const result = greetPerson('Alice');
            expect(result).toBe('Hello, Alice!');
        });

        test('should greet another person by name', () => {
            const result = greetPerson('Bob');
            expect(result).toBe('Hello, Bob!');
        });

        test('should handle names with spaces', () => {
            const result = greetPerson('John Doe');
            expect(result).toBe('Hello, John Doe!');
        });

        test('should throw error for empty string', () => {
            expect(() => greetPerson('')).toThrow('Name must be a non-empty string');
        });

        test('should throw error for null', () => {
            expect(() => greetPerson(null)).toThrow('Name must be a non-empty string');
        });

        test('should throw error for undefined', () => {
            expect(() => greetPerson(undefined)).toThrow('Name must be a non-empty string');
        });

        test('should throw error for non-string input', () => {
            expect(() => greetPerson(123)).toThrow('Name must be a non-empty string');
            expect(() => greetPerson({})).toThrow('Name must be a non-empty string');
            expect(() => greetPerson([])).toThrow('Name must be a non-empty string');
        });
    });

    describe('getTimestampedGreeting function', () => {
        test('should return an object with message and timestamp', () => {
            const result = getTimestampedGreeting();
            expect(result).toHaveProperty('message');
            expect(result).toHaveProperty('timestamp');
        });

        test('should have correct message', () => {
            const result = getTimestampedGreeting();
            expect(result.message).toBe('Hello, World!');
        });

        test('should have valid ISO timestamp', () => {
            const result = getTimestampedGreeting();
            expect(result.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
        });

        test('should generate different timestamps for successive calls', (done) => {
            const result1 = getTimestampedGreeting();
            setTimeout(() => {
                const result2 = getTimestampedGreeting();
                expect(result2.timestamp).not.toBe(result1.timestamp);
                done();
            }, 10);
        });
    });
});