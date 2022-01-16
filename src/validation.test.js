import { validate } from "./validation";

describe('validate', () => {
  test('invalid if when board has no values', () => {
    expect(validate([
      null, null, null,
      null, null, null,
      null, null, null
    ], 3)).toBe(false)
  });

  describe('rows', () => {
    test('valid if full row is the same value', () => {
      expect(validate([
        'x', 'x', 'x',
        null, null, null,
        null, null, null
      ], 3)).toBe(true);
      expect(validate([
        null, null, null,
        'x', 'x', 'x',
        null, null, null
      ], 3)).toBe(true);
      expect(validate([
        null, null, null,
        null, null, null,
        'x', 'x', 'x'
      ], 3)).toBe(true);
    });
  });
});