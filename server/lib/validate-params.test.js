const Checker = require('./validate-params');

describe('Type checker', () => {
  test('optional empty', () => {
    let checker = new Checker();
    checker.check('param', null, [Checker.isNumber]);
    expect(Object.keys(checker.errors).length).toBe(0);

    checker = new Checker();
    checker.check('param', 'qwe');
    expect(Object.keys(checker.errors).length).toBe(0);
  });

  test('number', () => {
    const checker = new Checker();
    checker.check('param', 5, [Checker.isNumber], true);
    expect(Object.keys(checker.errors).length).toBe(0);
  });

  test('wrong number', () => {
    let checker = new Checker();
    checker.check('param', '', [Checker.isNumber]);
    expect(Object.keys(checker.errors).length).toBe(1);
    expect(checker.errors[0].requiredTypes[0]).toBe('isNumber');

    checker = new Checker();
    checker.check('param', 'qwe', [Checker.isNumber]);
    expect(Object.keys(checker.errors).length).toBe(1);
    expect(checker.errors[0].requiredTypes[0]).toBe('isNumber');
  });

  test('array', () => {
    const checker = new Checker();
    checker.check('param', [1, 2], [Checker.isArray], true);
    expect(Object.keys(checker.errors).length).toBe(0);
  });

  test('wrong array', () => {
    const checker = new Checker();
    checker.check('param', 'qwe', [Checker.isArray], true);
    expect(Object.keys(checker.errors).length).toBe(1);
    expect(checker.errors[0].requiredTypes[0]).toBe('isArray');
  });

  test('array or number', () => {
    let checker = new Checker();
    checker.check('param', 123, [Checker.isNumber, Checker.isArray], true);
    expect(Object.keys(checker.errors).length).toBe(0);

    checker = new Checker();
    checker.check('param', [1, 2], [Checker.isNumber, Checker.isArray], true);
    expect(Object.keys(checker.errors).length).toBe(0);
  });

  test('wrong array or number', () => {
    const checker = new Checker();
    checker.check('param', 'qwe', [Checker.isNumber, Checker.isArray], true);
    expect(Object.keys(checker.errors).length).toBe(1);
    expect(checker.errors[0].requiredTypes[0]).toBe('isNumber');
    expect(checker.errors[0].requiredTypes[1]).toBe('isArray');
  });

  test('numbers array', () => {
    let checker = new Checker();
    checker.check('param', [1, '2', 3], [Checker.isNumbersArray], true);
    expect(Object.keys(checker.errors).length).toBe(0);

    checker = new Checker();
    checker.check('param', [], [Checker.isNumbersArray], true);
    expect(Object.keys(checker.errors).length).toBe(0);
  });

  test('wrong numbers array', () => {
    let checker = new Checker();
    checker.check('param', [1, '2', 'qwe'], [Checker.isNumbersArray], true);
    expect(Object.keys(checker.errors).length).toBe(1);
    expect(checker.errors[0].requiredTypes[0]).toBe('isNumbersArray');

    checker = new Checker();
    checker.check('param', ['', '', ''], [Checker.isNumbersArray], true);
    expect(Object.keys(checker.errors).length).toBe(1);
    expect(checker.errors[0].requiredTypes[0]).toBe('isNumbersArray');

    checker = new Checker();
    checker.check('param', 'qwe', [Checker.isNumbersArray], true);
    expect(Object.keys(checker.errors).length).toBe(1);
    expect(checker.errors[0].requiredTypes[0]).toBe('isNumbersArray');

    checker = new Checker();
    checker.check('param', 123, [Checker.isNumbersArray], true);
    expect(Object.keys(checker.errors).length).toBe(1);
    expect(checker.errors[0].requiredTypes[0]).toBe('isNumbersArray');
  });

  test('string', () => {
    let checker = new Checker();
    checker.check('param', 'qwe', [Checker.getStringCheck(2, 5)], true);
    expect(Object.keys(checker.errors).length).toBe(0);

    checker = new Checker();
    checker.check('param', 'qweasd', [Checker.getStringCheck(5)], true);
    expect(Object.keys(checker.errors).length).toBe(0);
  });

  test('wrong string', () => {
    let checker = new Checker();
    checker.check('param', 'qwe', [Checker.getStringCheck(4, 7)], true);
    expect(Object.keys(checker.errors).length).toBe(1);
    expect(checker.errors[0].requiredTypes[0]).toBe('isString');

    checker = new Checker();
    checker.check('param', 'qweasd', [Checker.getStringCheck(1, 3)], true);
    expect(Object.keys(checker.errors).length).toBe(1);
    expect(checker.errors[0].requiredTypes[0]).toBe('isString');
  });
});
