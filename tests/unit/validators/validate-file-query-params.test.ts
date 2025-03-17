import { validateFileQueryParams } from '../../../src/validators';

describe('validateFileQueryParams', () => {
  it('should not throw an error for undefined query params', () => {
    // @ts-ignore - Passing undefined is valid behavior we want to test
    expect(() => validateFileQueryParams(undefined)).not.toThrow();
  });

  it('should not throw an error for empty query params', () => {
    expect(() => validateFileQueryParams({})).not.toThrow();
  });

  it('should not throw an error for valid filters object', () => {
    expect(() =>
      validateFileQueryParams({ filters: { mime: { $contains: 'image' } } })
    ).not.toThrow();
  });

  it('should throw an error for invalid filters parameter type', () => {
    expect(() =>
      // @ts-ignore - Deliberately passing invalid type for testing
      validateFileQueryParams({ filters: 'invalid' })
    ).toThrow('Invalid filters parameter: must be an object');
  });

  it('should not throw an error for valid sort string', () => {
    expect(() => validateFileQueryParams({ sort: 'name:asc' })).not.toThrow();
  });

  it('should not throw an error for valid sort array of strings', () => {
    expect(() => validateFileQueryParams({ sort: ['name:asc', 'size:desc'] })).not.toThrow();
  });

  it('should throw an error for invalid sort parameter type', () => {
    expect(() =>
      // @ts-ignore - Deliberately passing invalid type for testing
      validateFileQueryParams({ sort: 123 })
    ).toThrow('Invalid sort parameter: must be a string or array of strings');
  });

  it('should throw an error for sort array containing non-string items', () => {
    expect(() =>
      // @ts-ignore - Deliberately passing invalid type for testing
      validateFileQueryParams({ sort: ['name:asc', 123] })
    ).toThrow('Invalid sort parameter: array items must be strings');
  });
});
