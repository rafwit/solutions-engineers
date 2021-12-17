const createError = require('http-errors');
const { authenticate } = require('../controllers/authenticate');
const { logger } = require('../logger');

describe('authenticate', () => {
  describe('happy path:', () => {
    test('it should log information about successfully authenticated user', async () => {
      const req = {
        headers: {
          user: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoic3R1YXJ0X2FwaSJ9.Ej2tESpKCTpfaECxmNtnukRiTIatbF2YaZ4gmxpiwLU',
        },
      };
      const next = () => {};
      const res = () => {};
      const spy = jest.spyOn(logger, 'info');

      await authenticate(req, res, next);

      expect.assertions(2);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith('User authenticated as stuart_api');
    });
  });

  describe('sad path:', () => {
    test('it should log information about authentication failure when user header is incorrect', async () => {
      const req = {
        headers: {
          user: 'definatelly incorrect value',
        },
      };
      const next = () => {};

      const res = {
        send: jest.fn(() => res).mockName('send'),
        status: jest.fn(() => res).mockName('status'),
      };

      const spy = jest.spyOn(logger, 'error');

      const authenticationError = createError(401, {
        code: 401,
        message: `User not allowed`,
      });

      await authenticate(req, res, next);

      expect.assertions(2);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(
        authenticationError,
        'Error authenticating user, received header: definatelly incorrect value'
      );
    });

    test('it should log information about authentication failure when user header is not present on the request', async () => {
      const req = {
        headers: {},
      };
      const next = () => {};

      const res = {
        send: jest.fn(() => res).mockName('send'),
        status: jest.fn(() => res).mockName('status'),
      };

      const spy = jest.spyOn(logger, 'error');

      const authenticationError = createError(401, {
        code: 401,
        message: `User not allowed`,
      });

      await authenticate(req, res, next);

      expect.assertions(2);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(
        authenticationError,
        'Error authenticating user, received header: undefined'
      );
    });

    test('it should send correct message and status when authentication failed', async () => {
      const req = {
        headers: {
          user: 'definatelly incorrect value',
        },
      };
      const next = () => {};
      const res = {
        send: jest.fn(() => res).mockName('send'),
        status: jest.fn(() => res).mockName('status'),
      };

      await authenticate(req, res, next);

      expect.assertions(2);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.send).toHaveBeenCalledWith('Unauthorized');
    });
  });
});
