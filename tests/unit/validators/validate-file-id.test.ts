import { validateFileId } from '../../../src/validators';

describe('validateFileId', () => {
  it('should not throw an error for valid positive integer IDs', () => {
    expect(() => validateFileId(1)).not.toThrow();
    expect(() => validateFileId(42)).not.toThrow();
    expect(() => validateFileId(1000)).not.toThrow();
  });

  it('should throw an error for non-number types', () => {
    // @ts-ignore - Deliberately passing invalid type for testing
    expect(() => validateFileId('1')).toThrow(
      'Invalid file ID: expected a number, received string.'
    );
  });

  it('should throw an error for NaN', () => {
    expect(() => validateFileId(NaN)).toThrow(
      'Invalid file ID: received NaN. File ID must be a valid number.'
    );
  });

  it('should throw an error for non-integer numbers', () => {
    expect(() => validateFileId(1.5)).toThrow('Invalid file ID: 1.5. File ID must be an integer.');
  });

  it('should throw an error for zero', () => {
    expect(() => validateFileId(0)).toThrow(
      'Invalid file ID: 0. File ID must be a positive number greater than zero.'
    );
  });

  it('should throw an error for negative numbers', () => {
    expect(() => validateFileId(-1)).toThrow(
      'Invalid file ID: -1. File ID must be a positive number greater than zero.'
    );
  });
});
