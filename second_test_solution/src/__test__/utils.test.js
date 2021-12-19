const { logger } = require('../logger');
const { logIncomingRequestInfo } = require('../utils');

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
