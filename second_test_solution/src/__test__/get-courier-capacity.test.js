const {
  updateCourierAvailableCapacity,
} = require('../controllers/update-courier-capacity');
const { Courier } = require('../db/models');
const { isLoadPossible } = require('../utils');

describe('updateCourierAvailableCapacity', () => {
  describe('happy path:', () => {
    test('it should return courier object with current load updated', async () => {
      const req = {
        params: '123',
        body: { current_load: 12 },
      };

      const res = {
        send: jest.fn(() => res).mockName('send'),
        status: jest.fn(() => res).mockName('status'),
      };

      const courierBeforeUpdate = { id: 123, max_capacity: 666 };
      const courierAfterUpdate = {
        id: 123,
        max_capacity: 666,
        current_load: 12,
      };

      Courier.findOne = jest.fn();
      Courier.findOne.mockResolvedValue(courierBeforeUpdate);

      Courier.findOneAndUpdate = jest.fn();
      Courier.findOneAndUpdate.mockResolvedValue(courierAfterUpdate);

      await updateCourierAvailableCapacity(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.send).toHaveBeenCalledWith({
        id: 123,
        max_capacity: 666,
        current_load: 12,
      });
      expect(res.status).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
    });

    test('it should return 409 HTTP Status if load to update exceeds courier capabilities', async () => {
      const req = {
        params: '123',
        body: { current_load: 100 },
      };

      const res = {
        send: jest.fn(() => res).mockName('send'),
        status: jest.fn(() => res).mockName('status'),
      };

      const courierBeforeUpdate = { id: 123, max_capacity: 50 };

      Courier.findOne = jest.fn();
      Courier.findOne.mockResolvedValue(courierBeforeUpdate);

      const isLoadPossibleMocked = jest.fn(isLoadPossible);
      isLoadPossibleMocked.mockResolvedValue(false);

      await updateCourierAvailableCapacity(req, res);

      expect.assertions(3);
      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(409);
    });

    test('it should return 404 HTTP Status and correct message if attempt to update non-existing courier', async () => {
      const req = {
        params: { id: 'non-existing' },
        body: { current_load: 100 },
      };

      const res = {
        send: jest.fn(() => res).mockName('send'),
        status: jest.fn(() => res).mockName('status'),
      };

      Courier.findOne = jest.fn();
      Courier.findOne.mockResolvedValue(null);

      await updateCourierAvailableCapacity(req, res);

      expect.assertions(4);
      expect(res.send).toHaveBeenCalled();
      expect(res.send).toHaveBeenCalledWith({
        message: 'Requested courier with id: non-existing not found',
      });
      expect(res.status).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(404);
    });
  });
});
