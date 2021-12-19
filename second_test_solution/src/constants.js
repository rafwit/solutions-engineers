module.exports = {
  PORT: 3000,
  ROUTES: {
    HOME: '/',
    ESCAPE: '*',
    COURIERS: '/couriers',
    LOOKUP: '/couriers/lookup',
  },
  BASE_URLS: {
    LOCAL: 'http://localhost',
    MONGO: 'mongodb://localhost:27017',
  },
  DB_NAME: 'couriers',
  ALLOWED_USERS: {
    STUART_API: 'stuart_api',
    DISPATCHER: 'dispatcher',
  },
  PROPERTIES_TO_DELETE: {
    MONGO_ID: '_id',
    MONGOOSE_FLAG: '__v',
  },
};
