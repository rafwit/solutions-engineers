const {
  getInfoAboutCouriers,
} = require('../controllers/get-info-about-couriers');
const { Courier } = require('../db/models');

describe('getInfoAboutCouriers', () => {
  test('it should return list of curriers with expected capacity', async () => {
    const req = {
      method: 'GET',
      query: { capacity_required: 10 },
    };

    const res = {
      send: jest.fn(() => res).mockName('send'),
      status: jest.fn(() => res).mockName('status'),
    };

    const expected = [{ id: 123, max_capacity: 666, current_load: 15 }];

    Courier.find = jest.fn();
    Courier.find.mockResolvedValue(expected);

    await getInfoAboutCouriers(req, res);

    expect.assertions(4);
    expect(res.send).toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledWith(expected);
    expect(res.status).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
