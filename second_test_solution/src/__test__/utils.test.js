const { logger } = require('../logger');
const { logIncomingRequestInfo, isLoadPossible } = require('../utils');

describe('logIncomingRequestInfo', () => {
  test('it should log incoming request path and query', () => {
    const spy = jest.spyOn(logger, 'info');
    const req = {
      path: '/couriers/lookup',
      query: { capacity_required: 45 },
    };

    logIncomingRequestInfo(req);

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(
      'Incoming request to /couriers/lookup with query: {"capacity_required":45}'
    );
  });
});

describe('isLoadPossible', () => {
  test('it should return true when the sum of current load plus new load does not exceeds max capacity', () => {
    const currentLoad = 0;
    const newLoad = 5;
    const maxCapacity = 5;

    const actual = isLoadPossible(currentLoad, newLoad, maxCapacity);

    expect(actual).toStrictEqual(true);
  });

  test('it should return false when the sum of current load plus new load exceeds max capacity', () => {
    const currentLoad = 1;
    const newLoad = 5;
    const maxCapacity = 5;

    const actual = isLoadPossible(currentLoad, newLoad, maxCapacity);

    expect(actual).toStrictEqual(false);
  });
});
