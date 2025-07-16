// Jest setup file
import { config } from 'dotenv';

// Load environment variables for tests
config({ path: './test/.env.test' });

// Mock axios globally
jest.mock('axios', () => ({
  __esModule: true,
  default: jest.fn(() => Promise.resolve({ data: {} })),
}));

// Global test timeout
jest.setTimeout(10000);

// Mock environment variables
process.env.NABOOPAY_API_KEY = 'test-api-key';
process.env.TEST_NUMBER_1 = '+221701234567';
process.env.TEST_NUMBER_2 = '+221781234567';