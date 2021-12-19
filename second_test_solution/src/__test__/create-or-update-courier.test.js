const {
  createOrUpdateCourier,
} = require('../controllers/create-or-update-courier');
const { Courier } = require('../db/models');

describe('createOrUpdateCourier', () => {
  describe('happy path:', () => {
    test('should create a new document and return it', async () => {
      const req = {
        method: 'POST',
        body: { id: 123, max_capacity: 666 },
      };

      const res = {
        send: jest.fn(() => res).mockName('send'),
        status: jest.fn(() => res).mockName('status'),
      };

      const expected = { id: 123, max_capacity: 666 };
      Courier.findOneAndUpdate = jest.fn();
      Courier.findOneAndUpdate.mockResolvedValue(expected);

      await createOrUpdateCourier(req, res);

      expect.assertions(4);

      expect(res.send).toHaveBeenCalled();
      expect(res.send).toHaveBeenCalledWith({ id: 123, max_capacity: 666 });
      expect(res.status).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
    });
  });
});
